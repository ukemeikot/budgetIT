import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, FormScreen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius } from "@/theme";

export function CategoryFormScreen() {
  const router = useRouter();
  const { addCategory, appState } = useAppState();
  const presets = [
    { label: "Utilities", icon: "flash-outline", color: "#E14C5A" },
    { label: "Health & Fitness", icon: "barbell-outline", color: "#0D4FB7" },
    { label: "Clothing", icon: "shirt-outline", color: "#1CB874" },
    { label: "Transportation", icon: "bus-outline", color: "#0D4FB7" },
  ];
  const [selected, setSelected] = useState(presets[0]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("0.00");

  const canSave = name.trim().length > 0 && Number(budgetAmount) > 0;

  return (
    <FormScreen
      contentStyle={styles.content}
      footer={
        <Pressable
          style={[styles.primaryButton, !canSave && styles.primaryButtonDisabled]}
          disabled={!canSave}
          onPress={() => {
            addCategory({
              budgetedAmount: Number(budgetAmount),
              color: selected.color,
              icon: selected.icon,
              name,
              note,
            });
            router.replace("/(protected)/budgets/categories" as never);
          }}
        >
          <Text style={styles.primaryButtonText}>Save Up!</Text>
        </Pressable>
      }
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={14} color={colors.primaryDark} />
        </Pressable>
        <Text style={styles.headerTitle}>New Category</Text>
      </View>

      <AppCard style={styles.formCard}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Category Name</Text>
          <View style={styles.inputShell}>
            <Ionicons name="person-outline" size={14} color={colors.textSoft} />
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={colors.textSoft}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Notes</Text>
          <TextInput
            multiline
            value={note}
            onChangeText={setNote}
            style={styles.notesInput}
            placeholder="What was this for?"
            placeholderTextColor={colors.textSoft}
          />
        </View>

        <View style={styles.presetRow}>
          {presets.map((preset) => {
            const active = selected.label === preset.label;
            return (
              <Pressable
                key={preset.label}
                style={[styles.presetChip, active && styles.presetChipActive]}
                onPress={() => {
                  setSelected(preset);
                  setName(preset.label);
                }}
              >
                <Text style={[styles.presetText, active && styles.presetTextActive]}>{preset.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </AppCard>

      <AppCard style={styles.amountCard}>
        <View style={styles.amountHeader}>
          <Text style={styles.amountLabel}>Category Budget</Text>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyText}>{appState.settings.preferredCurrency}</Text>
          </View>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountCurrency}>$</Text>
          <TextInput
            keyboardType="decimal-pad"
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={colors.textSoft}
          />
        </View>
      </AppCard>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
    paddingTop: 4,
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
  formCard: {
    gap: 12,
    padding: 14,
    borderRadius: 18,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  inputShell: {
    minHeight: 36,
    borderRadius: 10,
    backgroundColor: "#F2F4F8",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 11,
    paddingVertical: 0,
  },
  notesInput: {
    minHeight: 86,
    borderRadius: 10,
    backgroundColor: "#F7F8FC",
    paddingHorizontal: 10,
    paddingTop: 10,
    color: colors.text,
    fontSize: 11,
    textAlignVertical: "top",
  },
  presetRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  presetChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "#F7F8FC",
  },
  presetChipActive: {
    backgroundColor: "#E8F0FF",
  },
  presetText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
  },
  presetTextActive: {
    color: colors.primaryDark,
  },
  amountCard: {
    gap: 8,
    padding: 14,
    borderRadius: 18,
  },
  amountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountLabel: {
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
  amountInput: {
    flex: 1,
    color: colors.primaryDark,
    fontSize: 32,
    fontWeight: "800",
    paddingVertical: 0,
  },
  primaryButton: {
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
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
