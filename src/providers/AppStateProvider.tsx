import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

import { getStoredJson, setStoredJson, storageKeys } from "@/services/storage";
import { appStoreInitialState, AppStoreState } from "@/stores/app.store";
import { financeStoreInitialState, FinanceStoreState } from "@/stores/finance.store";
import { Allocation, Category, LedgerEntry, ReceiptRecord } from "@/types/finance";

type CreateCategoryPayload = {
  budgetedAmount: number;
  color: string;
  icon: string;
  name: string;
  note?: string;
};

type CreateAllocationPayload = {
  budgetedAmount: number;
  categoryId: string;
  icon: string;
  name: string;
  notificationsEnabled: boolean;
  recurring: Allocation["recurring"];
  spendLimit?: number;
};

type CreateLedgerEntryPayload = Omit<LedgerEntry, "createdAt" | "id">;
type CreateReceiptPayload = Omit<ReceiptRecord, "createdAt" | "id">;

type AppStateContextValue = {
  appState: AppStoreState;
  financeState: FinanceStoreState;
  hydrated: boolean;
  completeOnboarding: () => void;
  createAccount: (email: string) => void;
  signIn: (email: string) => void;
  verifyEmail: () => void;
  completeFaceVerification: () => void;
  signOut: () => void;
  changePassword: () => void;
  addCategory: (payload: CreateCategoryPayload) => string;
  addAllocation: (payload: CreateAllocationPayload) => string;
  addLedgerEntry: (payload: CreateLedgerEntryPayload) => string;
  addReceiptDraft: (payload: CreateReceiptPayload) => string;
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

const createTimestamp = () => new Date().toISOString();
const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const starterIds = new Set([
  "cat-mobility",
  "cat-food",
  "alloc-travel",
  "alloc-vehicle",
  "alloc-groceries",
  "ledger-flight",
  "ledger-fuel",
  "ledger-market",
  "receipt-fuel",
  "receipt-market",
]);

function stripDemoData(state: FinanceStoreState): FinanceStoreState {
  return {
    ...state,
    categories: state.categories.filter((item) => !starterIds.has(item.id)),
    allocations: state.allocations.filter((item) => !starterIds.has(item.id)),
    transactions: state.transactions.filter((item) => !starterIds.has(item.id)),
    receipts: state.receipts.filter((item) => !starterIds.has(item.id)),
  };
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);
  const [appState, setAppState] = useState<AppStoreState>(appStoreInitialState);
  const [financeState, setFinanceState] = useState<FinanceStoreState>(financeStoreInitialState);

  useEffect(() => {
    async function hydrate() {
      const [storedAppState, storedFinanceState] = await Promise.all([
        getStoredJson(storageKeys.appState, appStoreInitialState),
        getStoredJson(storageKeys.financeState, financeStoreInitialState),
      ]);

      setAppState(storedAppState);
      setFinanceState(stripDemoData(storedFinanceState));
      setHydrated(true);
    }

    hydrate();
  }, []);

  useEffect(() => {
    if (hydrated) {
      void setStoredJson(storageKeys.appState, appState);
    }
  }, [appState, hydrated]);

  useEffect(() => {
    if (hydrated) {
      void setStoredJson(storageKeys.financeState, financeState);
    }
  }, [financeState, hydrated]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      appState,
      financeState,
      hydrated,
      completeOnboarding: () =>
        setAppState((current) => ({
          ...current,
          hasCompletedOnboarding: true,
        })),
      createAccount: (email) =>
        setAppState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            email,
            hasAccount: true,
            isAuthenticated: false,
            status: "pending_email_verification",
          },
        })),
      signIn: (email) =>
        setAppState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            email,
            hasAccount: true,
            isAuthenticated: true,
            status: "signed_in",
          },
        })),
      verifyEmail: () =>
        setAppState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            isAuthenticated: true,
            status: "signed_in",
          },
        })),
      completeFaceVerification: () =>
        setAppState((current) => ({
          ...current,
          security: {
            faceEnrollmentStatus: "verified",
            lastVerifiedAt: createTimestamp(),
          },
        })),
      signOut: () =>
        setAppState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            isAuthenticated: false,
            status: "signed_out",
          },
        })),
      changePassword: () =>
        setAppState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            passwordHint: "Password updated successfully",
          },
        })),
      addCategory: ({ budgetedAmount, color, icon, name, note }) => {
        const id = createId("cat");
        const category: Category = {
          id,
          budgetedAmount,
          color,
          icon,
          name,
          note,
          createdAt: createTimestamp(),
        };

        setFinanceState((current) => ({
          ...current,
          categories: [category, ...current.categories],
        }));

        setAppState((current) => ({
          ...current,
          offlineQueue: [
            { id: createId("queue"), entity: "category", action: "create", createdAt: createTimestamp() },
            ...current.offlineQueue,
          ],
        }));

        return id;
      },
      addAllocation: (payload) => {
        const id = createId("alloc");

        setFinanceState((current) => ({
          ...current,
          allocations: [
            {
              ...payload,
              id,
              createdAt: createTimestamp(),
            },
            ...current.allocations,
          ],
        }));

        setAppState((current) => ({
          ...current,
          offlineQueue: [
            { id: createId("queue"), entity: "allocation", action: "create", createdAt: createTimestamp() },
            ...current.offlineQueue,
          ],
        }));

        return id;
      },
      addLedgerEntry: (payload) => {
        const id = createId("ledger");

        setFinanceState((current) => ({
          ...current,
          transactions: [
            {
              ...payload,
              id,
              createdAt: createTimestamp(),
            },
            ...current.transactions,
          ],
        }));

        setAppState((current) => ({
          ...current,
          offlineQueue: [
            { id: createId("queue"), entity: "ledger", action: "create", createdAt: createTimestamp() },
            ...current.offlineQueue,
          ],
        }));

        return id;
      },
      addReceiptDraft: (payload) => {
        const id = createId("receipt");

        setFinanceState((current) => ({
          ...current,
          receipts: [
            {
              ...payload,
              id,
              createdAt: createTimestamp(),
            },
            ...current.receipts,
          ],
        }));

        setAppState((current) => ({
          ...current,
          offlineQueue: [
            { id: createId("queue"), entity: "receipt", action: "create", createdAt: createTimestamp() },
            ...current.offlineQueue,
          ],
        }));

        return id;
      },
    }),
    [appState, financeState, hydrated],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppStateContext() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppStateContext must be used within AppStateProvider");
  }

  return context;
}
