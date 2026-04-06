/**
 * Format currency to USD
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Calculate total balance from transactions
 */
export const calculateBalance = (transactions) => {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === 'income'
      ? balance + transaction.amount
      : balance - transaction.amount;
  }, 0);
};

/**
 * Calculate total income
 */
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total expenses
 */
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Group transactions by category
 */
export const groupByCategory = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = [];
    }
    acc[transaction.category].push(transaction);
    return acc;
  }, {});
};

/**
 * Get category spending summary (for pie chart)
 */
export const getCategorySpending = (transactions) => {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const existing = acc.find(item => item.name === transaction.category);
      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({
          name: transaction.category,
          amount: transaction.amount,
        });
      }
      return acc;
    }, []);

  return expensesByCategory.sort((a, b) => b.amount - a.amount);
};

/**
 * Get monthly trend data
 */
export const getMonthlyTrend = (transactions) => {
  const monthlyData = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        income: 0,
        expenses: 0,
        balance: 0,
      };
    }

    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });

  return Object.values(monthlyData)
    .map(data => ({
      ...data,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Get daily trend data (last 30 days)
 */
export const getDailyTrend = (transactions, days = 30) => {
  const dailyData = {};
  const today = new Date();

  // Initialize last 30 days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    dailyData[dateKey] = {
      date: formatDate(date),
      dateKey,
      income: 0,
      expenses: 0,
      balance: 0,
    };
  }

  // Populate data from transactions
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const dateKey = date.toISOString().split('T')[0];

    if (dailyData[dateKey]) {
      if (transaction.type === 'income') {
        dailyData[dateKey].income += transaction.amount;
      } else {
        dailyData[dateKey].expenses += transaction.amount;
      }
    }
  });

  return Object.values(dailyData)
    .map(data => ({
      ...data,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
};

/**
 * Get highest spending category
 */
export const getHighestSpendingCategory = (transactions) => {
  const categorySpending = getCategorySpending(transactions);
  return categorySpending[0] || null;
};

/**
 * Get monthly comparison data (current month vs previous month)
 */
export const getMonthlyComparison = (transactions) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonthKey = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`;

  const monthlyData = getMonthlyTrend(transactions);

  const current = monthlyData.find(m => m.month === currentMonthKey) || { expenses: 0, income: 0 };
  const previous = monthlyData.find(m => m.month === prevMonthKey) || { expenses: 0, income: 0 };

  return {
    currentMonth: {
      expenses: current.expenses,
      income: current.income,
      balance: current.income - current.expenses,
    },
    previousMonth: {
      expenses: previous.expenses,
      income: previous.income,
      balance: previous.income - previous.expenses,
    },
  };
};

/**
 * Get all months with data including previous months for trend analysis
 */
export const getAllMonthsTrend = (transactions) => {
  const monthlyMap = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const monthKey = `${year}-${month}`;
    
    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        month: monthKey,
        monthName: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date),
        income: 0,
        expenses: 0,
        transactions: 0,
      };
    }

    if (transaction.type === 'income') {
      monthlyMap[monthKey].income += transaction.amount;
    } else {
      monthlyMap[monthKey].expenses += transaction.amount;
    }
    monthlyMap[monthKey].transactions += 1;
  });

  return Object.values(monthlyMap)
    .map(data => ({
      ...data,
      balance: data.income - data.expenses,
      savingRate: data.income > 0 ? ((data.income - data.expenses) / data.income * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Get insights from transactions
 */
export const getInsights = (transactions) => {
  const insights = [];

  // Highest spending category
  const highestCategory = getHighestSpendingCategory(transactions);
  if (highestCategory) {
    insights.push({
      title: 'Top Spending Category',
      value: highestCategory.name,
      amount: highestCategory.value,
    });
  }

  // Monthly comparison
  const monthlyComparison = getMonthlyComparison(transactions);
  const currentExpenses = monthlyComparison.currentMonth.expenses;
  const prevExpenses = monthlyComparison.previousMonth.expenses;
  const expenseChange = ((currentExpenses - prevExpenses) / prevExpenses) * 100;

  if (!isNaN(expenseChange) && isFinite(expenseChange)) {
    insights.push({
      title: 'Monthly Spending Change',
      value: expenseChange > 0 ? `↑ ${expenseChange.toFixed(1)}%` : `↓ ${Math.abs(expenseChange).toFixed(1)}%`,
      isNegative: expenseChange > 0,
    });
  }

  // Total savings
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const totalSavings = totalIncome - totalExpenses;
  insights.push({
    title: 'Total Savings',
    amount: totalSavings,
  });

  return insights;
};

/**
 * Filter transactions
 */
export const filterTransactions = (transactions, filters) => {
  let filtered = [...transactions];

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type);
  }

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      t =>
        t.category.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

/**
 * Sort transactions
 */
export const sortTransactions = (transactions, sortBy = 'date', order = 'desc') => {
  const sorted = [...transactions];

  sorted.sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
};
