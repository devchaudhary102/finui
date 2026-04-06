import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getDailyTrend, getCategorySpending } from '../utils/helpers';
import { categoryColors } from '../data/mockData';
import { useFinanceStore } from '../store/financeStore';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-elevated">
        <p className="text-sm font-medium text-gray-900">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

/**
 * Balance Trend Chart (Line Chart - Last 30 days)
 */
export const BalanceTrendChart = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const data = getDailyTrend(transactions, 30);

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Balance Trend (30 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Spending by Category Chart (Pie Chart)
 */
export const SpendingByCategoryChart = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const data = getCategorySpending(transactions);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Spending by Category</h2>
        <div className="h-80 flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || '#3b82f6'} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Income vs Expenses Chart (Monthly comparison)
 */
export const IncomeExpensesChart = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const data = getDailyTrend(transactions, 30);

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Income vs Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
