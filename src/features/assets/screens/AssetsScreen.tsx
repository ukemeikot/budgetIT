import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, FloatingActionButton, Screen, SectionHeader } from "@/components/ui";
import { colors } from "@/constants/colors";
import { recentLedger } from "@/mocks/finance";
import { radius, spacing } from "@/theme";

export function AssetsScreen() {
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

      <SectionHeader title="Recent Ledger" actionLabel="View All" />

      <View style={styles.list}>
        {recentLedger.map((item) => (
          <AppCard key={item.title} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={styles.iconWrap}>
                <Ionicons name="bag-handle-outline" size={16} color={colors.textMuted} />
              </View>
              <View style={styles.meta}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
              <Text
                style={[
                  styles.amount,
                  item.tone === "success" ? styles.successText : styles.dangerText,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          </AppCard>
        ))}
      </View>

      <FloatingActionButton onPress={() => router.push("/transactions/new" as never)} />
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
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  list: {
    gap: spacing.sm,
    marginBottom: 18,
  },
  itemCard: {
    padding: spacing.md,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  meta: {
    flex: 1,
    gap: 3,
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
  successText: {
    color: colors.success,
  },
  dangerText: {
    color: colors.danger,
  },
});
