import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useFaceDetector } from 'react-native-vision-camera-face-detector';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { useFrameProcessor } from 'react-native-vision-camera';
import { Worklets, useSharedValue } from 'react-native-worklets-core';
import * as SecureStore from 'expo-secure-store';
import { calculateCosineSimilarity } from '../../utils/faceComparison';

const EMBEDDING_KEY = 'user_face_embedding';
const MATCH_THRESHOLD = 0.69;

export type VerificationState =
  | 'idle'
  | 'detecting'
  | 'liveness_check'
  | 'processing'
  | 'success'
  | 'failed';

// ---- helpers to stay under SecureStore's 2048-byte limit ----
function compactEmbedding(embedding: number[]): string {
  return JSON.stringify(embedding.map((v) => parseFloat(v.toFixed(4))));
}

export const useFaceRecognition = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [verificationState, setVerificationState] =
    useState<VerificationState>('idle');
  const [savedEmbedding, setSavedEmbedding] = useState<number[] | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const isProcessing = useSharedValue(false);
  const blinkCount = useSharedValue(0);
  const eyesClosed = useSharedValue(false);

  const modelRef = useRef<any>(null);

  // Keep latest state values in refs so the inference callback
  // always reads fresh values instead of stale closure captures.
  const isRegisteredRef = useRef(isRegistered);
  const savedEmbeddingRef = useRef(savedEmbedding);
  useEffect(() => { isRegisteredRef.current = isRegistered; }, [isRegistered]);
  useEffect(() => { savedEmbeddingRef.current = savedEmbedding; }, [savedEmbedding]);

  const tflite = useTensorflowModel(
    // Expo asset resolution for the bundled TFLite model still requires require here.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../../assets/models/facenet.tflite'),
    [],
  );
  const { resize } = useResizePlugin();
  const { detectFaces } = useFaceDetector({
    performanceMode: 'accurate',
    classificationMode: 'all',
  });

  useEffect(() => {
    if (tflite.state === 'loaded' && tflite.model != null) {
      modelRef.current = tflite.model;
      setIsModelLoaded(true);
    } else {
      modelRef.current = null;
      setIsModelLoaded(false);
    }
  }, [tflite.state, tflite.model]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync(EMBEDDING_KEY);
        if (stored) {
          setSavedEmbedding(JSON.parse(stored));
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
      } catch {
        setIsRegistered(false);
      }
    })();
  }, []);

  // ---- actions ----

  const startVerification = useCallback(() => {
    setVerificationState('detecting');
    isProcessing.value = true;
    blinkCount.value = 0;
    eyesClosed.value = false;
  }, [isProcessing, blinkCount, eyesClosed]);

  const cancelVerification = useCallback(() => {
    setVerificationState('idle');
    isProcessing.value = false;
  }, [isProcessing]);

  // ---- JS-thread callbacks ----

  const updateUIState = useCallback((state: VerificationState) => {
    setVerificationState(state);
  }, []);

  // Inference — always reads from refs for fresh values
  const runInferenceImpl = useCallback(
    async (pixelData: number[]) => {
      const model = modelRef.current;
      if (!model) {
        setVerificationState('failed');
        return;
      }
      try {
        setVerificationState('processing');
        const inputBuffer = new Float32Array(pixelData).buffer;
        const output = await model.run([inputBuffer]);
        const embedding = Array.from(new Float32Array(output[0]));

        const registered = isRegisteredRef.current;
        const saved = savedEmbeddingRef.current;

        if (!registered) {
          // First-time registration
          await SecureStore.setItemAsync(EMBEDDING_KEY, compactEmbedding(embedding));
          setIsRegistered(true);
          setSavedEmbedding(embedding);
          setVerificationState('success');
          console.log('[FaceAuth] Face REGISTERED');
        } else if (saved) {
          // Login verification
          const similarity = calculateCosineSimilarity(embedding, saved);
          console.log('[FaceAuth] Similarity:', similarity.toFixed(4));
          if (similarity > MATCH_THRESHOLD) {
            setVerificationState('success');
            console.log('[FaceAuth] MATCH — verified');
          } else {
            setVerificationState('failed');
            console.log('[FaceAuth] NO MATCH — rejected');
          }
        }
      } catch (e) {
        console.error('[FaceAuth] Inference error:', e);
        setVerificationState('failed');
      }
    },
    [], // no deps — always reads from refs
  );

  const inferenceRef = useRef(runInferenceImpl);
  useEffect(() => {
    inferenceRef.current = runInferenceImpl;
  }, [runInferenceImpl]);

  // ---- Worklets.createRunOnJS wrappers ----

  const updateUIOnJS = useMemo(
    () => Worklets.createRunOnJS(updateUIState),
    [updateUIState],
  );

  const runInferenceOnJS = useMemo(
    () =>
      Worklets.createRunOnJS((pixelData: number[]) => {
        inferenceRef.current(pixelData);
      }),
    [],
  );

  // ---- Frame processor ----
  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      if (!isProcessing.value) return;

      const faces = detectFaces(frame);

      if (faces.length === 1) {
        const face = faces[0];

        if (blinkCount.value < 2) {
          updateUIOnJS('liveness_check');

          const leftEye = face.leftEyeOpenProbability ?? -1;
          const rightEye = face.rightEyeOpenProbability ?? -1;

          const isClosed =
            leftEye >= 0 && rightEye >= 0 && leftEye < 0.3 && rightEye < 0.3;
          const isOpen = leftEye > 0.8 && rightEye > 0.8;

          if (isClosed && !eyesClosed.value) {
            eyesClosed.value = true;
          } else if (isOpen && eyesClosed.value) {
            eyesClosed.value = false;
            blinkCount.value += 1;
          }
        } else {
          isProcessing.value = false;
          updateUIOnJS('processing');

          const cropped = resize(frame, {
            scale: { width: 112, height: 112 },
            crop: {
              x: face.bounds.x,
              y: face.bounds.y,
              width: face.bounds.width,
              height: face.bounds.height,
            },
            pixelFormat: 'rgb',
            dataType: 'float32',
          });

          const data = Array.from(cropped as unknown as Float32Array);
          runInferenceOnJS(data);
        }
      } else {
        updateUIOnJS('detecting');
      }
    },
    [
      isProcessing,
      blinkCount,
      eyesClosed,
      detectFaces,
      resize,
      updateUIOnJS,
      runInferenceOnJS,
    ],
  );

  return {
    isRegistered,
    verificationState,
    isModelLoaded,
    startVerification,
    cancelVerification,
    frameProcessor,
  };
};
