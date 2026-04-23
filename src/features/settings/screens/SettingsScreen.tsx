import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppCard, Screen, SectionHeader } from "@/components/ui";
import { colors } from "@/constants/colors";
import { radius, spacing } from "@/theme";

const options = [
  { title: "Profile & security", icon: "person-circle-outline" },
  { title: "Currency format", icon: "cash-outline" },
  { title: "Recurring transactions", icon: "repeat-outline" },
  { title: "Export data", icon: "download-outline" },
  { title: "Notifications", icon: "notifications-outline" },
];

export function SettingsScreen() {
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Design shell for preferences and security flow</Text>
      </View>

      <AppCard style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={22} color={colors.primary} />
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.profileName}>Wealth Workspace</Text>
            <Text style={styles.profileHint}>Face verification required for sensitive actions</Text>
          </View>
        </View>
      </AppCard>

      <SectionHeader title="Preferences" />
      <View style={styles.optionList}>
        {options.map((option) => (
          <AppCard key={option.title} style={styles.optionCard}>
            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons
                  name={option.icon as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSoft} />
            </View>
          </AppCard>
        ))}
      </View>

      <Pressable style={styles.primaryAction}>
        <Text style={styles.primaryActionText}>Run Liveness Check</Text>
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    marginBottom: 8,
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
  optionList: {
    gap: spacing.sm,
  },
  optionCard: {
    padding: spacing.md,
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
  primaryAction: {
    minHeight: 50,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  primaryActionText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "800",
  },
});
