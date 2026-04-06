import { useState } from 'react';
import { TransactionItem, TransactionItemCard } from './TransactionItem';
import { useFilteredTransactions } from '../hooks/useTransactions';
import { useFinanceStore } from '../store/financeStore';
import { List, LayoutGrid } from 'lucide-react';

/**
 * Transaction List Component
 * Compact view with expand/collapse functionality
 */
const TransactionList = ({ onEdit, onDelete }) => {
  const filteredTransactions = useFilteredTransactions();
  const [viewMode, setViewMode] = useState('compact'); // 'compact' or 'card'
  const isDarkMode = useFinanceStore(state => state.isDarkMode);

  if (filteredTransactions.length === 0) {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg shadow-soft p-12 text-center`}>
        <div className="text-5xl mb-4">📭</div>
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No Transactions Found</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} max-w-md mx-auto`}>
          Try adjusting your filters or add a new transaction to get started.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with View Mode Switcher */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Transactions <span className={`text-sm font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({filteredTransactions.length})</span>
        </h2>
        <div className={`flex gap-1 rounded-lg p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <button
            onClick={() => setViewMode('compact')}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all ${
              viewMode === 'compact'
                ? `${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900'} shadow-sm`
                : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
            }`}
            title="Compact expandable view"
          >
            <List size={18} />
            <span className="hidden sm:inline">Compact</span>
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all ${
              viewMode === 'card'
                ? `${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900'} shadow-sm`
                : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
            }`}
            title="Card view"
          >
            <LayoutGrid size={18} />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      {/* Compact View - Collapsible/Expandable */}
      {viewMode === 'compact' && (
        <div className="space-y-2">
          {filteredTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="space-y-3">
          {filteredTransactions.map(transaction => (
            <TransactionItemCard
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
