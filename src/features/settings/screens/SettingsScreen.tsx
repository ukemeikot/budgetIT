import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAppState } from "@/hooks";
import { radius, spacing } from "@/theme";

export function SettingsScreen() {
  const router = useRouter();
  const { appState, signOut } = useAppState();

  return (
    <Screen contentStyle={styles.content} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Reduced to password and identity controls.</Text>
      </View>

      <AppCard style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={22} color={colors.primary} />
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.profileName}>{appState.auth.email || "Device workspace"}</Text>
            <Text style={styles.profileHint}>
              Identity status: {appState.security.faceEnrollmentStatus === "verified" ? "Verified" : "Pending"}
            </Text>
          </View>
        </View>
      </AppCard>

      <Pressable style={styles.optionCard} onPress={() => router.push("/(auth)/change-password" as never)}>
        <View style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
          </View>
          <Text style={styles.optionTitle}>Change Password</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSoft} />
        </View>
      </Pressable>

      <Pressable style={styles.optionCard} onPress={() => router.push("/(auth)/id-verification" as never)}>
        <View style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Ionicons name="scan-outline" size={18} color={colors.primary} />
          </View>
          <Text style={styles.optionTitle}>ID Verification</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSoft} />
        </View>
      </Pressable>

      <Pressable style={styles.signOutButton} onPress={() => {
        signOut();
        router.replace("/(auth)/sign-in" as never);
      }}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 32,
    gap: spacing.md,
  },
  header: {
    gap: 4,
  },
  title: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  profileCard: {
    gap: spacing.md,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  profileMeta: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  profileHint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  optionCard: {
    minHeight: 64,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    justifyContent: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  signOutButton: {
    minHeight: 50,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dangerSoft,
    marginTop: 8,
  },
  signOutText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "800",
  },
});
