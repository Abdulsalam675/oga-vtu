import type { TransactionCardData } from "../components/transactions/TransactionCard";

const TRANSACTIONS_KEY = "transactions";
const BALANCE_KEY = "walletBalance";
const DEFAULT_BALANCE = 10000;

export function getTransactions(): TransactionCardData[] {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as TransactionCardData[];
  } catch {
    return [];
  }
}

export function addTransaction(transaction: TransactionCardData) {
  const next = [transaction, ...getTransactions()];
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(next));
  return next;
}

export function getBalance(): number {
  const data = localStorage.getItem(BALANCE_KEY);
  if (!data) return DEFAULT_BALANCE;
  const parsed = Number(data);
  return Number.isNaN(parsed) ? DEFAULT_BALANCE : parsed;
}

export function adjustBalance(delta: number) {
  const next = getBalance() + delta;
  localStorage.setItem(BALANCE_KEY, String(next));
  return next;
}
