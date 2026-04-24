import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { AppCard, AppHeader, FormScreen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function SignInScreen() {
  const router = useRouter();
  const { appState, signIn } = useAppState();
  const [email, setEmail] = useState(appState.auth.email || "hello@budgetit.app");
  const [password, setPassword] = useState("");

  return (
    <FormScreen
      footer={
        <Pressable
          style={[styles.primaryButton, password.length < 8 && styles.primaryButtonDisabled]}
          disabled={password.length < 8}
          onPress={() => {
            signIn(email);
            if (appState.security.faceEnrollmentStatus === "verified") {
              router.replace("/(protected)/(tabs)" as never);
              return;
            }

            router.replace("/(auth)/id-verification" as never);
          }}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </Pressable>
      }
    >
      <AppHeader title="Sign In" subtitle="Welcome back to your workspace" />
      <AppCard style={styles.formCard}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email address</Text>
          <TextInput
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="name@email.com"
            placeholderTextColor={colors.textSoft}
          />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={colors.textSoft}
          />
        </View>

        <Pressable onPress={() => router.push("/(auth)/change-password" as never)}>
          <Text style={styles.linkText}>Forgot or change password</Text>
        </Pressable>
      </AppCard>
    </FormScreen>
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
  linkText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
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
