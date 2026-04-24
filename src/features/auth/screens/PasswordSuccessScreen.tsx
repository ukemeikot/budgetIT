import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

import { AppCard, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { radius, spacing } from "@/theme";

export function PasswordSuccessScreen() {
  const router = useRouter();

  return (
    <Screen
      edges={["top", "bottom"]}
      contentStyle={styles.content}
      footer={
        <Pressable style={styles.primaryButton} onPress={() => router.replace("/(auth)/sign-in" as never)}>
          <Text style={styles.primaryButtonText}>Back to Sign In</Text>
        </Pressable>
      }
    >
      <AppCard style={styles.card}>
        <Text style={styles.title}>Password updated</Text>
        <Text style={styles.subtitle}>Your device profile now uses the new password for future sign-ins.</Text>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  card: {
    gap: spacing.sm,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "800",
  },
});
