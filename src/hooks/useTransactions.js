import { useMemo } from 'react';
import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  filterTransactions,
  sortTransactions,
} from '../utils/helpers';
import { useFinanceStore } from '../store/financeStore';

/**
 * Hook to get filtered and sorted transactions
 */
export const useFilteredTransactions = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const filters = useFinanceStore(state => state.filters);
  const sortBy = useFinanceStore(state => state.sortBy);
  const sortOrder = useFinanceStore(state => state.sortOrder);

  return useMemo(() => {
    let result = filterTransactions(transactions, filters);
    result = sortTransactions(result, sortBy, sortOrder);
    return result;
  }, [transactions, filters, sortBy, sortOrder]);
};

/**
 * Hook to get financial summary
 */
export const useFinancialSummary = () => {
  const transactions = useFinanceStore(state => state.transactions);

  return useMemo(() => {
    return {
      balance: calculateBalance(transactions),
      totalIncome: calculateTotalIncome(transactions),
      totalExpenses: calculateTotalExpenses(transactions),
    };
  }, [transactions]);
};
