import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { AppCard, Screen, SectionHeader } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function AssetsScreen() {
  const router = useRouter();
  const { allocationSpend, appState, financeState } = useAppState();
  const totalSpent = financeState.transactions
    .filter((entry) => entry.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalBudget = allocationSpend.reduce((sum, item) => sum + item.budgetedAmount, 0);
  const utilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <Screen contentStyle={styles.content} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>Just coz we can. Most cards are presentational, but smart allocation is active.</Text>
      </View>

      <AppCard style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Monthly overview</Text>
        <Text style={styles.heroValue}>N {totalSpent.toLocaleString()}</Text>
        <Text style={styles.heroSub}>
          {totalBudget > 0 ? `Using ${utilization}% of your tracked allocation budget.` : "Insights will grow as you create allocations and ledger entries."}
        </Text>
      </AppCard>

      <AppCard style={styles.sectionCard}>
        <SectionHeader title="Budget Utilization" />
        <Text style={styles.bodyText}>
          {totalBudget > 0 ? `You have used N ${totalSpent.toLocaleString()} out of N ${totalBudget.toLocaleString()} tracked locally.` : "There is no budget data yet. Create categories and allocations first."}
        </Text>
      </AppCard>

      <AppCard style={styles.sectionCard}>
        <SectionHeader title="Allocations" actionLabel="View All" onActionPress={() => router.push("/(protected)/(tabs)/budgets" as never)} />
        {allocationSpend.length > 0 ? (
          <View style={styles.legend}>
            {allocationSpend.slice(0, 4).map((item) => (
              <View key={item.id} style={styles.legendRow}>
                <View style={styles.dot} />
                <Text style={styles.legendText}>{item.name}</Text>
                <Text style={styles.legendValue}>{Math.round((item.spent / Math.max(item.budgetedAmount, 1)) * 100)}%</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.bodyText}>No allocations yet, so there is nothing to analyze here yet.</Text>
        )}
      </AppCard>

      <AppCard style={styles.smartCard}>
        <Text style={styles.smartPercent}>{utilization}%</Text>
        <Text style={styles.smartTitle}>Smart Allocation Detection</Text>
        <Text style={styles.smartText}>
          {allocationSpend.length > 0
            ? `Based on your offline activity and ${appState.offlineQueue.length} queued changes, the highest-pressure allocation should be reviewed.`
            : "Once you create allocations and record spend, this card will surface the busiest budget area."}
        </Text>
        <Pressable style={styles.smartButton} onPress={() => router.push("/(protected)/budgets/new-allocation" as never)}>
          <Text style={styles.smartButtonText}>Allocate Now</Text>
        </Pressable>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 32,
    gap: spacing.md,
  },
  header: {
    gap: 4,
  },
  title: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  heroCard: {
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroValue: {
    color: colors.primaryDark,
    fontSize: 30,
    fontWeight: "800",
  },
  heroSub: {
    color: colors.textMuted,
    fontSize: 12,
  },
  sectionCard: {
    gap: spacing.md,
  },
  bodyText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  legend: {
    gap: spacing.sm,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  legendText: {
    flex: 1,
    color: colors.text,
    fontWeight: "700",
  },
  legendValue: {
    color: colors.textMuted,
    fontSize: 12,
  },
  smartCard: {
    backgroundColor: colors.primary,
    gap: spacing.md,
  },
  smartPercent: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: "800",
  },
  smartTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: "800",
  },
  smartText: {
    color: "#D6E5FF",
    fontSize: 13,
    lineHeight: 20,
  },
  smartButton: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  smartButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
});
