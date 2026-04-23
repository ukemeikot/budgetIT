export type CurrencyCode = "NGN" | "USD" | "EUR" | "GBP";

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "food"
  | "transport"
  | "salary"
  | "rent"
  | "shopping"
  | "utilities"
  | "health"
  | "other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  note?: string;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface RecurringTransaction extends Transaction {
  frequency: "daily" | "weekly" | "monthly";
  nextRunDate: string;
}
