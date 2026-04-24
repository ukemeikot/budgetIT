import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, BarTrendChart, ProgressBar, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius } from "@/theme";

export function BudgetsScreen() {
  const router = useRouter();
  const { categorySpend, financeState } = useAppState();

  const totalCategoryBudget = categorySpend.reduce((sum, category) => sum + category.budgetedAmount, 0);
  const totalSpent = categorySpend.reduce((sum, category) => sum + category.spent, 0);
  const remaining = Math.max(0, totalCategoryBudget - totalSpent);
  const spendingVelocity = totalCategoryBudget > 0 ? ((totalSpent / totalCategoryBudget) * 100).toFixed(1) : "0.0";

  const chartBars = useMemo(() => {
    const expenses = financeState.transactions.filter((entry) => entry.type === "expense");
    return Array.from({ length: 6 }, (_, index) => {
      const slice = expenses.slice(index * 2, index * 2 + 2);
      return slice.reduce((sum, entry) => sum + entry.amount, 0) || (index + 2) * 5000;
    });
  }, [financeState.transactions]);

  return (
    <Screen contentStyle={styles.content} edges={["top", "bottom"]}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.avatar} />
          <Text style={styles.brand}>Sovereign Ledger</Text>
        </View>
        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={15} color={colors.textMuted} />
        </Pressable>
      </View>

      <AppCard style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroEyebrow}>Monthly Burn</Text>
            <Text style={styles.heroAmount}>${remaining.toLocaleString()}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>ON TRACK</Text>
          </View>
        </View>

        <ProgressBar progress={totalCategoryBudget > 0 ? totalSpent / totalCategoryBudget : 0} color={colors.surface} trackColor="rgba(255,255,255,0.35)" />

        <View style={styles.heroBottom}>
          <Text style={styles.heroMeta}>Cash flow based on ${totalCategoryBudget.toLocaleString()} limit</Text>
          <Text style={styles.heroMeta}>${totalSpent.toLocaleString()} burn</Text>
        </View>
      </AppCard>

      <AppCard style={styles.chartCard}>
        <View style={styles.metricHeader}>
          <View>
            <Text style={styles.metricTitle}>Spending Velocity</Text>
            <Text style={styles.metricSubtitle}>Trend relative to baseline</Text>
          </View>
          <View style={styles.metricBadge}>
            <Text style={styles.metricBadgeText}>+{spendingVelocity}%</Text>
          </View>
        </View>

        <BarTrendChart bars={chartBars} labels={["MON", "TUE", "WED", "THU", "FRI", "SAT"]} />

        <View style={styles.remainingPill}>
          <Ionicons name="wallet-outline" size={14} color={colors.success} />
          <Text style={styles.remainingPillText}>Budget Remaining ${remaining.toLocaleString()}</Text>
        </View>
      </AppCard>

      <AppCard style={styles.quickActionsCard}>
        <Text style={styles.sectionCaption}>Category</Text>
        <View style={styles.quickActionsRow}>
          {categorySpend.slice(0, 3).map((category) => (
            <View key={category.id} style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={15} color={colors.primaryDark} />
              </View>
              <Text style={styles.quickActionText}>{category.name}</Text>
            </View>
          ))}
          <Pressable style={styles.quickAction} onPress={() => router.push("/(protected)/budgets/new-category" as never)}>
            <View style={[styles.quickActionIcon, styles.quickActionIconAccent]}>
              <Ionicons name="add" size={16} color={colors.primaryDark} />
            </View>
            <Text style={styles.quickActionText}>New</Text>
          </Pressable>
        </View>
      </AppCard>

      <Pressable style={styles.addCategoryButton} onPress={() => router.push("/(protected)/budgets/new-category" as never)}>
        <Ionicons name="add" size={16} color={colors.surface} />
        <Text style={styles.addCategoryButtonText}>Add New Category</Text>
      </Pressable>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Pressable onPress={() => router.push("/(protected)/budgets/categories" as never)}>
          <Text style={styles.sectionLink}>VIEW ALL</Text>
        </Pressable>
      </View>

      <View style={styles.categoryList}>
        {categorySpend.slice(0, 4).map((category) => {
          const progress = category.budgetedAmount > 0 ? category.spent / category.budgetedAmount : 0;
          const over = progress >= 1;
          return (
            <AppCard key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryCardTop}>
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={14} color={colors.primaryDark} />
                </View>
                <View style={styles.categoryCopy}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryBudget}>${category.budgetedAmount.toLocaleString()}</Text>
                </View>
                <Text style={[styles.categoryLeft, over && styles.categoryLeftDanger]}>${category.left.toLocaleString()} LEFT</Text>
              </View>
              <ProgressBar progress={Math.min(progress, 1)} color={over ? colors.danger : colors.primary} trackColor="#E1E7F0" />
            </AppCard>
          );
        })}
      </View>
    </Screen>
  );
}

