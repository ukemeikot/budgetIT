import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, AppHeader, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function LedgerScreen() {
  const router = useRouter();
  const { financeState } = useAppState();
  const hasTransactions = financeState.transactions.length > 0;

  return (
    <Screen
      edges={["top", "bottom"]}
      contentStyle={styles.content}
      footer={
        <Pressable style={styles.quickAddButton} onPress={() => router.push("/(protected)/transactions/new" as never)}>
          <Ionicons name="add" size={18} color={colors.surface} />
          <Text style={styles.quickAddText}>Quick Add</Text>
        </Pressable>
      }
    >
      <AppHeader leftIcon="chevron-back" onLeftPress={() => router.back()} title="Recent Ledgers" />

      {hasTransactions ? (
        <View style={styles.list}>
          {financeState.transactions.map((item) => (
            <AppCard key={item.id} style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name={item.source === "manual" ? "create-outline" : item.source === "capture" ? "camera-outline" : "cloud-upload-outline"}
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.meta}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>
                    {(item.merchant ?? "Offline entry").toUpperCase()} | {item.date}
                  </Text>
                </View>
                <Text style={[styles.amount, item.type === "expense" ? styles.expense : styles.income]}>
                  {item.type === "expense" ? "-" : "+"}N {item.amount.toLocaleString()}
                </Text>
              </View>
            </AppCard>
          ))}
        </View>
      ) : (
        <AppCard style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No ledger entries yet</Text>
          <Text style={styles.emptyText}>Your manual entries, receipt captures, and uploads will all appear here.</Text>
        </AppCard>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  list: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  itemCard: {
    padding: spacing.md,
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
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 12,
    fontWeight: "800",
  },
  income: {
    color: colors.success,
  },
  expense: {
    color: colors.danger,
  },
  quickAddButton: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAddText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "800",
  },
});
