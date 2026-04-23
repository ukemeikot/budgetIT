import { TransactionCategory } from "@/types/finance";

export interface BudgetProgress {
  category: TransactionCategory;
  spent: number;
  limit: number;
}
