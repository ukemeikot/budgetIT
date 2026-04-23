import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  AppCard,
  BarTrendChart,
  ProgressBar,
  Screen,
  SectionHeader,
  SegmentedControl,
} from "@/components/ui";
import { colors } from "@/constants/colors";
import { budgetOverview } from "@/mocks/finance";
import { radius, spacing } from "@/theme";

const filters = ["All", "Below Limit", "Over Limit"];

export function BudgetsScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.avatar} />
          <Text style={styles.brand}>Sovereign Ledger</Text>
        </View>
        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>Personal Analytics</Text>
        <Text style={styles.headerTitle}>Budget Overview</Text>
      </View>

      <SegmentedControl options={filters} value="All" />

      <View style={styles.list}>
        {budgetOverview.map((item, index) => {
          const danger = item.status === "Over Limit";

          return (
            <AppCard key={`${item.title}-${index}`} style={styles.budgetCard}>
              <View style={styles.budgetTop}>
                <View style={[styles.iconWrap, danger && styles.iconWrapDanger]}>
                  <Ionicons
                    name="wallet-outline"
                    size={16}
                    color={danger ? colors.danger : colors.primary}
                  />
                </View>
                <View style={styles.budgetMeta}>
                  <Text style={styles.budgetTitle}>{item.title}</Text>
                  <Text style={styles.budgetSpent}>{item.spent}</Text>
                </View>
                <View style={styles.rightMeta}>
                  <Text style={[styles.budgetStatus, danger && styles.dangerText]}>
                    {item.status}
                  </Text>
                  <Text style={styles.limitText}>{item.limit}</Text>
                </View>
              </View>

              <ProgressBar
                progress={item.progress}
                color={danger ? colors.danger : item.progress > 0.85 ? colors.success : colors.primary}
                trackColor={danger ? colors.dangerSoft : colors.primarySoft}
              />
            </AppCard>
          );
        })}
      </View>

      <Pressable
        style={styles.newCategoryButton}
        onPress={() => router.push("/budgets/details" as never)}
      >
        <View style={styles.plusCircle}>
          <Ionicons name="add" size={18} color={colors.textSoft} />
        </View>
        <Text style={styles.newCategoryText}>New Category</Text>
      </Pressable>
    </Screen>
  );
}

export function BudgetLimitsScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.avatar} />
          <Text style={styles.brand}>Sovereign Ledger</Text>
        </View>
        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <AppCard style={styles.heroAnalytics}>
        <Text style={styles.heroEyebrow}>Smart Prediction</Text>
        <Text style={styles.heroAmount}>$5,910.00</Text>
        <Text style={styles.heroHint}>You have room to save this month</Text>
      </AppCard>

      <AppCard style={styles.chartShell}>
        <SectionHeader title="Spending Trend" />
        <BarTrendChart bars={[40, 78, 66, 52, 72, 86]} labels={["M1", "M2", "M3", "M4", "M5", "M6"]} />
      </AppCard>

      <AppCard style={styles.chartShell}>
        <Text style={styles.smallLabel}>Monthly Budgeting Progress</Text>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalAmount}>$4,280.00</Text>
            <Text style={styles.totalSub}>Available to spend</Text>
          </View>
          <View style={styles.successPill}>
            <Text style={styles.successPillText}>12% Saved</Text>
          </View>
        </View>
      </AppCard>

      <AppCard style={styles.chartShell}>
        <SectionHeader
          title="Recent Allocation Adjustments"
          actionLabel="View All"
          onActionPress={() => router.push("/budgets/details" as never)}
        />
        <View style={styles.adjustmentList}>
          {["Housing", "Dining Out", "Entertainment"].map((item) => (
            <View key={item} style={styles.adjustmentItem}>
              <View style={styles.adjustmentIcon}>
                <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
              </View>
              <Text style={styles.adjustmentTitle}>{item}</Text>
              <Text style={styles.adjustmentValue}>7.0%</Text>
            </View>
          ))}
        </View>
      </AppCard>
    </Screen>
  );
}

