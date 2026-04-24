/**
 * Calculates the Euclidean distance between two embedding vectors.
 * A smaller distance means the faces are more similar.
 * Typical FaceNet threshold is ~1.0 for Euclidean distance (depends on the model and normalization).
 */
export const calculateEuclideanDistance = (embedding1: number[] | Float32Array, embedding2: number[] | Float32Array): number => {
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must have the same length');
  }

  let sum = 0;
  for (let i = 0; i < embedding1.length; i++) {
    const diff = embedding1[i] - embedding2[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};

/**
 * Calculates the Cosine Similarity between two embedding vectors.
 * A larger value (closer to 1) means the faces are more similar.
 * Typical threshold is ~0.8 for Cosine Similarity.
 */
export const calculateCosineSimilarity = (embedding1: number[] | Float32Array, embedding2: number[] | Float32Array): number => {
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must have the same length');
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    norm1 += embedding1[i] * embedding1[i];
    norm2 += embedding2[i] * embedding2[i];
  }

  if (norm1 === 0 || norm2 === 0) return 0;

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
};
