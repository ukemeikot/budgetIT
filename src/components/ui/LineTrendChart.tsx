import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-wagmi-charts";

import { colors } from "@/constants/colors";
import { screenWidth, spacing } from "@/theme";

type LineTrendChartProps = {
  data: number[];
  labels: string[];
};

const CHART_HEIGHT = 140;
const CHART_WIDTH = screenWidth - 76;

export function LineTrendChart({ data, labels }: LineTrendChartProps) {
  // Map your numeric data to the required object format
  const formattedData = data.map((val, index) => ({
    timestamp: index,
    value: val,
  }));

  return (
    <View style={styles.container}>
      <LineChart.Provider data={formattedData}>
        <LineChart height={CHART_HEIGHT} width={CHART_WIDTH}>
          {/* Path now has a closing tag to wrap the Gradient */}
          <LineChart.Path color={colors.primary} width={3}>
            <LineChart.Gradient color={colors.primary} />
          </LineChart.Path>

          {/* Use CursorCrosshair with a nested Cursor to handle tooltips */}
          <LineChart.CursorCrosshair color={colors.primary}>
            <LineChart.Tooltip />
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>

      <View style={[styles.labels, { width: CHART_WIDTH }]}>
        {labels.map((label, index) => (
          <Text key={`${label}-${index}`} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
    width: '100%',
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
  },
});