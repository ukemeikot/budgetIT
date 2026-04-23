import { CurrencyCode } from "@/types/finance";
import { formatCurrency } from "@/utils/currency";

export function useCurrencyFormatter(
  currency: CurrencyCode = "NGN",
  locale = "en-NG"
) {
  return (value: number) => formatCurrency(value, currency, locale);
}
