import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { radius, screenWidth, spacing } from "@/theme";

type LineTrendChartProps = {
  data: number[];
  labels: string[];
};

const CHART_HEIGHT = 118;
const CHART_WIDTH = Math.min(screenWidth - 76, 280);

export function LineTrendChart({
  data,
  labels,
}: LineTrendChartProps) {
  const step = data.length > 1 ? CHART_WIDTH / (data.length - 1) : CHART_WIDTH;

  return (
    <View style={styles.wrap}>
      <View style={[styles.chart, { width: CHART_WIDTH }]}>
        <View style={[styles.gridLine, { top: 18 }]} />
        <View style={[styles.gridLine, { top: 56 }]} />
        <View style={[styles.gridLine, { top: 94 }]} />

        {data.map((point, index) => {
          const x = index * step;
          const y = CHART_HEIGHT - point;
          const next = data[index + 1];

          return (
            <Fragment key={`${point}-${index}`}>
              {typeof next === "number" ? (
                <View
                  style={[
                    styles.segment,
                    {
                      left: x,
                      top: y,
                      width: step,
                      transform: [
                        {
                          rotate: `${Math.atan2(point - next, step) * (180 / Math.PI)}deg`,
                        },
                      ],
                    },
                  ]}
                />
              ) : null}
              <View style={[styles.dot, { left: x - 3, top: y - 3 }]} />
            </Fragment>
          );
        })}
      </View>

      <View style={[styles.labels, { width: CHART_WIDTH }]}>
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
    height: CHART_HEIGHT,
    position: "relative",
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    borderStyle: "dashed",
  },
  segment: {
    position: "absolute",
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  dot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 10,
    color: colors.textSoft,
  },
});
