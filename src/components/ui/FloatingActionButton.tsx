import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { floatingShadow, radius } from "@/theme";

type FloatingActionButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function FloatingActionButton({
  icon = "add",
  onPress,
}: FloatingActionButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Ionicons name={icon} size={20} color={colors.surface} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 18,
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    ...floatingShadow,
  },
});
