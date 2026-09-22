import { createContext, useContext, useState, type ReactNode } from "react";
import type { TransactionCardData } from "../components/transactions/TransactionCard";
import {
  getTransactions,
  addTransaction as addTransactionToStorage,
  getBalance,
  adjustBalance,
} from "../utilities/transactionStorage";

interface TransactionsContextValue {
  transactions: TransactionCardData[];
  balance: number;
  isLoading: boolean;
  addTransaction: (
    transaction: TransactionCardData,
    balanceDelta: number,
  ) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(
  null,
);

interface TransactionsProviderProps {
  children: ReactNode;
  isLoading: boolean;
}

export function TransactionsProvider({
  children,
  isLoading,
}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionCardData[]>(() =>
    getTransactions(),
  );
  const [balance, setBalanceState] = useState<number>(() => getBalance());

  function addTransaction(
    transaction: TransactionCardData,
    balanceDelta: number,
  ) {
    setTransactions(addTransactionToStorage(transaction));
    setBalanceState(adjustBalance(balanceDelta));
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, balance, isLoading, addTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
}
