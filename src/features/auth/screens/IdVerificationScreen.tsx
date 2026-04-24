import { useRouter } from "expo-router";

import { FaceVerificationScreen } from "@/features/face-auth/FaceVerificationScreen";
import { useAppState } from "@/hooks";

export function IdVerificationScreen() {
  const router = useRouter();
  const { completeFaceVerification } = useAppState();

  return (
    <FaceVerificationScreen
      onCancel={() => router.back()}
      onSuccess={() => {
        completeFaceVerification();
        router.replace("/(auth)/verification-success" as never);
      }}
    />
  );
}
