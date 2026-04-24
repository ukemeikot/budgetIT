import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

const points = [
  "Track manual entries, scanned receipts, and uploads in one offline ledger.",
  "Create categories, allocations, and spending limits that map your real budget structure.",
  "Protect dashboard access with device-based facial verification.",
];

export function WelcomeScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAppState();

  const handleContinue = () => {
    completeOnboarding();
    router.replace("/(auth)/create-account" as never);
  };

  return (
    <Screen
      edges={["top", "bottom"]}
      contentStyle={styles.content}
      footer={
        <Pressable style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>
      }
    >
      <View style={styles.hero}>
        <View style={styles.logoBadge}>
          <Ionicons name="pie-chart-outline" size={28} color={colors.primary} />
        </View>
        <Text style={styles.eyebrow}>Offline-first budget control</Text>
        <Text style={styles.title}>BudgetIT keeps your money flow structured before you even go online.</Text>
        <Text style={styles.subtitle}>
          Build categories, allocations, and ledgers that stay available on-device. When you are ready, scanning
          and uploads feed the exact same ledger.
        </Text>
      </View>

      <AppCard style={styles.card}>
        {points.map((point) => (
          <View key={point} style={styles.pointRow}>
            <View style={styles.pointIcon}>
              <Ionicons name="checkmark" size={16} color={colors.primary} />
            </View>
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  hero: {
    gap: spacing.md,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    color: colors.primary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
  },
  card: {
    gap: spacing.md,
  },
  pointRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
  },
  pointIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  pointText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "800",
  },
});
