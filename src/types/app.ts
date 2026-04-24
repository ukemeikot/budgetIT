export type AuthStatus = "signed_out" | "pending_email_verification" | "signed_in";

export type VerificationStatus =
  | "not_started"
  | "pending"
  | "verified"
  | "failed";

export interface AuthState {
  email: string;
  hasAccount: boolean;
  isAuthenticated: boolean;
  passwordHint: string;
  status: AuthStatus;
}

export interface SecurityState {
  faceEnrollmentStatus: VerificationStatus;
  lastVerifiedAt?: string;
}

export interface SettingsState {
  notificationsEnabled: boolean;
  preferredCurrency: "NGN" | "USD" | "EUR" | "GBP";
}

export interface OfflineQueueItem {
  id: string;
  entity: "ledger" | "receipt" | "allocation" | "category";
  action: "create" | "update";
  createdAt: string;
}