export function BudgetDetailScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.detailHeader}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color={colors.text} />
        </Pressable>
        <View style={styles.detailHeaderText}>
          <Text style={styles.detailTitle}>September Budgets</Text>
          <Text style={styles.detailSubtitle}>
            You are ahead of your projected savings. Here are the budgets with room to improve this month.
          </Text>
        </View>
      </View>

      <AppCard style={styles.balancePanel}>
        <Text style={styles.smallLabel}>You Saved</Text>
        <Text style={styles.savedAmount}>$4,280.00</Text>
        <Text style={styles.totalSub}>of this month total budget</Text>
      </AppCard>

      <Pressable style={styles.primaryAction}>
        <Text style={styles.primaryActionText}>Start New Category</Text>
      </Pressable>

      <AppCard style={styles.insightPanel}>
        <Text style={styles.smallLabel}>Your Top Limits</Text>
        <View style={styles.pillRow}>
          <View style={styles.outlinePill}>
            <Text style={styles.outlinePillText}>4 of 6 Budgets</Text>
          </View>
          <View style={styles.outlinePill}>
            <Text style={styles.outlinePillText}>2 Near Limit</Text>
          </View>
        </View>
      </AppCard>

      <View style={styles.list}>
        {[
          { title: "Housing", amount: "$2,450", note: "/ $3,200", progress: 0.82, tone: colors.danger },
          { title: "Dining Out", amount: "$420", note: "/ $600", progress: 0.7, tone: colors.success },
          { title: "Groceries", amount: "$80", note: "/ $120", progress: 0.67, tone: colors.primary },
          { title: "Transport", amount: "$215", note: "/ $340", progress: 0.63, tone: colors.primary },
        ].map((item) => (
          <AppCard key={item.title} style={styles.detailCard}>
            <View style={styles.budgetTop}>
              <View style={styles.iconWrap}>
                <Ionicons name="wallet-outline" size={16} color={colors.primary} />
              </View>
              <View style={styles.budgetMeta}>
                <Text style={styles.budgetTitle}>{item.title}</Text>
                <Text style={styles.budgetSpent}>
                  {item.amount}
                  <Text style={styles.limitInline}> {item.note}</Text>
                </Text>
              </View>
              <View style={styles.greenPill}>
                <Text style={styles.greenPillText}>SAFE ZONE</Text>
              </View>
            </View>
            <ProgressBar progress={item.progress} color={item.tone} />
          </AppCard>
        ))}
      </View>

      <AppCard style={styles.smartCard}>
        <View style={styles.smartChart}>
          <Text style={styles.smartPercent}>75%</Text>
        </View>
        <Text style={styles.smartTitle}>Smart Allocation Detected</Text>
        <Text style={styles.smartText}>
          Your income mix suggests 25% can be reserved for health, travel, and
          no-spend days this month.
        </Text>
        <Pressable style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>Allocate Now</Text>
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
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  header: {
    gap: 4,
  },
  headerEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "800",
  },
  list: {
    gap: spacing.md,
  },
  budgetCard: {
    gap: spacing.md,
  },
  budgetTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapDanger: {
    backgroundColor: colors.dangerSoft,
  },
  budgetMeta: {
    flex: 1,
    gap: 2,
  },
  budgetTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  budgetSpent: {
    color: colors.textMuted,
    fontSize: 12,
  },
  rightMeta: {
    alignItems: "flex-end",
    gap: 2,
  },
  budgetStatus: {
    color: colors.success,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  limitText: {
    color: colors.textSoft,
    fontSize: 10,
  },
  newCategoryButton: {
    minHeight: 92,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  plusCircle: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  newCategoryText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  heroAnalytics: {
    backgroundColor: colors.primary,
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: "#D6E5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  heroAmount: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: "800",
  },
  heroHint: {
    color: "#D6E5FF",
    fontSize: 12,
  },
  chartShell: {
    gap: spacing.md,
  },
  smallLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  totalAmount: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "800",
  },
  totalSub: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  successPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.successSoft,
  },
  successPillText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "800",
  },
  adjustmentList: {
    gap: spacing.sm,
  },
  adjustmentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  adjustmentIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  adjustmentTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  adjustmentValue: {
    color: colors.textSoft,
    fontSize: 12,
  },
  detailHeader: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
  },
  detailHeaderText: {
    flex: 1,
    gap: 6,
    paddingTop: 4,
  },
  detailTitle: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "800",
  },
  detailSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  balancePanel: {
    gap: 6,
  },
  savedAmount: {
    color: colors.primaryDark,
    fontSize: 30,
    fontWeight: "800",
  },
  primaryAction: {
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  primaryActionText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "800",
  },
  insightPanel: {
    gap: spacing.md,
  },
  pillRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  outlinePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlinePillText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  detailCard: {
    gap: spacing.md,
  },
  limitInline: {
    color: colors.textSoft,
  },
  greenPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.successSoft,
  },
  greenPillText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: "800",
  },
  smartCard: {
    backgroundColor: colors.primary,
    gap: spacing.md,
    marginBottom: 18,
  },
  smartChart: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 6,
    borderColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  smartPercent: {
    color: colors.surface,
    fontSize: 18,
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
  secondaryAction: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  secondaryActionText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  dangerText: {
    color: colors.danger,
  },
});
