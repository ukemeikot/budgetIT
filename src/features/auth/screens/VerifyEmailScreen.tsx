import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, AppHeader, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function VerifyEmailScreen() {
  const router = useRouter();
  const { appState, verifyEmail } = useAppState();

  return (
    <Screen
      edges={["top", "bottom"]}
      contentStyle={styles.content}
      footer={
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            verifyEmail();
            router.replace("/(auth)/id-verification" as never);
          }}
        >
          <Text style={styles.primaryButtonText}>I Verified My Email</Text>
        </Pressable>
      }
    >
      <AppHeader title="Verify Email" />
      <AppCard style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name="mail-open-outline" size={28} color={colors.primary} />
        </View>
        <Text style={styles.title}>Check your inbox</Text>
        <Text style={styles.subtitle}>
          A verification link was prepared for <Text style={styles.bold}>{appState.auth.email}</Text>. This flow is
          currently offline-safe, so tapping continue marks the device profile as verified for now.
        </Text>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },
  card: {
    gap: spacing.md,
    alignItems: "flex-start",
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
  },
  bold: {
    color: colors.text,
    fontWeight: "700",
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
