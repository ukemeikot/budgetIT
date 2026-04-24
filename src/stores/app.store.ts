import { AuthState, OfflineQueueItem, SecurityState, SettingsState } from "@/types/app";

export interface AppStoreState {
  hasCompletedOnboarding: boolean;
  auth: AuthState;
  security: SecurityState;
  settings: SettingsState;
  offlineQueue: OfflineQueueItem[];
}

export const appStoreInitialState: AppStoreState = {
  hasCompletedOnboarding: true,
  auth: {
    email: "",
    hasAccount: false,
    isAuthenticated: false,
    passwordHint: "Use at least 8 characters",
    status: "signed_out",
  },
  security: {
    faceEnrollmentStatus: "not_started",
  },
  settings: {
    notificationsEnabled: true,
    preferredCurrency: "NGN",
  },
  offlineQueue: [],
};
