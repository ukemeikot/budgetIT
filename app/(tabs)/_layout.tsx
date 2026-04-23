import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

const TAB_ICONS = {
  index: "grid-outline",
  budgets: "wallet-outline",
  assets: "layers-outline",
  settings: "settings-outline",
} as const;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 10);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          height: 64 + bottomInset,
          paddingTop: 10,
          paddingBottom: bottomInset,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={TAB_ICONS[route.name as keyof typeof TAB_ICONS]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          title: "Assets",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
