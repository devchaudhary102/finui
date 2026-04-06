import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getDailyTrend, getCategorySpending, formatCurrency } from '../utils/helpers';
import { categoryColors } from '../data/mockData';
import { useFinanceStore } from '../store/financeStore';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Enhanced Balance & Income/Expense Trend Chart with Time Range Filters
 */
export const AdvancedTrendChart = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const isDarkMode = useFinanceStore(state => state.isDarkMode);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'custom'
  const [customDays, setCustomDays] = useState(30);
  const [showIncomeExpense, setShowIncomeExpense] = useState(false);

  const filteredTransactions = useMemo(() => {
    const today = new Date();
    let startDate;

    switch (timeRange) {
      case 'week':
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        startDate = new Date(today.getTime() - customDays * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return transactions.filter(t => new Date(t.date) >= startDate);
  }, [transactions, timeRange, customDays]);

  const chartData = useMemo(() => {
    const today = new Date();
    let days;

    switch (timeRange) {
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'custom':
        days = customDays;
        break;
      default:
        days = 30;
    }

    // Create array for all dates
    const dateArray = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dateArray.push(date);
    }

    // Calculate starting balance by looking at all transactions before the date range
    let startingBalance = 5000;
    const firstDate = dateArray[0];
    
    transactions.forEach(transaction => {
      if (new Date(transaction.date) < firstDate) {
        if (transaction.type === 'income') {
          startingBalance += transaction.amount;
        } else {
          startingBalance -= transaction.amount;
        }
      }
    });

    // Build chart data
    const data = [];
    let runningBalance = startingBalance;

    dateArray.forEach(date => {
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Get all transactions for this specific day
      let dayIncome = 0;
      let dayExpense = 0;

      transactions.forEach(transaction => {
        const transDate = new Date(transaction.date);
        if (
          transDate.getFullYear() === date.getFullYear() &&
          transDate.getMonth() === date.getMonth() &&
          transDate.getDate() === date.getDate()
        ) {
          if (transaction.type === 'income') {
            dayIncome += transaction.amount;
          } else {
            dayExpense += transaction.amount;
          }
        }
      });

      // Update running balance
      runningBalance += dayIncome - dayExpense;

      data.push({
        date: dateStr,
        balance: Math.max(runningBalance, 0),
        income: dayIncome,
        expense: dayExpense,
      });
    });

    return data;
  }, [transactions, timeRange, customDays]);

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-soft p-6`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Financial Trends {showIncomeExpense && '(Income vs Expense)'}
        </h2>

        <div className="flex flex-wrap gap-2">
          {/* Time Range Buttons */}
          <motion.div className="flex gap-1 p-1 rounded-lg backdrop-blur-sm bg-opacity-50" layout>
            {['week', 'month'].map(range => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-all ${
                  timeRange === range
                    ? isDarkMode
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range === 'week' ? '7D' : '30D'}
              </motion.button>
            ))}

            {/* Custom Range Dropdown */}
            <motion.div className="relative" layout>
              <motion.button
                onClick={() => setTimeRange(timeRange === 'custom' ? 'month' : 'custom')}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-all flex items-center gap-1 ${
                  timeRange === 'custom'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={14} />
                Custom
              </motion.button>

              {timeRange === 'custom' && (
                <motion.div
                  className={`absolute top-10 right-0 mt-1 z-20 p-3 rounded-lg shadow-lg backdrop-blur-sm ${
                    isDarkMode ? 'bg-slate-700' : 'bg-white border border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={customDays}
                    onChange={(e) => setCustomDays(Math.max(1, Math.min(365, parseInt(e.target.value) || 30)))}
                    className={`w-20 px-2 py-1 rounded border text-sm ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-600 text-white'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>days</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Toggle Income/Expense View */}
          <motion.button
            onClick={() => setShowIncomeExpense(!showIncomeExpense)}
            className={`px-3 py-1.5 rounded text-sm font-semibold transition-all ${
              showIncomeExpense
                ? isDarkMode
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-purple-600 text-white shadow-lg'
                : isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showIncomeExpense ? 'Show Balance' : 'Show Income/Expense'}
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={350}>
          {showIncomeExpense ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#475569' : '#e5e7eb'} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#475569' : '#e5e7eb'} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Balance"
                isAnimationActive={true}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {(() => {
          const totalIncome = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
          const totalExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
          const netSavings = totalIncome - totalExpense;

          return (
            <>
              <motion.div
                className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}
                whileHover={{ scale: 1.05 }}
              >
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'} uppercase`}>
                  Income
                </p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {formatCurrency(totalIncome)}
                </p>
              </motion.div>

              <motion.div
                className={`p-3 rounded-lg ${isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}
                whileHover={{ scale: 1.05 }}
              >
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'} uppercase`}>
                  Expense
                </p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {formatCurrency(totalExpense)}
                </p>
              </motion.div>

              <motion.div
                className={`p-3 rounded-lg ${
                  netSavings >= 0
                    ? isDarkMode
                      ? 'bg-blue-900/20 border border-blue-800'
                      : 'bg-blue-50 border border-blue-200'
                    : isDarkMode
                    ? 'bg-orange-900/20 border border-orange-800'
                    : 'bg-orange-50 border border-orange-200'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <p
                  className={`text-xs font-semibold uppercase ${
                    netSavings >= 0
                      ? isDarkMode
                        ? 'text-blue-400'
                        : 'text-blue-600'
                      : isDarkMode
                      ? 'text-orange-400'
                      : 'text-orange-600'
                  }`}
                >
                  Net Savings
                </p>
                <p
                  className={`text-lg font-bold ${
                    netSavings >= 0
                      ? isDarkMode
                        ? 'text-blue-400'
                        : 'text-blue-600'
                      : isDarkMode
                      ? 'text-orange-400'
                      : 'text-orange-600'
                  }`}
                >
                  {formatCurrency(netSavings)}
                </p>
              </motion.div>
            </>
          );
        })()}
      </motion.div>
    </div>
  );
};

/**
 * Spending by Category Chart (Pie Chart)
 */
export const SpendingByCategoryChart = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const isDarkMode = useFinanceStore(state => state.isDarkMode);
  const data = getCategorySpending(transactions);

  if (data.length === 0) {
    return (
      <motion.div
        className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-soft p-6`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Spending by Category
        </h2>
        <div className="h-80 flex items-center justify-center">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
            No expense data available
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-soft p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={true}
            label={({ name, amount, percent }) => `${name} ${formatCurrency(amount)}`}
            outerRadius={120}
            innerRadius={0}
            fill="#8884d8"
            dataKey="amount"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={categoryColors[entry.name] || '#3b82f6'}
                stroke={isDarkMode ? '#1e293b' : '#ffffff'}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid #475569' : '1px solid #e5e7eb',
              borderRadius: '8px',
              color: isDarkMode ? '#e2e8f0' : '#000000',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
            cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Category Breakdown List */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50 border border-slate-600' : 'bg-gray-50 border border-gray-200'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[item.name] || '#3b82f6' }}
              />
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.name}
              </p>
            </div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatCurrency(item.amount)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
