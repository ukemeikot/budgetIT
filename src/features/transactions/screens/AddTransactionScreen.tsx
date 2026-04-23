import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, AppHeader, Screen, SegmentedControl } from "@/components/ui";
import { colors } from "@/constants/colors";
import { transactionCategories } from "@/mocks/finance";
import { radius, spacing } from "@/theme";

const keypadRows = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "GO"],
];

export function AddTransactionScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.content} edges={["top", "bottom"]}>
      <AppHeader
        leftIcon="close"
        onLeftPress={() => router.back()}
        title="New Transaction"
      />

      <SegmentedControl options={["Expense", "Income"]} value="Expense" />

      <AppCard style={styles.amountCard}>
        <View style={styles.currencyBadge}>
          <Text style={styles.currencyText}>USD</Text>
        </View>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amountValue}>$ 0.00</Text>
      </AppCard>

      <AppCard style={styles.formCard}>
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.categoryGrid}>
          {transactionCategories.map((category) => (
            <Pressable key={category} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="wallet-outline" size={16} color={colors.primary} />
              </View>
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.sectionLabel}>Date</Text>
          <View style={styles.inputRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
            <Text style={styles.inputValue}>11/13/2023</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.sectionLabel}>Notes</Text>
          <TextInput
            placeholder="What was this for?"
            placeholderTextColor={colors.textSoft}
            style={styles.textInput}
          />
        </View>

        <View style={styles.recurringRow}>
          <View style={styles.recurringLabelWrap}>
            <Ionicons name="repeat-outline" size={16} color={colors.primary} />
            <Text style={styles.recurringLabel}>Recurring Transaction</Text>
          </View>
          <View style={styles.toggle}>
            <View style={styles.toggleThumb} />
          </View>
        </View>

        <View style={styles.frequencyRow}>
          {["Daily", "Weekly", "Monthly"].map((item, index) => (
            <View
              key={item}
              style={[styles.frequencyPill, index === 2 && styles.frequencyPillActive]}
            >
              <Text
                style={[
                  styles.frequencyText,
                  index === 2 && styles.frequencyTextActive,
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.keypadCard}>
        {keypadRows.map((row) => (
          <View key={row.join("-")} style={styles.keypadRow}>
            {row.map((key) => (
              <Pressable key={key} style={styles.keypadButton}>
                <Text style={styles.keypadText}>{key}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </AppCard>

      <Pressable style={styles.saveButton}>
        <Ionicons name="lock-closed" size={14} color={colors.surface} />
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  amountCard: {
    gap: spacing.sm,
  },
  currencyBadge: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  currencyText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: "800",
  },
  amountLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  amountValue: {
    color: colors.primaryDark,
    fontSize: 42,
    fontWeight: "800",
  },
  formCard: {
    gap: spacing.md,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  categoryItem: {
    width: "30.5%",
    minHeight: 70,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },
  inputGroup: {
    gap: spacing.sm,
  },
  inputRow: {
    minHeight: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  inputValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  textInput: {
    minHeight: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 13,
  },
  recurringRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  recurringLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  recurringLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.line,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignSelf: "flex-end",
  },
  frequencyRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  frequencyPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
  frequencyPillActive: {
    backgroundColor: colors.primarySoft,
  },
  frequencyText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  frequencyTextActive: {
    color: colors.primary,
  },
  keypadCard: {
    gap: spacing.sm,
  },
  keypadRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  keypadButton: {
    flex: 1,
    minHeight: 58,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted,
  },
  keypadText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
  },
  saveButton: {
    minHeight: 52,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "800",
  },
});
