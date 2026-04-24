import { StyleSheet, Text, View } from "react-native";

import { AppCard, AppHeader, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function AllocationLedgerScreen() {
  const { allocationSpend, financeState } = useAppState();
  const selected = allocationSpend[0];
  const ledger = financeState.transactions.filter((entry) => entry.allocationId === selected?.id);

  return (
    <Screen edges={["top", "bottom"]} contentStyle={styles.content}>
      <AppHeader title={selected?.name ?? "Allocation Ledger"} subtitle="Receipts and ledger entries under one allocation" />

      {selected ? (
        <AppCard style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{selected.name}</Text>
          <Text style={styles.summaryAmount}>N {selected.spent.toLocaleString()}</Text>
          <Text style={styles.summarySubtitle}>Spent out of N {selected.budgetedAmount.toLocaleString()}</Text>
        </AppCard>
      ) : (
        <AppCard style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No allocation ledger yet</Text>
          <Text style={styles.emptyText}>Create a category and allocation first, then the ledger under it will appear here.</Text>
        </AppCard>
      )}

      {selected ? (
        ledger.length ? (
          <View style={styles.list}>
            {ledger.map((item) => (
              <AppCard key={item.id} style={styles.itemCard}>
                <View style={styles.row}>
                  <View style={styles.iconWrap} />
                  <View style={styles.meta}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.note ?? "Offline ledger entry"}</Text>
                  </View>
                  <Text style={styles.amount}>N {item.amount.toLocaleString()}</Text>
                </View>
              </AppCard>
            ))}
          </View>
        ) : (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No entries in this allocation</Text>
            <Text style={styles.emptyText}>Once you save transactions against this allocation, they will show up here.</Text>
          </AppCard>
        )
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  summaryCard: {
    gap: spacing.sm,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  summarySubtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  list: {
    gap: spacing.sm,
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
  itemCard: {
    padding: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSoft,
    fontSize: 10,
  },
  amount: {
    color: colors.danger,
    fontWeight: "800",
    fontSize: 12,
  },
});
