import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

import { colors } from "@/constants/colors";
import { FaceVerificationScreen } from "@/features/face-auth/FaceVerificationScreen";
import { useAppState } from "@/hooks";
import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const { completeFaceVerification, hydrated } = useAppState();
  const [hasPassedEntryVerification, setHasPassedEntryVerification] = useState(false);

  if (!hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasPassedEntryVerification) {
    return (
      <FaceVerificationScreen
        onCancel={() => {
          // Keep the verification screen mounted until the user completes entry verification.
        }}
        onSuccess={() => {
          completeFaceVerification();
          setHasPassedEntryVerification(true);
        }}
      />
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(protected)" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
