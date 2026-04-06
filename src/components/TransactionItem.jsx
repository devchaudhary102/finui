import { formatCurrency, formatDate } from '../utils/helpers';
import { categoryColors } from '../data/mockData';
import { useState } from 'react';
import { useFinanceStore } from '../store/financeStore';
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Compact Transaction Item with Expand/Collapse
 */
export const TransactionItem = ({ transaction, onDelete, onEdit }) => {
  const categoryColor = categoryColors[transaction.category] || '#3b82f6';
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Compact View */}
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group"
        whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Category Indicator */}
          <motion.div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: categoryColor }}
            title={transaction.category}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Compact Details */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{transaction.category}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</p>
          </div>

          {/* Amount - Aligned Right */}
          <motion.p
            className={`font-bold text-base whitespace-nowrap ml-2 ${
              transaction.type === 'income'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </motion.p>

          {/* Expand Icon */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="ml-3 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="border-t border-gray-200 dark:border-slate-700 px-4 py-4 bg-gray-50 dark:bg-slate-700/30 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Description</p>
              <p className="text-sm text-gray-900 dark:text-white mt-1">{transaction.description}</p>
            </motion.div>

            {/* Type */}
            <motion.div 
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Type</p>
                <p className={`text-sm font-semibold mt-1 ${
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'income' ? 'Income' : 'Expense'}
                </p>
              </div>

              {/* Amount */}
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Amount</p>
                <p className={`text-sm font-bold mt-1 ${
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Date</p>
              <p className="text-sm text-gray-900 dark:text-white mt-1">{formatDate(transaction.date)}</p>
            </motion.div>

            {/* Actions */}
            <motion.div 
              className="flex gap-2 pt-2 border-t border-gray-200 dark:border-slate-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.button
                onClick={() => onEdit(transaction)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-sm font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit2 size={16} />
                Edit
              </motion.button>
              <motion.button
                onClick={() => onDelete(transaction.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-sm font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
                Delete
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Transaction Item Card (Card View)
 */
export const TransactionItemCard = ({ transaction, onDelete, onEdit }) => {
  const categoryColor = categoryColors[transaction.category] || '#3b82f6';

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: categoryColor }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white">{transaction.category}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{transaction.description}</p>
          </div>
        </div>
      </div>

      {/* Amount and Date Row */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
        <p className={`font-bold text-lg ${
          transaction.type === 'income'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {transaction.type === 'income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
            transaction.type === 'income'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            {transaction.type === 'income' ? 'Income' : 'Expense'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatDate(transaction.date)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(transaction)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-sm font-semibold transition-colors"
        >
          <Edit2 size={16} />
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-sm font-semibold transition-colors"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};
