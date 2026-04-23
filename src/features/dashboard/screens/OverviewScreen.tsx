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
import {
  allocationCards,
  portfolioSummary,
  recentLedger,
  savingsBuckets,
} from "@/mocks/finance";
import { radius, spacing } from "@/theme";

export function OverviewScreen() {
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

      <AppCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroEyebrow}>Liquid Wealth Portfolio</Text>
            <Text style={styles.heroValue}>{portfolioSummary.balance}</Text>
            <Text style={styles.heroSubtitle}>{portfolioSummary.subtitle}</Text>
          </View>
          <View style={styles.growthPill}>
            <Text style={styles.growthText}>{portfolioSummary.growth}</Text>
          </View>
        </View>

        <View style={styles.heroActions}>
          <Pressable style={styles.heroAction}>
            <Text style={styles.heroActionText}>Deposit</Text>
          </Pressable>
          <Pressable style={styles.heroAction}>
            <Text style={styles.heroActionText}>Withdraw</Text>
          </Pressable>
        </View>
      </AppCard>

      <View style={styles.iconRail}>
        {["airplane", "wallet", "card", "bar-chart"].map((icon) => (
          <View key={icon} style={styles.iconTile}>
            <Ionicons
              name={icon as keyof typeof Ionicons.glyphMap}
              size={16}
              color={colors.primary}
            />
          </View>
        ))}
      </View>

      <SectionHeader
        title="Allocations"
        actionLabel="View All"
        onActionPress={() => router.push("/budgets/limits" as never)}
      />
      <View style={styles.allocationRow}>
        {allocationCards.map((card, index) => (
          <AppCard key={`${card.title}-${index}`} style={styles.allocationCard}>
            <View style={styles.allocationIcon}>
              <Ionicons name="wallet-outline" size={14} color={colors.primary} />
            </View>
            <Text style={styles.allocationTitle}>{card.title}</Text>
            <Text style={styles.allocationAmount}>{card.amount}</Text>
            <Text
              style={[
                styles.allocationStatus,
                card.tone === "danger" && styles.dangerText,
              ]}
            >
              {card.status}
            </Text>
          </AppCard>
        ))}
      </View>

      <AppCard style={styles.chartCard}>
        <SectionHeader title="Spending Trend" subtitle="Oct 1 - Oct 31, 2023" />
        <LineTrendChart data={[38, 58, 46, 40, 74, 68, 34]} labels={["W1", "W2", "W3", "W4"]} />
      </AppCard>

      <AppCard style={styles.chartCard}>
        <SectionHeader title="Savings" />
        <View style={styles.savingsList}>
          {savingsBuckets.map((item) => (
            <View key={item.label} style={styles.savingsItem}>
              <View style={styles.savingsRow}>
                <Text style={styles.savingsLabel}>{item.label}</Text>
                <Text style={styles.savingsValue}>{item.value}</Text>
              </View>
              <ProgressBar progress={item.progress} />
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.ledgerCard}>
        <SectionHeader
          title="Recent Ledger"
          actionLabel="View All"
          onActionPress={() => router.push("/(tabs)/assets" as never)}
        />
        <View style={styles.ledgerList}>
          {recentLedger.slice(0, 3).map((item) => (
            <View key={item.title} style={styles.ledgerItem}>
              <View style={styles.ledgerIcon}>
                <Ionicons name="bag-handle-outline" size={16} color={colors.textMuted} />
              </View>
              <View style={styles.ledgerMeta}>
                <Text style={styles.ledgerTitle}>{item.title}</Text>
                <Text style={styles.ledgerSubtitle}>{item.subtitle}</Text>
              </View>
              <Text
                style={[
                  styles.ledgerAmount,
                  item.tone === "success" ? styles.successText : styles.dangerText,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </AppCard>

      <FloatingActionButton onPress={() => router.push("/transactions/new" as never)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 40,
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
    gap: spacing.md,
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
  },
  heroSubtitle: {
    color: "#C9DCFF",
    fontSize: 12,
    marginTop: 4,
  },
  growthPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  growthText: {
    color: colors.successSoft,
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
    letterSpacing: 0.6,
  },
  iconRail: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  allocationRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  allocationCard: {
    flex: 1,
    padding: spacing.md,
    gap: 8,
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
    fontSize: 18,
    fontWeight: "800",
  },
  allocationStatus: {
    color: colors.textSoft,
    fontSize: 10,
    fontWeight: "700",
  },
  chartCard: {
    gap: spacing.md,
  },
  savingsList: {
    gap: spacing.md,
  },
  savingsItem: {
    gap: spacing.sm,
  },
  savingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  savingsLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  savingsValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "800",
  },
  ledgerCard: {
    gap: spacing.md,
    marginBottom: 24,
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
  },
  successText: {
    color: colors.success,
  },
  dangerText: {
    color: colors.danger,
  },
});
