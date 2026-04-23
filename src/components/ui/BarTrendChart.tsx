import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { radius, spacing } from "@/theme";

type BarTrendChartProps = {
  bars: number[];
  labels: string[];
};

export function BarTrendChart({
  bars,
  labels,
}: BarTrendChartProps) {
  const max = Math.max(...bars, 1);

  return (
    <View style={styles.wrap}>
      <View style={styles.chart}>
        {bars.map((bar, index) => (
          <View key={`${bar}-${index}`} style={styles.column}>
            <View
              style={[
                styles.bar,
                index === bars.length - 1 && styles.barAccent,
                { height: `${(bar / max) * 100}%` },
              ]}
            />
          </View>
        ))}
      </View>

      <View style={styles.labels}>
        {labels.map((label) => (
          <Text key={label} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  chart: {
    height: 108,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  column: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    padding: 6,
  },
  bar: {
    width: "100%",
    borderRadius: radius.sm,
    backgroundColor: "#C4D0E5",
  },
  barAccent: {
    backgroundColor: colors.primary,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    color: colors.textSoft,
  },
});
