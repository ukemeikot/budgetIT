import {
  Budget,
  CurrencyCode,
  RecurringTransaction,
  Transaction,
} from "@/types/finance";

export interface FinanceStoreState {
  currency: CurrencyCode;
  transactions: Transaction[];
  budgets: Budget[];
  recurringTransactions: RecurringTransaction[];
}

export const financeStoreInitialState: FinanceStoreState = {
  currency: "NGN",
  transactions: [],
  budgets: [],
  recurringTransactions: [],
};
