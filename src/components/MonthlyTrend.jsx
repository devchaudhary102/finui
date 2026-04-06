import { useFinanceStore } from '../store/financeStore';
import { getAllMonthsTrend, formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Monthly Trend Component
 * Shows income, expenses, and balance trends across all months
 */
const MonthlyTrend = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const isDarkMode = useFinanceStore(state => state.isDarkMode);

  const monthlyData = getAllMonthsTrend(transactions);

  if (monthlyData.length === 0) {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} border rounded-xl p-6 text-center text-gray-500 dark:text-gray-400`}>
        No monthly data available
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} border rounded-xl p-6 shadow-soft`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Monthly Trend</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Month</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">Income</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400">Expenses</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">Balance</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-purple-600 dark:text-purple-400">Savings Rate</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((month, index) => {
              const incomeChange = index > 0 ? ((month.income - monthlyData[index - 1].income) / (monthlyData[index - 1].income || 1)) * 100 : 0;
              const expenseChange = index > 0 ? ((month.expenses - monthlyData[index - 1].expenses) / (monthlyData[index - 1].expenses || 1)) * 100 : 0;

              return (
                <motion.tr
                  key={month.month}
                  className={`border-b ${isDarkMode ? 'border-slate-700 hover:bg-slate-700/30' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: isDarkMode ? 'rgba(51, 65, 85, 0.3)' : 'rgba(249, 250, 251, 1)' }}
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {month.monthName}
                  </td>

                  {/* Income */}
                  <td className="px-4 py-4 text-sm text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(month.income)}
                      </span>
                      {index > 0 && incomeChange !== 0 && (
                        <motion.div
                          className={`flex items-center gap-0.5 text-xs px-2 py-1 rounded ${
                            incomeChange > 0
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          }`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {incomeChange > 0 ? (
                            <ArrowUpRight size={12} />
                          ) : (
                            <ArrowDownLeft size={12} />
                          )}
                          {Math.abs(incomeChange).toFixed(1)}%
                        </motion.div>
                      )}
                    </div>
                  </td>

                  {/* Expenses */}
                  <td className="px-4 py-4 text-sm text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {formatCurrency(month.expenses)}
                      </span>
                      {index > 0 && expenseChange !== 0 && (
                        <motion.div
                          className={`flex items-center gap-0.5 text-xs px-2 py-1 rounded ${
                            expenseChange > 0
                              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          }`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {expenseChange > 0 ? (
                            <ArrowUpRight size={12} />
                          ) : (
                            <ArrowDownLeft size={12} />
                          )}
                          {Math.abs(expenseChange).toFixed(1)}%
                        </motion.div>
                      )}
                    </div>
                  </td>

                  {/* Balance */}
                  <td className="px-4 py-4 text-sm text-right">
                    <span
                      className={`font-bold ${
                        month.balance > 0
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {formatCurrency(month.balance)}
                    </span>
                  </td>

                  {/* Savings Rate */}
                  <td className="px-4 py-4 text-sm text-right">
                    <motion.div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold ${
                        month.savingRate > 0
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                      }`}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {month.savingRate > 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {month.savingRate}%
                    </motion.div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
        {monthlyData.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Monthly Income</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {formatCurrency(monthlyData.reduce((sum, m) => sum + m.income, 0) / monthlyData.length)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Monthly Expenses</p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                {formatCurrency(monthlyData.reduce((sum, m) => sum + m.expenses, 0) / monthlyData.length)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Savings Rate</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {(monthlyData.reduce((sum, m) => sum + parseFloat(m.savingRate), 0) / monthlyData.length).toFixed(1)}%
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default MonthlyTrend;
