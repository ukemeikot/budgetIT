import { StyleSheet, Text, View } from "react-native";

import { AppCard } from "@/components/ui";
import { colors } from "@/constants/colors";
import { radius, spacing } from "@/theme";

type QuickActionCardProps = {
  title: string;
  description: string;
  badge: string;
};

export function QuickActionCard({
  title,
  description,
  badge,
}: QuickActionCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: spacing.sm,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    backgroundColor: colors.primarySoft,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
