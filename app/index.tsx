import { Redirect } from "expo-router";

import { useAppState } from "@/hooks";

export default function Index() {
  const { appState } = useAppState();

  if (!appState.auth.hasAccount) {
    return <Redirect href={"/(auth)/create-account" as never} />;
  }

  if (!appState.auth.isAuthenticated) {
    return <Redirect href={"/(auth)/sign-in" as never} />;
  }

  if (appState.security.faceEnrollmentStatus !== "verified") {
    return <Redirect href={"/(auth)/id-verification" as never} />;
  }

  return <Redirect href={"/(protected)/(tabs)" as never} />;
}
