export type CurrencyCode = "NGN" | "USD" | "EUR" | "GBP";

export type TransactionType = "income" | "expense";

export type CaptureSource = "manual" | "capture" | "upload";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budgetedAmount: number;
  note?: string;
  createdAt: string;
}

export interface Allocation {
  id: string;
  categoryId: string;
  name: string;
  icon: string;
  budgetedAmount: number;
  spendLimit?: number;
  recurring: "none" | "weekly" | "monthly";
  notificationsEnabled: boolean;
  createdAt: string;
}

export interface ReceiptRecord {
  id: string;
  allocationId?: string;
  ledgerEntryId?: string;
  source: CaptureSource;
  localUri?: string;
  fileName?: string;
  extractionStatus: "none" | "pending" | "complete";
  createdAt: string;
}

export interface LedgerEntry {
  id: string;
  title: string;
  allocationId?: string;
  categoryId?: string;
  amount: number;
  type: TransactionType;
  source: CaptureSource;
  merchant?: string;
  date: string;
  note?: string;
  receiptId?: string;
  createdAt: string;
}

export interface RecurringTransaction extends LedgerEntry {
  frequency: "daily" | "weekly" | "monthly";
  nextRunDate: string;
}

export type Transaction = LedgerEntry;
export type Budget = Allocation;
