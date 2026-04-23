export interface AppStoreState {
  hasCompletedOnboarding: boolean;
  isSecurityVerified: boolean;
}

export const appStoreInitialState: AppStoreState = {
  hasCompletedOnboarding: false,
  isSecurityVerified: false,
};
