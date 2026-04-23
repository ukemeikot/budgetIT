import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { radius, spacing } from "@/theme";

type SegmentedControlProps = {
  onChange?: (value: string) => void;
  options: string[];
  value: string;
};

export function SegmentedControl({
  onChange,
  options,
  value,
}: SegmentedControlProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = option === value;

        return (
          <Pressable
            key={option}
            onPress={() => onChange?.(option)}
            style={[styles.option, active && styles.optionActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    padding: 4,
    gap: spacing.xs,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  optionActive: {
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.primary,
  },
});