export function BudgetLimitsScreen() {
  return <BudgetsScreen />;
}

export function BudgetDetailScreen() {
  return <CategoriesScreen />;
}

export function CategoriesScreen() {
  const router = useRouter();
  const { categorySpend } = useAppState();

  return (
    <Screen contentStyle={styles.content} edges={["top", "bottom"]}>
      <View style={styles.topRow}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={15} color={colors.primaryDark} />
        </Pressable>
        <Text style={styles.headerLabel}>Categories</Text>
        <View style={styles.iconButtonSpacer} />
      </View>

      <View style={styles.categoryList}>
        {categorySpend.map((category) => {
          const progress = category.budgetedAmount > 0 ? category.spent / category.budgetedAmount : 0;
          const over = progress >= 1;
          return (
            <AppCard key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryCardTop}>
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={14} color={colors.primaryDark} />
                </View>
                <View style={styles.categoryCopy}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryBudget}>${category.budgetedAmount.toLocaleString()}</Text>
                </View>
                <Text style={[styles.categoryLeft, over && styles.categoryLeftDanger]}>${category.left.toLocaleString()} LEFT</Text>
              </View>
              <ProgressBar progress={Math.min(progress, 1)} color={over ? colors.danger : colors.primary} trackColor="#E1E7F0" />
            </AppCard>
          );
        })}
      </View>

      <Pressable style={styles.createCategoryCard} onPress={() => router.push("/(protected)/budgets/new-category" as never)}>
        <View style={styles.quickAddIcon}>
          <Ionicons name="receipt-outline" size={18} color={colors.primaryDark} />
        </View>
        <Text style={styles.createCategoryText}>Create New Category</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryDark,
  },
  brand: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: "800",
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonSpacer: {
    width: 28,
  },
  headerLabel: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "800",
  },
  heroCard: {
    backgroundColor: colors.primaryDark,
    gap: 12,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroEyebrow: {
    color: "#D6E5FF",
    fontSize: 8,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroAmount: {
    color: colors.surface,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  statusText: {
    color: "#A8F1CD",
    fontSize: 8,
    fontWeight: "800",
  },
  heroBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroMeta: {
    color: "#D6E5FF",
    fontSize: 8,
    fontWeight: "600",
  },
  chartCard: {
    gap: 12,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  metricTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "800",
  },
  metricSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 2,
  },
  metricBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: "#E7F7F1",
  },
  metricBadgeText: {
    color: "#108B67",
    fontSize: 8,
    fontWeight: "800",
  },
  remainingPill: {
    minHeight: 32,
    borderRadius: 12,
    backgroundColor: "#F6F8FC",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  remainingPillText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: "700",
  },
  quickActionsCard: {
    gap: 10,
  },
  sectionCaption: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  quickActionIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionIconAccent: {
    backgroundColor: "#DCE7FF",
  },
  quickActionText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
  },
  addCategoryButton: {
    minHeight: 40,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addCategoryButtonText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "800",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },
  sectionLink: {
    color: colors.primaryDark,
    fontSize: 9,
    fontWeight: "800",
  },
  categoryList: {
    gap: 10,
  },
  categoryCard: {
    padding: 12,
    gap: 10,
    borderRadius: 18,
  },
  categoryCardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryCopy: {
    flex: 1,
    gap: 3,
  },
  categoryName: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },
  categoryBudget: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "800",
  },
  categoryLeft: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: "700",
  },
  categoryLeftDanger: {
    color: colors.danger,
  },
  createCategoryCard: {
    minHeight: 108,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D9E4F5",
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  quickAddIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#DCE7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  createCategoryText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
  },
});
