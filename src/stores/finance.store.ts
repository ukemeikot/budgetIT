import {
  Allocation,
  Category,
  CurrencyCode,
  ReceiptRecord,
  RecurringTransaction,
  Transaction,
} from "@/types/finance";

export interface FinanceStoreState {
  currency: CurrencyCode;
  transactions: Transaction[];
  categories: Category[];
  allocations: Allocation[];
  receipts: ReceiptRecord[];
  recurringTransactions: RecurringTransaction[];
}

export const financeStoreInitialState: FinanceStoreState = {
  currency: "NGN",
  transactions: [],
  categories: [],
  allocations: [],
  receipts: [],
  recurringTransactions: [],
};
