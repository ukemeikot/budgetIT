import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProviders } from "@/providers/AppProviders";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="budgets/details" />
        <Stack.Screen name="budgets/limits" />
        <Stack.Screen name="transactions/new" />
      </Stack>
    </AppProviders>
  );
}
