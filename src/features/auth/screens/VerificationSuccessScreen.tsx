import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AppCard, Screen } from "@/components/ui";
import { colors } from "@/constants/colors";
import { radius, spacing } from "@/theme";

export function VerificationSuccessScreen() {
  const router = useRouter();

  return (
    <Screen
      edges={["top", "bottom"]}
      contentStyle={styles.content}
      footer={
        <Pressable style={styles.primaryButton} onPress={() => router.replace("/(protected)/(tabs)" as never)}>
          <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
        </Pressable>
      }
    >
      <AppCard style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={56} color={colors.primary} />
        </View>
        <Text style={styles.title}>Verification successful</Text>
        <Text style={styles.subtitle}>Your identity check is complete and the protected dashboard is now unlocked.</Text>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  card: {
    gap: spacing.md,
    alignItems: "center",
  },
  iconWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.primaryDark,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "800",
  },
});
