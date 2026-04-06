import { create } from 'zustand';
import { mockTransactions } from '../data/mockData';

/**
 * Finance store using Zustand
 * Manages transactions, filters, role, and theme
 */
export const useFinanceStore = create((set, get) => {
  // Try to load transactions from localStorage
  const savedTransactions = localStorage.getItem('financeTransactions');
  const initialTransactions = savedTransactions
    ? JSON.parse(savedTransactions)
    : mockTransactions;

  return {
    // State
    transactions: initialTransactions,
    filters: {
      type: 'all',
      category: 'all',
      search: '',
    },
    role: localStorage.getItem('userRole') || 'admin',
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    sortBy: 'date',
    sortOrder: 'desc',

    // Actions
    addTransaction: (transaction) =>
      set((state) => {
        const newTransactions = [
          ...state.transactions,
          {
            ...transaction,
            id: Math.max(...state.transactions.map(t => t.id), 0) + 1,
          },
        ];
        localStorage.setItem('financeTransactions', JSON.stringify(newTransactions));
        return { transactions: newTransactions };
      }),

    updateTransaction: (id, updatedData) =>
      set((state) => {
        const newTransactions = state.transactions.map(t =>
          t.id === id ? { ...t, ...updatedData } : t
        );
        localStorage.setItem('financeTransactions', JSON.stringify(newTransactions));
        return { transactions: newTransactions };
      }),

    deleteTransaction: (id) =>
      set((state) => {
        const newTransactions = state.transactions.filter(t => t.id !== id);
        localStorage.setItem('financeTransactions', JSON.stringify(newTransactions));
        return { transactions: newTransactions };
      }),

    setFilters: (newFilters) =>
      set((state) => ({
        filters: { ...state.filters, ...newFilters },
      })),

    setRole: (role) => {
      localStorage.setItem('userRole', role);
      set({ role });
    },

    toggleDarkMode: () =>
      set((state) => {
        const newDarkMode = !state.isDarkMode;
        localStorage.setItem('darkMode', String(newDarkMode));
        return { isDarkMode: newDarkMode };
      }),

    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),

    resetFilters: () =>
      set({
        filters: {
          type: 'all',
          category: 'all',
          search: '',
        },
      }),

    clearAllTransactions: () => {
      localStorage.removeItem('financeTransactions');
      set({ transactions: [] });
    },

    resetToMockData: () => {
      localStorage.setItem('financeTransactions', JSON.stringify(mockTransactions));
      set({ transactions: mockTransactions });
    },
  };
});
