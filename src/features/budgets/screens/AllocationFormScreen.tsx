import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, FormScreen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius } from "@/theme";

const keypadRows = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "DEL"],
];

export function AllocationFormScreen() {
  const router = useRouter();
  const { financeState, addAllocation, appState } = useAppState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [recurring, setRecurring] = useState(false);
  const [thresholdAlert, setThresholdAlert] = useState(true);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [amountEntryMode, setAmountEntryMode] = useState(false);

  if (!financeState.categories.length) {
    return (
      <FormScreen
        footer={
          <Pressable style={styles.primaryButton} onPress={() => router.replace("/(protected)/budgets/new-category" as never)}>
            <Text style={styles.primaryButtonText}>Create Category First</Text>
          </Pressable>
        }
      >
        <Header title="Allocation" onBack={() => router.back()} />
        <AppCard style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No category available</Text>
          <Text style={styles.emptyText}>Allocations need a category. Create one first, then come back here.</Text>
        </AppCard>
      </FormScreen>
    );
  }

  const selectedCategory = financeState.categories[selectedCategoryIndex];

  const saveAllocation = () => {
    addAllocation({
      categoryId: selectedCategory.id,
      name: selectedCategory.name,
      icon: selectedCategory.icon,
      budgetedAmount: Number(amount),
      spendLimit: thresholdAlert ? Number(amount) * 0.8 : undefined,
      notificationsEnabled: thresholdAlert,
      recurring: recurring ? (timeframe === "daily" ? "weekly" : timeframe) : "none",
    });

    router.replace("/(protected)/(tabs)/budgets" as never);
  };

  const updateAmount = (key: string) => {
    setAmountEntryMode(true);

    if (key === "DEL") {
      setAmount((current) => {
        const next = current.slice(0, -1);
        return next.length ? next : "0";
      });
      return;
    }

    setAmount((current) => (current === "0.00" ? key : `${current}${key}`));
  };

  return (
    <FormScreen
      contentStyle={styles.content}
      footer={
        <Pressable
          style={[styles.primaryButton, Number(amount) <= 0 && styles.primaryButtonDisabled]}
          disabled={Number(amount) <= 0}
          onPress={saveAllocation}
        >
          <Ionicons name="checkmark-circle" size={14} color={colors.surface} />
          <Text style={styles.primaryButtonText}>{amountEntryMode ? "Save Transaction" : "Save Up!"}</Text>
        </Pressable>
      }
    >
      <Header title="Allocation" onBack={() => router.back()} />

      <View style={styles.topModeRow}>
        <View style={[styles.topModeChip, styles.topModeChipActive]}>
          <Text style={[styles.topModeText, styles.topModeTextActive]}>Expense</Text>
        </View>
        <View style={styles.topModeChip}>
          <Text style={styles.topModeText}>Income</Text>
        </View>
      </View>

      <AppCard style={styles.amountCard}>
        <View style={styles.amountHeader}>
          <Text style={styles.blockLabel}>Amount</Text>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyText}>{appState.settings.preferredCurrency}</Text>
          </View>
        </View>

        <Pressable style={styles.amountRow} onPress={() => setAmountEntryMode(true)}>
          <Text style={styles.amountCurrency}>$</Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </Pressable>
      </AppCard>

      {amountEntryMode ? (
        <View style={styles.keypadCard}>
          {keypadRows.map((row) => (
            <View key={row.join("-")} style={styles.keypadRow}>
              {row.map((key) => (
                <Pressable key={key} style={styles.keypadButton} onPress={() => updateAmount(key)}>
                  {key === "DEL" ? (
                    <Ionicons name="backspace-outline" size={18} color={colors.textMuted} />
                  ) : (
                    <Text style={styles.keypadText}>{key}</Text>
                  )}
                </Pressable>
              ))}
            </View>
          ))}

          <Pressable style={styles.continueButton} onPress={() => setAmountEntryMode(false)}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <AppCard style={styles.blockCard}>
            <Text style={styles.blockLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {financeState.categories.slice(0, 6).map((category, index) => {
                const active = index === selectedCategoryIndex;
                return (
                  <Pressable
                    key={category.id}
                    style={[styles.categoryTile, active && styles.categoryTileActive]}
                    onPress={() => setSelectedCategoryIndex(index)}
                  >
                    <Ionicons
                      name={category.icon as keyof typeof Ionicons.glyphMap}
                      size={16}
                      color={active ? colors.primaryDark : colors.textMuted}
                    />
                    <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          </AppCard>

          <AppCard style={styles.blockCard}>
            <Text style={styles.blockLabel}>Timeframe</Text>
            <View style={styles.timeframeRow}>
              {(["daily", "weekly", "monthly"] as const).map((item) => {
                const active = item === timeframe;
                return (
                  <Pressable
                    key={item}
                    style={[styles.timeframeChip, active && styles.timeframeChipActive]}
                    onPress={() => setTimeframe(item)}
                  >
                    <Text style={[styles.timeframeText, active && styles.timeframeTextActive]}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
              <Text style={styles.dateText}>{new Date().toLocaleDateString("en-US")}</Text>
            </View>

            <ToggleRow
              icon="repeat-outline"
              label="Recurring Transaction"
              value={recurring}
              onPress={() => setRecurring((current) => !current)}
            />
          </AppCard>

          <AppCard style={styles.blockCard}>
            <Text style={styles.alertTitle}>Threshold Alert</Text>
            <ToggleRow
              icon="notifications-outline"
              label="Notify at 80% spending limit"
              value={thresholdAlert}
              onPress={() => setThresholdAlert((current) => !current)}
            />
          </AppCard>

          <AppCard style={styles.notesCard}>
            <Text style={styles.blockLabel}>Notes</Text>
            <TextInput
              multiline
              style={styles.notesInput}
              value={note}
              onChangeText={setNote}
              placeholder="What was this for?"
              placeholderTextColor={colors.textSoft}
            />
          </AppCard>
        </>
      )}
    </FormScreen>
  );
}

function Header({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Ionicons name="chevron-back" size={14} color={colors.primaryDark} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

function ToggleRow({
  icon,
  label,
  onPress,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  value: boolean;
}) {
  return (
    <Pressable style={styles.toggleRow} onPress={onPress}>
      <View style={styles.toggleCopy}>
        <View style={styles.toggleIcon}>
          <Ionicons name={icon} size={14} color={colors.primaryDark} />
        </View>
        <Text style={styles.toggleLabel}>{label}</Text>
      </View>
      <View style={[styles.toggleTrack, value && styles.toggleTrackActive]}>
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
    paddingTop: 2,
    paddingBottom: 24,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 28,
  },
  backButton: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "800",
  },
  topModeRow: {
    flexDirection: "row",
    gap: 6,
  },
  topModeChip: {
    flex: 1,
    minHeight: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6FA",
  },
  topModeChipActive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topModeText: {
    color: colors.textSoft,
    fontSize: 10,
    fontWeight: "700",
  },
  topModeTextActive: {
    color: colors.primaryDark,
  },
  amountCard: {
    padding: 14,
    borderRadius: 20,
    gap: 10,
  },
  amountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blockLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  currencyBadge: {
    minWidth: 34,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
  },
  currencyText: {
    color: colors.surface,
    fontSize: 9,
    fontWeight: "800",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  amountCurrency: {
    color: colors.textSoft,
    fontSize: 20,
    lineHeight: 34,
    fontWeight: "600",
  },
  amountValue: {
    color: colors.primaryDark,
    fontSize: 32,
    fontWeight: "800",
  },
  keypadCard: {
    gap: 8,
  },
  keypadRow: {
    flexDirection: "row",
    gap: 8,
  },
  keypadButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 10,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
    justifyContent: "center",
  },
  keypadText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "500",
  },
  continueButton: {
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: "#D9E3FB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  continueButtonText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
  },
  blockCard: {
    padding: 14,
    borderRadius: 20,
    gap: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryTile: {
    width: "31%",
    minHeight: 56,
    borderRadius: 12,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  categoryTileActive: {
    backgroundColor: "#DCE7FF",
  },
  categoryText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
  },
  categoryTextActive: {
    color: colors.primaryDark,
  },
  timeframeRow: {
    flexDirection: "row",
    gap: 8,
  },
  timeframeChip: {
    minWidth: 56,
    minHeight: 26,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
    justifyContent: "center",
  },
  timeframeChipActive: {
    backgroundColor: "#DCE7FF",
  },
  timeframeText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
  },
  timeframeTextActive: {
    color: colors.primaryDark,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "500",
  },
  toggleRow: {
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  toggleCopy: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  toggleIcon: {
    width: 22,
    height: 22,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleLabel: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "600",
    flex: 1,
  },
  toggleTrack: {
    width: 34,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: "#CCD5E7",
    paddingHorizontal: 2,
    justifyContent: "center",
  },
  toggleTrackActive: {
    backgroundColor: colors.primaryDark,
  },
  toggleThumb: {
    width: 14,
    height: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },
  alertTitle: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "700",
  },
  notesCard: {
    minHeight: 92,
    padding: 14,
    borderRadius: 20,
    gap: 8,
  },
  notesInput: {
    flex: 1,
    color: colors.text,
    fontSize: 11,
    textAlignVertical: "top",
    paddingVertical: 0,
  },
  emptyCard: {
    gap: 8,
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
  primaryButton: {
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.line,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "800",
  },
});
