import { getInsights, formatCurrency } from '../utils/helpers';
import { useFinanceStore } from '../store/financeStore';
import { BarChart3, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Insights Component
 * Displays key financial insights
 */
const Insights = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const insights = getInsights(transactions);

  if (insights.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-6 text-center text-gray-500 dark:text-gray-400">
        No insights available yet
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Insights</h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            }
          }
        }}
      >
        {insights.map((insight, index) => (
          <InsightCard key={index} insight={insight} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Individual Insight Card
 */
const InsightCard = ({ insight, index }) => {
  let bgColor = 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
  let iconColor = 'text-blue-600 dark:text-blue-400';
  let Icon = BarChart3;

  if (insight.title === 'Top Spending Category') {
    bgColor = 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    iconColor = 'text-red-600 dark:text-red-400';
    Icon = TrendingUp;
  } else if (insight.title === 'Monthly Spending Change') {
    bgColor = insight.isNegative ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    iconColor = insight.isNegative ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
    Icon = insight.isNegative ? TrendingDown : TrendingUp;
  } else if (insight.title === 'Total Savings') {
    bgColor = insight.amount > 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    iconColor = insight.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400';
    Icon = PiggyBank;
  }

  return (
    <motion.div 
      className={`${bgColor} border rounded-lg p-4 transition-transform hover:scale-105`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-3">
        <motion.div 
          className={`p-2 rounded-lg ${bgColor.includes('blue') ? 'bg-blue-100 dark:bg-blue-900/40' : bgColor.includes('red') ? 'bg-red-100 dark:bg-red-900/40' : bgColor.includes('green') ? 'bg-green-100 dark:bg-green-900/40' : 'bg-orange-100 dark:bg-orange-900/40'}`}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Icon className={`${iconColor}`} size={24} />
        </motion.div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">{insight.title}</p>

      {insight.amount !== undefined && (
        <p className={`text-xl font-bold ${
          insight.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {formatCurrency(insight.amount)}
        </p>
      )}

      {insight.value && typeof insight.value === 'string' && (
        <p className={`text-xl font-bold ${iconColor}`}>
          {insight.value}
        </p>
      )}

      {insight.value && typeof insight.value === 'number' && (
        <p className="text-xl font-bold text-gray-900 dark:text-white">{insight.value}</p>
      )}
    </motion.div>
  );
};

export default Insights;
