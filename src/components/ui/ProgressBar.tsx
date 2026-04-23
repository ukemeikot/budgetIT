import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { radius } from "@/theme";

type ProgressBarProps = {
  color?: string;
  progress: number;
  trackColor?: string;
};

export function ProgressBar({
  color = colors.primary,
  progress,
  trackColor = colors.primarySoft,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(progress, 1));

  return (
    <View style={[styles.track, { backgroundColor: trackColor }]}>
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill,
  },
});
