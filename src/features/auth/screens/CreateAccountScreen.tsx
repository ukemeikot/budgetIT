import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

import { FormScreen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { spacing } from "@/theme";

const bankIconXml = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 16V9H5V16H3ZM9 16V9H11V16H9ZM0 20V18H20V20H0ZM15 16V9H17V16H15ZM0 7V5L10 0L20 5V7H0ZM4.45 5H10H15.55H4.45ZM4.45 5H15.55L10 2.25L4.45 5Z" fill="#1B365D"/>
</svg>`;

export function CreateAccountScreen() {
  const router = useRouter();
  const { createAccount } = useAppState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canContinue = fullName.trim().length > 1 && email.length > 5 && password.length >= 8;

  return (
    <FormScreen contentStyle={styles.content} edges={["top", "bottom"]}>
      <View style={styles.brandBar}>
        <View style={styles.brandRow}>
          <SvgXml xml={bankIconXml} width={14} height={14} />
          <Text style={styles.brandText}>Surveying Expenses</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.copyBlock}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Secure your financial data today.</Text>
        </View>

        <View style={styles.formCard}>
          <Field
            icon="person-outline"
            keyboardType="default"
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />

          <Field
            icon="mail-outline"
            keyboardType="email-address"
            label="Email Address"
            placeholder="john@company.com"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordField
            label="Password"
            placeholder=".............."
            value={password}
            visible={showPassword}
            onChangeText={setPassword}
            onToggleVisibility={() => setShowPassword((value) => !value)}
          />

          <Pressable
            style={[styles.primaryButton, !canContinue && styles.primaryButtonDisabled]}
            disabled={!canContinue}
            onPress={() => {
              createAccount(email);
              router.replace("/(auth)/verify-email" as never);
            }}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.surface} />
          </Pressable>

          <View style={styles.signInRow}>
            <Text style={styles.signInPrompt}>Already have an account?</Text>
            <Pressable onPress={() => router.replace("/(auth)/sign-in" as never)}>
              <Text style={styles.signInLink}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </FormScreen>
  );
}

type FieldProps = {
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType: "default" | "email-address";
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

function Field({
  icon,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  value,
}: FieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name={icon} size={16} color={colors.textSoft} />
        <TextInput
          autoCapitalize="none"
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.textSoft}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

type PasswordFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  onToggleVisibility: () => void;
  placeholder: string;
  value: string;
  visible: boolean;
};

function PasswordField({
  label,
  onChangeText,
  onToggleVisibility,
  placeholder,
  value,
  visible,
}: PasswordFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name="lock-closed-outline" size={16} color={colors.textSoft} />
        <TextInput
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={colors.textSoft}
          secureTextEntry={!visible}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
        <Pressable onPress={onToggleVisibility} hitSlop={8}>
          <Ionicons
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={16}
            color={colors.textSoft}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: spacing.xl,
    gap: 0,
  },
  brandBar: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingTop: 40,
    gap: spacing.xl,
  },
  copyBlock: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: colors.primaryDark,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: "center",
  },
  formCard: {
    gap: 14,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text,
  },
  inputShell: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    backgroundColor: "#F7F8FC",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    paddingVertical: 0,
  },
  primaryButton: {
    marginTop: 2,
    minHeight: 40,
    borderRadius: 12,
    backgroundColor: "#1557D6",
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
  signInRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 2,
  },
  signInPrompt: {
    color: colors.textMuted,
    fontSize: 11,
  },
  signInLink: {
    color: "#1557D6",
    fontSize: 11,
    fontWeight: "700",
  },
});
