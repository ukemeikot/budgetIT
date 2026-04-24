import { useMemo } from "react";

import { useAppStateContext } from "@/providers/AppStateProvider";

export function useAppState() {
  const context = useAppStateContext();

  const categorySpend = useMemo(
    () =>
      context.financeState.categories.map((category) => ({
        ...category,
        spent: context.financeState.transactions
          .filter((entry) => entry.categoryId === category.id && entry.type === "expense")
          .reduce((sum, entry) => sum + entry.amount, 0),
        left: Math.max(
          0,
          category.budgetedAmount -
            context.financeState.transactions
              .filter((entry) => entry.categoryId === category.id && entry.type === "expense")
              .reduce((sum, entry) => sum + entry.amount, 0),
        ),
      })),
    [context.financeState.categories, context.financeState.transactions],
  );

  const allocationSpend = useMemo(
    () =>
      context.financeState.allocations.map((allocation) => ({
        ...allocation,
        spent: context.financeState.transactions
          .filter((entry) => entry.allocationId === allocation.id && entry.type === "expense")
          .reduce((sum, entry) => sum + entry.amount, 0),
      })),
    [context.financeState.allocations, context.financeState.transactions],
  );

  return {
    ...context,
    categorySpend,
    allocationSpend,
  };
}
