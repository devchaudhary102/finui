// Generate more realistic varied data for the last 6 months
const generateTransactionsData = () => {
  const transactions = [];
  let id = 1;
  const today = new Date();
  
  // Categories with their typical min/max amounts for expenses
  const categoryRanges = {
    'Salary': { min: 4500, max: 5500, type: 'income' },
    'Freelance': { min: 800, max: 2500, type: 'income' },
    'Bonus': { min: 2000, max: 5000, type: 'income' },
    'Rent': { min: 1200, max: 1200, type: 'expense' }, // Fixed rent
    'Bills': { min: 150, max: 350, type: 'expense' },
    'Groceries': { min: 150, max: 350, type: 'expense' },
    'Food': { min: 80, max: 250, type: 'expense' },
    'Travel': { min: 100, max: 400, type: 'expense' },
    'Entertainment': { min: 50, max: 200, type: 'expense' },
    'Shopping': { min: 100, max: 500, type: 'expense' },
    'Healthcare': { min: 100, max: 300, type: 'expense' },
    'Education': { min: 200, max: 800, type: 'expense' },
    'Utilities': { min: 80, max: 200, type: 'expense' },
  };

  const expenseCategories = ['Rent', 'Bills', 'Groceries', 'Food', 'Travel', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Utilities'];
  const incomeCategories = ['Salary', 'Freelance'];
  
  // Generate for last 180 days with realistic patterns
  for (let daysAgo = 180; daysAgo >= 0; daysAgo--) {
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    
    // Salary around 5th and 20th of month
    if ((dayOfMonth === 5 || dayOfMonth === 20) && Math.random() > 0.3) {
      const category = 'Salary';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'income',
        description: 'Monthly salary'
      });
      id++;
    }
    
    // Freelance income randomly (1-2 times per month)
    if (Math.random() > 0.95) {
      const category = 'Freelance';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'income',
        description: 'Freelance work'
      });
      id++;
    }
    
    // Regular weekly expenses (groceries, food on weekends)
    if (dayOfWeek === 6 || dayOfWeek === 0) { // Weekend
      if (Math.random() > 0.3) {
        const category = Math.random() > 0.5 ? 'Groceries' : 'Food';
        const range = categoryRanges[category];
        const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
        transactions.push({
          id,
          date: new Date(date),
          amount,
          category,
          type: 'expense',
          description: category === 'Groceries' ? 'Weekly grocery shopping' : 'Dining out'
        });
        id++;
      }
    }
    
    // Food expenses on weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Weekdays
      if (Math.random() > 0.7) {
        const category = 'Food';
        const range = categoryRanges[category];
        const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
        transactions.push({
          id,
          date: new Date(date),
          amount,
          category,
          type: 'expense',
          description: 'Lunch or coffee'
        });
        id++;
      }
    }
    
    // Transport/Travel (workdays)
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && Math.random() > 0.8) {
      const category = 'Travel';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'expense',
        description: 'Commute or travel'
      });
      id++;
    }
    
    // Rent on 1st of month
    if (dayOfMonth === 1) {
      const category = 'Rent';
      const range = categoryRanges[category];
      const amount = range.min;
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'expense',
        description: 'Monthly rent'
      });
      id++;
    }
    
    // Bills mid-month
    if (dayOfMonth === 15 && Math.random() > 0.2) {
      const category = 'Bills';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'expense',
        description: 'Utilities and bills'
      });
      id++;
    }
    
    // Entertainment (occasional)
    if (Math.random() > 0.92) {
      const category = 'Entertainment';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'expense',
        description: 'Entertainment'
      });
      id++;
    }
    
    // Shopping (occasional)
    if (Math.random() > 0.93) {
      const category = 'Shopping';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'expense',
        description: 'Shopping'
      });
      id++;
    }
    
    // Healthcare (rare)
    if (Math.random() > 0.97) {
      const category = 'Healthcare';
      const range = categoryRanges[category];
      const amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
      transactions.push({
        id,
        date: new Date(date),
        amount,
        category,
        type: 'expense',
        description: 'Healthcare'
      });
      id++;
    }
  }
  
  return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const generateDescription = (category) => {
  const descriptions = {
    'Salary': ['Monthly salary', 'Paycheck', 'Regular income'],
    'Freelance': ['Project payment', 'Consulting work', 'Freelance income', 'Contract work'],
    'Bonus': ['Performance bonus', 'Annual bonus', 'Year-end bonus'],
    'Rent': ['Apartment rent', 'House rent', 'Monthly rent'],
    'Bills': ['Electricity bill', 'Internet bill', 'Phone bill', 'Utility bills'],
    'Groceries': ['Grocery shopping', 'Weekly groceries', 'Food shopping'],
    'Food': ['Restaurant meal', 'Lunch out', 'Dinner', 'Cafe', 'Fast food'],
    'Travel': ['Uber ride', 'Gas', 'Parking', 'Public transport', 'Taxi'],
    'Entertainment': ['Movie tickets', 'Gaming subscription', 'Concert', 'Streaming service'],
    'Shopping': ['Clothing', 'Online shopping', 'Electronics', 'Accessories'],
    'Healthcare': ['Doctor visit', 'Medicine', 'Dental care', 'Pharmacy'],
    'Education': ['Course fee', 'Books', 'Training', 'Online course'],
    'Utilities': ['Water bill', 'Gas bill', 'Electric bill'],
  };
  
  const categoryDescriptions = descriptions[category] || ['Transaction'];
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
};

export const mockTransactions = generateTransactionsData();

export const categories = [
  'Salary',
  'Freelance',
  'Rent',
  'Bills',
  'Groceries',
  'Food',
  'Travel',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Insurance',
  'Education',
  'Utilities',
];

export const categoryColors = {
  'Salary': '#10b981',
  'Freelance': '#3b82f6',
  'Rent': '#ef4444',
  'Bills': '#f59e0b',
  'Groceries': '#8b5cf6',
  'Food': '#ec4899',
  'Travel': '#06b6d4',
  'Entertainment': '#f97316',
  'Shopping': '#14b8a6',
  'Healthcare': '#84cc16',
  'Insurance': '#a855f7',
  'Education': '#0ea5e9',
  'Utilities': '#6366f1',
};
