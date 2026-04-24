import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  AppCard,
  FloatingActionButton,
  LineTrendChart,
  ProgressBar,
  Screen,
  SectionHeader,
} from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function OverviewScreen() {
  const router = useRouter();
  const { allocationSpend, financeState } = useAppState();
  const [fabOpen, setFabOpen] = useState(false);
  const hasAllocations = allocationSpend.length > 0;
  const hasTransactions = financeState.transactions.length > 0;

  const totalAllocated = useMemo(
    () => allocationSpend.reduce((sum, allocation) => sum + allocation.budgetedAmount, 0),
    [allocationSpend],
  );

  const totalSpent = useMemo(
    () => financeState.transactions.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + entry.amount, 0),
    [financeState.transactions],
  );

  const remainingAllocation = Math.max(0, totalAllocated - totalSpent);

  const spendingTrend = useMemo(() => {
    const expenseEntries = financeState.transactions
      .filter((entry) => entry.type === "expense")
      .map((entry) => ({
        amount: entry.amount,
        date: new Date(entry.date),
      }))
      .filter((entry) => !Number.isNaN(entry.date.getTime()));

    const now = new Date();
    const buckets = Array.from({ length: 4 }, (_, index) => {
      const bucketEnd = new Date(now);
      bucketEnd.setHours(23, 59, 59, 999);
      bucketEnd.setDate(now.getDate() - (3 - index) * 7);

      const bucketStart = new Date(bucketEnd);
      bucketStart.setDate(bucketEnd.getDate() - 6);
      bucketStart.setHours(0, 0, 0, 0);

      const total = expenseEntries.reduce((sum, entry) => {
        if (entry.date >= bucketStart && entry.date <= bucketEnd) {
          return sum + entry.amount;
        }

        return sum;
      }, 0);

      return {
        label: `W${index + 1}`,
        total,
      };
    });

    return buckets;
  }, [financeState.transactions]);

  return (
    <Screen contentStyle={styles.content} edges={["top"]}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.avatar} />
          <Text style={styles.brand}>BudgetIT Ledger</Text>
        </View>
        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <AppCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View style={styles.heroMain}>
            <Text style={styles.heroEyebrow}>Available budget portfolio</Text>
            <Text style={styles.heroValue}>
              {hasAllocations ? `N ${remainingAllocation.toLocaleString()}` : "N 0"}
            </Text>
            <Text style={styles.heroSubtitle}>
              {hasAllocations
                ? `Spent N ${totalSpent.toLocaleString()} of N ${totalAllocated.toLocaleString()} allocated this month`
                : "Start by creating categories, allocations, and entries"}
            </Text>
          </View>
          <View style={styles.growthPill}>
            <Text style={styles.growthText}>{financeState.receipts.length} drafts</Text>
          </View>
        </View>

        <View style={styles.heroActions}>
          <Pressable style={styles.heroAction} onPress={() => router.push("/(protected)/ledger" as never)}>
            <Text style={styles.heroActionText}>Ledger</Text>
          </Pressable>
          <Pressable style={styles.heroAction} onPress={() => router.push("/(protected)/budgets/new-allocation" as never)}>
            <Text style={styles.heroActionText}>Allocation</Text>
          </Pressable>
        </View>
      </AppCard>

      <SectionHeader
        title="Allocations"
        actionLabel="View All"
        onActionPress={() => router.push("/(protected)/(tabs)/budgets" as never)}
      />

      {hasAllocations ? (
        <View style={styles.allocationRow}>
          {allocationSpend.slice(0, 3).map((card) => (
            <AppCard key={card.id} style={styles.allocationCard}>
              <View style={styles.allocationIcon}>
                <Ionicons name={card.icon as keyof typeof Ionicons.glyphMap} size={14} color={colors.primary} />
              </View>
              <Text style={styles.allocationTitle}>{card.name}</Text>
              <Text style={styles.allocationAmount}>N {card.budgetedAmount.toLocaleString()}</Text>
              <ProgressBar progress={Math.min(card.spent / Math.max(card.budgetedAmount, 1), 1)} />
            </AppCard>
          ))}
        </View>
      ) : (
        <AppCard style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No allocations yet</Text>
          <Text style={styles.emptyText}>Create your first allocation to start organizing ledger entries and receipts.</Text>
        </AppCard>
      )}

      {hasTransactions ? (
        <AppCard style={styles.chartCard}>
          <SectionHeader title="Spending Trend" subtitle="Last four activity windows" />
          <LineTrendChart
            data={spendingTrend.map((item) => item.total)}
            labels={spendingTrend.map((item) => item.label)}
          />
        </AppCard>
      ) : null}

      <AppCard style={styles.ledgerCard}>
        <SectionHeader title="Recent Ledger" actionLabel="View All" onActionPress={() => router.push("/(protected)/ledger" as never)} />
        {hasTransactions ? (
          <View style={styles.ledgerList}>
            {financeState.transactions.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.ledgerItem}>
                <View style={styles.ledgerIcon}>
                  <Ionicons name="receipt-outline" size={16} color={colors.textMuted} />
                </View>
                <View style={styles.ledgerMeta}>
                  <Text style={styles.ledgerTitle}>{item.title}</Text>
                  <Text style={styles.ledgerSubtitle}>{item.note ?? "Offline ledger entry"}</Text>
                </View>
                <Text style={styles.ledgerAmount}>N {item.amount.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No ledger entries yet. Use the action button to add a manual entry, capture, or upload draft.</Text>
        )}
      </AppCard>

      <FloatingActionButton
        icon={fabOpen ? "close" : "add"}
        isOpen={fabOpen}
        actions={[
          {
            icon: "camera-outline",
            label: "Scan receipts",
            onPress: () => {
              setFabOpen(false);
              router.push("/(protected)/transactions/new?mode=capture" as never);
            },
          },
          {
            icon: "cloud-upload-outline",
            label: "Upload documents",
            onPress: () => {
              setFabOpen(false);
              router.push("/(protected)/transactions/new?mode=upload" as never);
            },
          },
          {
            icon: "create-outline",
            label: "Manual entry",
            onPress: () => {
              setFabOpen(false);
              router.push("/(protected)/transactions/new?mode=manual" as never);
            },
          },
        ]}
        onPress={() => setFabOpen((value) => !value)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  brand: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCard: {
    backgroundColor: colors.primary,
    gap: spacing.md,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  heroMain: {
    flex: 1,
    minWidth: 0,
  },
  heroEyebrow: {
    color: "#C9DCFF",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  heroValue: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 8,
    flexShrink: 1,
  },
  heroSubtitle: {
    color: "#C9DCFF",
    fontSize: 12,
    marginTop: 4,
    flexShrink: 1,
  },
  growthPill: {
    alignSelf: "flex-start",
    flexShrink: 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  growthText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: "700",
  },
  heroActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  heroAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    paddingVertical: 12,
    backgroundColor: colors.primaryDark,
  },
  heroActionText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  allocationRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  allocationCard: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  allocationIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  allocationTitle: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },
  allocationAmount: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: "800",
  },
  chartCard: {
    gap: spacing.md,
  },
  emptyCard: {
    gap: spacing.sm,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  ledgerCard: {
    gap: spacing.md,
  },
  ledgerList: {
    gap: spacing.md,
  },
  ledgerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  ledgerIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  ledgerMeta: {
    flex: 1,
    gap: 2,
  },
  ledgerTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  ledgerSubtitle: {
    color: colors.textSoft,
    fontSize: 10,
  },
  ledgerAmount: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.danger,
  },
});
