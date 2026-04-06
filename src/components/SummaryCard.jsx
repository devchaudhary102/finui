import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/helpers';

const SummaryCard = ({ title, amount, icon: Icon, color = 'blue', trend }) => {
  const colorClasses = {
    blue: 'border-blue-200 bg-white dark:bg-slate-800 dark:border-slate-700',
    green: 'border-green-200 bg-white dark:bg-slate-800 dark:border-slate-700',
    red: 'border-red-200 bg-white dark:bg-slate-800 dark:border-slate-700',
  };

  const iconBgClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };

  const trendColorClasses = {
    positive: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10',
    negative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10',
  };

  return (
    <motion.div 
      className={`${colorClasses[color]} border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, shadow: 'md' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">{title}</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{formatCurrency(amount)}</h3>
          {trend && (
            <motion.div 
              className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 ${trendColorClasses[trend > 0 ? 'positive' : 'negative']}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {trend > 0 ? (
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>↑</motion.span>
              ) : (
                <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.span>
              )}
              {Math.abs(trend)}% vs last month
            </motion.div>
          )}
        </div>
        <motion.div 
          className={`${iconBgClasses[color]} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
        >
          {Icon && <Icon size={24} strokeWidth={1.5} />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
