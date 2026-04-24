import { PropsWithChildren, ReactNode } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewStyle } from "react-native";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

type ScreenProps = PropsWithChildren<
  ScrollViewProps & {
    backgroundColor?: string;
    contentStyle?: ViewStyle;
    edges?: Edge[];
    footer?: ReactNode;
    safeAreaStyle?: ViewStyle;
    scrollable?: boolean;
    statusBarStyle?: StatusBarStyle;
  }
>;

export function Screen({
  backgroundColor = colors.background,
  children,
  contentStyle,
  contentContainerStyle,
  edges = ["top"],
  footer,
  safeAreaStyle,
  scrollable = true,
  statusBarStyle = "dark",
  ...props
}: ScreenProps) {
  const content = (
    <View style={[styles.content, contentStyle, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, safeAreaStyle]} edges={edges}>
      <StatusBar style={statusBarStyle} backgroundColor={backgroundColor} />
      {scrollable ? (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={scrollable}
          {...props}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
});
