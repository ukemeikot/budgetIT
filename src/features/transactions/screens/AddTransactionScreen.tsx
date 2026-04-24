import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppCard, FormScreen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

type TransactionMode = "manual" | "capture" | "upload";

export function AddTransactionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string }>();
  const { financeState, addLedgerEntry, addReceiptDraft, appState } = useAppState();
  const initialMode = (params.mode ?? "manual").toLowerCase() as TransactionMode;
  const [mode, setMode] = useState<TransactionMode>(initialMode);
  const [showCapturedData, setShowCapturedData] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [selectedAllocationIndex, setSelectedAllocationIndex] = useState(0);

  const selectedAllocation = financeState.allocations[selectedAllocationIndex];
  const today = new Date().toLocaleDateString("en-US");

  if (!financeState.allocations.length) {
    return (
      <FormScreen
        footer={
          <Pressable style={styles.primaryButton} onPress={() => router.replace("/(protected)/budgets/new-allocation" as never)}>
            <Text style={styles.primaryButtonText}>Create Allocation First</Text>
          </Pressable>
        }
      >
        <Header title="Add Transaction" onBack={() => router.back()} />
        <AppCard style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No allocation available</Text>
          <Text style={styles.emptyText}>Create a category and allocation first so this screen has somewhere to store the ledger entry.</Text>
        </AppCard>
      </FormScreen>
    );
  }

  const canSave =
    mode === "manual"
      ? Number(amount) > 0 && title.trim().length > 0
      : showCapturedData;

  const saveEntry = () => {
    const source = mode === "manual" ? "manual" : mode === "capture" ? "capture" : "upload";
    const entryTitle =
      title.trim() ||
      (mode === "manual"
        ? "Manual ledger entry"
        : mode === "capture"
          ? "Captured receipt draft"
          : "Uploaded document draft");

    const entryId = addLedgerEntry({
      title: entryTitle,
      allocationId: selectedAllocation.id,
      categoryId: selectedAllocation.categoryId,
      amount: Number(amount),
      type: "expense",
      source,
      merchant: source === "manual" ? "Offline entry" : "Pending extraction",
      date: new Date().toISOString().slice(0, 10),
      note: note.trim() || (source === "manual" ? "Saved locally on device" : "Result of captured data"),
    });

    if (source !== "manual") {
      addReceiptDraft({
        allocationId: selectedAllocation.id,
        ledgerEntryId: entryId,
        source,
        extractionStatus: "pending",
      });
    }

    router.replace("/(protected)/ledger" as never);
  };

  const switchMode = (nextMode: TransactionMode) => {
    setMode(nextMode);
    setShowCapturedData(false);
  };

  return (
    <FormScreen
      contentStyle={styles.content}
      footer={
        <Pressable
          style={[styles.primaryButton, !canSave && styles.primaryButtonDisabled]}
          disabled={!canSave}
          onPress={saveEntry}
        >
          <Text style={styles.primaryButtonText}>Save Up!</Text>
        </Pressable>
      }
    >
      <Header title={showCapturedData ? "Captured Data" : "Add Transaction"} onBack={() => router.back()} />

      <View style={styles.tabRow}>
        {(["manual", "capture", "upload"] as TransactionMode[]).map((tab) => {
          const active = tab === mode;
          const label = tab === "manual" ? "Manual" : tab === "capture" ? "Capture" : "Upload Data";

          return (
            <Pressable
              key={tab}
              style={[styles.tabButton, active && styles.tabButtonActive]}
              onPress={() => switchMode(tab)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {mode === "manual" ? (
        <>
          <AppCard style={styles.formCard}>
            <LabeledField
              icon="person-outline"
              label="Add Transaction"
              placeholder="John Doe"
              value={title}
              onChangeText={setTitle}
            />

            <StaticField icon="calendar-outline" label="Add Transaction" value={today} />

            <Pressable
              style={styles.fieldGroup}
              onPress={() =>
                setSelectedAllocationIndex((current) => (current + 1) % financeState.allocations.length)
              }
            >
              <Text style={styles.fieldLabel}>Add Allocation</Text>
              <View style={styles.inputShell}>
                <Text style={styles.inputValue}>{selectedAllocation.name}</Text>
                <Ionicons name="chevron-down" size={14} color={colors.textSoft} />
              </View>
            </Pressable>
          </AppCard>

          <AppCard style={styles.amountCard}>
            <View style={styles.amountHeader}>
              <Text style={styles.amountLabel}>Amount</Text>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyText}>{appState.settings.preferredCurrency}</Text>
              </View>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.amountCurrency}>$</Text>
              <TextInput
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={colors.textSoft}
              />
            </View>
          </AppCard>

          <AppCard style={styles.notesCard}>
            <Text style={styles.fieldLabel}>Notes</Text>
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
      ) : showCapturedData ? (
        <AppCard style={styles.captureResultCard}>
          <Text style={styles.captureResultText}>Result of captured{"\n"}Data</Text>
          <Text style={styles.captureResultHint}>Figure this one out too !!!</Text>
        </AppCard>
      ) : (
        <Pressable style={styles.captureCard} onPress={() => setShowCapturedData(true)}>
          <View style={styles.captureIconWrap}>
            <Ionicons name="receipt-outline" size={22} color={colors.primaryDark} />
          </View>
          <Text style={styles.captureTitle}>Capture{"\n"}something</Text>
          <Text style={styles.captureHint}>Figure this one out!!!</Text>
        </Pressable>
      )}
    </FormScreen>
  );
}

function Header({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={16} color={colors.primaryDark} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

function LabeledField({
  icon,
  label,
  onChangeText,
  placeholder,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name={icon} size={14} color={colors.textSoft} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textSoft}
        />
      </View>
    </View>
  );
}

function StaticField({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name={icon} size={14} color={colors.textSoft} />
        <Text style={styles.inputValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
    paddingTop: 2,
    paddingBottom: spacing.lg,
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
  tabRow: {
    flexDirection: "row",
    gap: 6,
    padding: 4,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabButton: {
    flex: 1,
    minHeight: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: colors.primarySoft,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
  },
  tabTextActive: {
    color: colors.primaryDark,
  },
  formCard: {
    gap: 10,
    padding: 12,
    borderRadius: 16,
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
  textInput: {
    flex: 1,
    color: colors.text,
    fontSize: 11,
    paddingVertical: 0,
  },
  inputValue: {
    flex: 1,
    color: colors.textSoft,
    fontSize: 11,
  },
  amountCard: {
    gap: 8,
    padding: 12,
    borderRadius: 16,
  },
  amountHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "600",
    lineHeight: 34,
  },
  amountInput: {
    flex: 1,
    color: colors.primaryDark,
    fontSize: 32,
    fontWeight: "800",
    paddingVertical: 0,
  },
  notesCard: {
    gap: 6,
    padding: 12,
    borderRadius: 16,
    minHeight: 126,
  },
  notesInput: {
    flex: 1,
    color: colors.text,
    fontSize: 11,
    textAlignVertical: "top",
    paddingVertical: 0,
  },
  captureCard: {
    minHeight: 230,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D5E3F7",
    borderStyle: "dashed",
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: spacing.lg,
  },
  captureIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#DCE7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  captureTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },
  captureHint: {
    color: colors.text,
    fontSize: 12,
    textAlign: "center",
  },
  captureResultCard: {
    minHeight: 245,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  captureResultText: {
    color: colors.text,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  captureResultHint: {
    color: colors.text,
    fontSize: 13,
    textAlign: "center",
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
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: "#0D4FB7",
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
