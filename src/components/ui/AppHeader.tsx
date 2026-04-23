import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { radius } from "@/theme";

type AppHeaderProps = {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  right?: ReactNode;
  subtitle?: string;
  title: string;
};

export function AppHeader({
  leftIcon,
  onLeftPress,
  right,
  subtitle,
  title,
}: AppHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {leftIcon ? (
          <Pressable onPress={onLeftPress} style={styles.iconButton}>
            <Ionicons name={leftIcon} size={18} color={colors.text} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
  },
  side: {
    width: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    alignItems: "flex-end",
  },
  center: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
