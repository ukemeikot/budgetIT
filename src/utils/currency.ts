import { CurrencyCode } from "@/types/finance";

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "NGN",
  locale = "en-NG"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
