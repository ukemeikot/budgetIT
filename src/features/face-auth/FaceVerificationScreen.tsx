import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";

import { useFaceRecognition } from "./useFaceRecognition";

interface FaceVerificationScreenProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const FaceVerificationScreen = ({
  onCancel,
  onSuccess,
}: FaceVerificationScreenProps) => {
  const insets = useSafeAreaInsets();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");

  const {
    isRegistered,
    verificationState,
    isModelLoaded,
    startVerification,
    cancelVerification,
    frameProcessor,
  } = useFaceRecognition();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (verificationState === "success") {
      onSuccess();
    }
  }, [verificationState, onSuccess]);

  const getStatusText = () => {
    switch (verificationState) {
      case "idle":
        return "Ready to verify";
      case "detecting":
        return "Center your face in the frame";
      case "liveness_check":
        return "Blink twice if you're safe";
      case "processing":
        return "Verifying identity...";
      case "success":
        return "Verification successful!";
      case "failed":
        return "Face not recognized. Try again.";
      default:
        return "";
    }
  };

  const handleCancel = () => {
    cancelVerification();
    onCancel();
  };

  const buttonEnabled =
    isModelLoaded &&
    (verificationState === "idle" || verificationState === "failed");

  if (!hasPermission) {
    return (
      <View style={styles.root}>
        <ActivityIndicator style={styles.loader} size="large" color="#1D4ED8" />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>No Camera Available</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" translucent />

      <View style={styles.header}>
        <View style={styles.iconPlaceholder}>
          <Ionicons name="scan-circle-outline" size={22} color="#1D4ED8" />
        </View>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>
          We need to perform a quick liveness check
        </Text>
      </View>

      <View style={styles.centerContent}>
        <View
          style={[
            styles.statusBadge,
            verificationState === "liveness_check" && styles.statusBadgeWarning,
            verificationState === "success" && styles.statusBadgeSuccess,
            verificationState === "failed" && styles.statusBadgeError,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              verificationState === "liveness_check" && styles.statusTextWarning,
              verificationState === "success" && styles.statusTextSuccess,
              verificationState === "failed" && styles.statusTextError,
            ]}
          >
            {getStatusText()}
          </Text>
        </View>

        <View style={styles.cameraContainer}>
          <View
            style={[
              styles.cameraMask,
              verificationState === "liveness_check" && styles.cameraMaskActive,
              verificationState === "success" && styles.cameraMaskSuccess,
              verificationState === "failed" && styles.cameraMaskError,
            ]}
          >
            {isModelLoaded ? (
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive
                frameProcessor={frameProcessor}
                pixelFormat="yuv"
              />
            ) : (
              <View style={styles.cameraLoading}>
                <ActivityIndicator color="#3B82F6" />
                <Text style={styles.cameraLoadingText}>Loading model...</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.encryptionBadge}>
          <Ionicons name="shield-checkmark-outline" size={14} color="#6B7280" />
          <Text style={styles.encryptionText}>End-to-end encrypted</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.startButton,
            !buttonEnabled && styles.startButtonDisabled,
          ]}
          onPress={startVerification}
          disabled={!buttonEnabled}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>
            {verificationState === "failed"
              ? "Try Again →"
              : isRegistered
                ? "Verify Identity →"
                : "Register Face →"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 16,
    color: "#EF4444",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E6F4FE",
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  statusBadge: {
    backgroundColor: "#E6F4FE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusBadgeWarning: {
    backgroundColor: "#FEF08A",
  },
  statusBadgeSuccess: {
    backgroundColor: "#D1FAE5",
  },
  statusBadgeError: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "500",
  },
  statusTextWarning: {
    color: "#854D0E",
  },
  statusTextSuccess: {
    color: "#065F46",
  },
  statusTextError: {
    color: "#B91C1C",
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cameraMask: {
    width: 260,
    height: 260,
    borderRadius: 130,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#3B82F6",
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraMaskActive: {
    borderColor: "#F59E0B",
  },
  cameraMaskSuccess: {
    borderColor: "#10B981",
  },
  cameraMaskError: {
    borderColor: "#EF4444",
  },
  cameraLoading: {
    alignItems: "center",
    gap: 8,
  },
  cameraLoadingText: {
    fontSize: 12,
    color: "#6B7280",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 20,
  },
  encryptionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  encryptionText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginLeft: 6,
  },
  startButton: {
    backgroundColor: "#1D4ED8",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  startButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "#1D4ED8",
    fontSize: 16,
    fontWeight: "500",
  },
});
