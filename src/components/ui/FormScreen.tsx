import { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

type FormScreenProps = PropsWithChildren<{
  backgroundColor?: string;
  contentStyle?: ViewStyle;
  edges?: Edge[];
  footer?: ReactNode;
  statusBarStyle?: StatusBarStyle;
}>;

export function FormScreen({
  backgroundColor = colors.background,
  children,
  contentStyle,
  edges = ["top", "bottom"],
  footer,
  statusBarStyle = "dark",
}: FormScreenProps) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={edges}>
      <StatusBar style={statusBarStyle} backgroundColor={backgroundColor} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <KeyboardAwareScrollView
          bottomOffset={24}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, contentStyle]}>{children}</View>
        </KeyboardAwareScrollView>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
});
