import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { AppCard, AppHeader, FormScreen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function ChangePasswordScreen() {
  const router = useRouter();
  const { changePassword } = useAppState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const canSave = currentPassword.length > 0 && nextPassword.length >= 8 && nextPassword === confirmPassword;

  return (
    <FormScreen
      footer={
        <Pressable
          style={[styles.primaryButton, !canSave && styles.primaryButtonDisabled]}
          disabled={!canSave}
          onPress={() => {
            changePassword();
            router.replace("/(auth)/password-success" as never);
          }}
        >
          <Text style={styles.primaryButtonText}>Update Password</Text>
        </Pressable>
      }
    >
      <AppHeader leftIcon="chevron-back" onLeftPress={() => router.back()} title="Change Password" />
      <AppCard style={styles.formCard}>
        <PasswordField label="Current password" value={currentPassword} onChangeText={setCurrentPassword} />
        <PasswordField label="New password" value={nextPassword} onChangeText={setNextPassword} />
        <PasswordField label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} />
      </AppCard>
    </FormScreen>
  );
}

type PasswordFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  value: string;
};

function PasswordField({ label, onChangeText, value }: PasswordFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor={colors.textSoft}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    gap: spacing.md,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: colors.line,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "800",
  },
});
