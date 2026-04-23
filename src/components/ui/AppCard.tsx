import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { colors } from "@/constants/colors";
import { cardShadow, radius, spacing } from "@/theme";

type AppCardProps = PropsWithChildren<ViewProps>;

export function AppCard({
  children,
  style,
  ...props
}: AppCardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...cardShadow,
  },
});
