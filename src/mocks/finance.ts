export const portfolioSummary = {
  balance: "$42,950.40",
  growth: "+12.5%",
  subtitle: "Market valuation as of today",
};

export const allocationCards = [
  { title: "Transport", amount: "$320", status: "BUDGET", tone: "neutral" },
  { title: "Dining Out", amount: "$485", status: "BUDGET", tone: "danger" },
  { title: "Groceries", amount: "$250", status: "SAVINGS", tone: "neutral" },
];

export const recentLedger = [
  { title: "Apple Store", subtitle: "Technology | 3:34 PM", amount: "-$1,299.00", tone: "danger" },
  { title: "Dividend Payout", subtitle: "Investment | 11:24 AM", amount: "+$450.25", tone: "success" },
  { title: "The Gilded Fork", subtitle: "Dining Out | 10:09 PM", amount: "-$240.50", tone: "danger" },
  { title: "Netflix Subscription", subtitle: "Entertainment | 9:15 PM", amount: "-$15.99", tone: "danger" },
  { title: "Gym Membership", subtitle: "Health | 7:45 AM", amount: "-$49.99", tone: "danger" },
  { title: "Office Supplies", subtitle: "Shopping | 3:42 PM", amount: "-$80.75", tone: "danger" },
  { title: "Freelance Project", subtitle: "Income | 9:00 AM", amount: "+$1,200.00", tone: "success" },
  { title: "Electricity Bill", subtitle: "Utilities | 8:40 AM", amount: "-$120.45", tone: "danger" },
  { title: "Spotify Premium", subtitle: "Subscriptions | 6:12 PM", amount: "-$9.99", tone: "danger" },
  { title: "Market Investment", subtitle: "Assets | 12:10 PM", amount: "+$650.00", tone: "success" },
] as const;

export const savingsBuckets = [
  { label: "Investments", progress: 0.65, value: "65%" },
  { label: "Cash Savings", progress: 0.25, value: "25%" },
  { label: "Crypto Wallet", progress: 0.1, value: "10%" },
] as const;

export const budgetOverview = [
  { title: "Groceries", spent: "$842.00", limit: "$1,200.00", progress: 0.7, status: "Usually" },
  { title: "Dining Out", spent: "$650.00", limit: "$500.00", progress: 1, status: "Over Limit" },
  { title: "Housing", spent: "$2,400.00", limit: "$3,200.00", progress: 0.75, status: "On Track" },
  { title: "Transport", spent: "$215.50", limit: "$300.00", progress: 0.72, status: "Near Limit" },
  { title: "Dining Set", spent: "$720.00", limit: "$800.00", progress: 0.9, status: "Budget" },
] as const;

export const budgetAllocations = [
  { title: "Utilities", amount: "$150", progress: 0.94, state: "OVER LIMIT" },
  { title: "Entertainment", amount: "$200", progress: 0.42, state: "BALANCED" },
  { title: "Groceries", amount: "$250", progress: 0.66, state: "BALANCED" },
  { title: "Transportation", amount: "$100", progress: 1, state: "OVER LIMIT" },
  { title: "Subscriptions", amount: "$120", progress: 0.22, state: "LIGHT" },
  { title: "Dining", amount: "$180", progress: 0.55, state: "BALANCED" },
] as const;

export const budgetDetailCards = [
  { title: "Housing", amount: "$2,450", note: "/ $3,200", progress: 0.82, flag: "ON TRACK" },
  { title: "Dining Out", amount: "$420", note: "/ $600", progress: 0.7, flag: "BALANCED" },
  { title: "Groceries", amount: "$80", note: "/ $120", progress: 0.67, flag: "WEEKLY TRACK" },
  { title: "Transport", amount: "$215", note: "/ $340", progress: 0.63, flag: "BALANCED" },
] as const;

export const transactionCategories = [
  "Food",
  "Transport",
  "Luxury",
  "Trip",
  "Other",
  "Home",
] as const;
