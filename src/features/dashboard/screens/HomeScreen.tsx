import { StyleSheet, Text, View } from "react-native";

import { AppCard, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { QuickActionCard } from "@/features/dashboard/components/QuickActionCard";
import { spacing } from "@/theme";
import { formatCurrency } from "@/utils/currency";

const balance = {
  income: 480000,
  expenses: 192500,
  total: 287500,
};

const focusAreas = [
  {
    title: "Transactions",
    description: "Log income and expenses with categories, notes, and timestamps.",
    badge: "core",
  },
  {
    title: "Budgets",
    description: "Track category limits with monthly or custom time-bound rules.",
    badge: "logic",
  },
  {
    title: "Recurring",
    description: "Model weekly, monthly, and scheduled transactions in one place.",
    badge: "automation",
  },
  {
    title: "Liveness",
    description: "Protect sensitive screens like dashboard access and export actions.",
    badge: "security",
  },
];

export function HomeScreen() {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Expense Tracker</Text>
        <Text style={styles.title}>Stage 2 architecture is ready for build-out.</Text>
        <Text style={styles.subtitle}>
          Screens stay in features, shared UI stays reusable, and business logic
          now has dedicated service and store layers.
        </Text>
      </View>

      <AppCard style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available balance</Text>
        <Text style={styles.balanceValue}>
          {formatCurrency(balance.total, "NGN", "en-NG")}
        </Text>

        <View style={styles.balanceMetaRow}>
          <View style={styles.balanceMetaItem}>
            <Text style={styles.metaLabel}>Income</Text>
            <Text style={styles.metaValue}>
              {formatCurrency(balance.income, "NGN", "en-NG")}
            </Text>
          </View>
          <View style={styles.balanceMetaItem}>
            <Text style={styles.metaLabel}>Expenses</Text>
            <Text style={styles.metaValue}>
              {formatCurrency(balance.expenses, "NGN", "en-NG")}
            </Text>
          </View>
        </View>
      </AppCard>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feature modules</Text>
        <View style={styles.grid}>
          {focusAreas.map((item) => (
            <QuickActionCard
              key={item.title}
              title={item.title}
              description={item.description}
              badge={item.badge}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  balanceCard: {
    gap: spacing.md,
    backgroundColor: colors.primary,
  },
  balanceLabel: {
    color: "#CCFBF1",
    fontSize: 14,
    fontWeight: "600",
  },
  balanceValue: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: "800",
  },
  balanceMetaRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  balanceMetaItem: {
    flex: 1,
    gap: 4,
  },
  metaLabel: {
    color: "#CCFBF1",
    fontSize: 13,
  },
  metaValue: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  grid: {
    gap: spacing.md,
  },
});
