import { PropsWithChildren } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

type ScreenProps = PropsWithChildren<
  ScrollViewProps & {
    backgroundColor?: string;
    contentStyle?: ViewStyle;
    edges?: Edge[];
    safeAreaStyle?: ViewStyle;
    scrollable?: boolean;
  }
>;

export function Screen({
  backgroundColor = colors.background,
  children,
  contentStyle,
  contentContainerStyle,
  edges = ["top"],
  safeAreaStyle,
  scrollable = true,
  ...props
}: ScreenProps) {
  const content = (
    <View style={[styles.content, contentStyle, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, safeAreaStyle]} edges={edges}>
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
});
