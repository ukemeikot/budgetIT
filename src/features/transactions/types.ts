import { Transaction } from "@/types/finance";

export interface TransactionGroup {
  title: string;
  data: Transaction[];
}
