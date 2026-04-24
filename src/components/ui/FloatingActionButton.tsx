import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { floatingShadow, radius, spacing } from "@/theme";

type FloatingActionButtonProps = {
  actions?: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  }[];
  icon?: keyof typeof Ionicons.glyphMap;
  isOpen?: boolean;
  onPress?: () => void;
};

export function FloatingActionButton({
  actions,
  icon = "add",
  isOpen = false,
  onPress,
}: FloatingActionButtonProps) {
  return (
    <View pointerEvents="box-none" style={styles.container}>
      {isOpen && actions?.length ? (
        <View style={styles.actionRail}>
          {actions.map((action) => (
            <Pressable
              key={action.label}
              onPress={action.onPress}
              style={styles.actionButton}
            >
              <Ionicons name={action.icon} size={18} color={colors.primary} />
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Pressable onPress={onPress} style={styles.button}>
        <Ionicons name={icon} size={20} color={colors.surface} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 18,
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  actionRail: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...floatingShadow,
  },
  actionButton: {
    width: 64,
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    ...floatingShadow,
  },
});
