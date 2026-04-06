#!/usr/bin/env node

/**
 * FinUI Finance Dashboard - Quick Reference Guide
 * 
 * This file contains quick reference information about the project structure,
 * key components, and common development tasks.
 */

// =============================================================================
// QUICK START
// =============================================================================
/*
$ npm install       # Install dependencies
$ npm run dev       # Start development server (http://localhost:5173)
$ npm run build     # Build for production
$ npm run lint      # Run ESLint
*/

// =============================================================================
// PROJECT STRUCTURE
// =============================================================================
/*
FinUI/
├── src/
│   ├── components/           # React components
│   │   ├── Header.jsx        # Main navigation header
│   │   ├── SummaryCard.jsx   # Summary cards for dashboard
│   │   ├── Charts.jsx        # Recharts visualizations
│   │   ├── TransactionList.jsx
│   │   ├── TransactionItem.jsx
│   │   ├── TransactionFilters.jsx
│   │   ├── TransactionModal.jsx
│   │   ├── RoleSwitcher.jsx
│   │   └── Insights.jsx
│   ├── store/                # Zustand state management
│   │   └── financeStore.js
│   ├── hooks/                # Custom React hooks
│   │   └── useTransactions.js
│   ├── utils/                # Helper functions
│   │   └── helpers.js
│   ├── data/                 # Mock data
│   │   └── mockData.js
│   ├── App.jsx               # Main component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
*/

// =============================================================================
// KEY CONCEPTS
// =============================================================================

// 1. STATE MANAGEMENT (Zustand)
// ─────────────────────────────
// Location: src/store/financeStore.js
//
// Usage in components:
// const transactions = useFinanceStore(state => state.transactions);
// const addTransaction = useFinanceStore(state => state.addTransaction);
//
// State includes:
// - transactions: Array of transaction objects
// - filters: Search and category filters
// - role: 'admin' or 'viewer'
// - isDarkMode: Boolean for theme toggle
// - sortBy: 'date' or 'amount'
// - sortOrder: 'asc' or 'desc'

// 2. CUSTOM HOOKS
// ──────────────
// Location: src/hooks/useTransactions.js
//
// useFilteredTransactions()
//   Returns: Filtered and sorted transactions array
//   Memoized: Only recalculates when dependencies change
//
// useFinancialSummary()
//   Returns: { balance, totalIncome, totalExpenses }
//   Memoized: Efficient calculation of financial totals

// 3. HELPER FUNCTIONS
// ──────────────────
// Location: src/utils/helpers.js
//
// Calculations:
// - calculateBalance(transactions)
// - calculateTotalIncome(transactions)
// - calculateTotalExpenses(transactions)
// - getCategorySpending(transactions)
// - getMonthlyTrend(transactions)
// - getDailyTrend(transactions)
// - getInsights(transactions)
//
// Utilities:
// - formatCurrency(amount) → "$1,234.56"
// - formatDate(date) → "Jan 1, 2024"
// - filterTransactions(transactions, filters)
// - sortTransactions(transactions, sortBy, order)

// 4. DATA MODEL
// ────────────
// Transaction object:
// {
//   id: number,
//   date: Date,
//   amount: number,
//   category: string,
//   type: 'income' | 'expense',
//   description: string
// }
//
// Filter object:
// {
//   type: 'all' | 'income' | 'expense',
//   category: 'all' | category string,
//   search: string
// }

// =============================================================================
// COMPONENT PATTERNS
// =============================================================================

// Pattern 1: Using Store State
// ────────────────────────────
/*
const MyComponent = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const addTransaction = useFinanceStore(state => state.addTransaction);
  
  return <div>...</div>;
};
*/

// Pattern 2: Custom Hooks
// ──────────────────────
/*
const MyComponent = () => {
  const filteredTransactions = useFilteredTransactions();
  const { balance, totalIncome } = useFinancialSummary();
  
  return <div>...</div>;
};
*/

// Pattern 3: Role-Based Rendering
// ───────────────────────────────
/*
const MyComponent = () => {
  const role = useFinanceStore(state => state.role);
  
  return (
    <div>
      {role === 'admin' && <AdminFeatures />}
      {role === 'viewer' && <ViewerFeatures />}
    </div>
  );
};
*/

// Pattern 4: Conditional Modal
// ───────────────────────────
/*
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const role = useFinanceStore(state => state.role);
  
  return (
    <>
      {role === 'admin' && (
        <TransactionModal isOpen={showModal} onClose={...} />
      )}
    </>
  );
};
*/

// =============================================================================
// ADDING NEW FEATURES
// =============================================================================

// 1. Add a new transaction filter
// ────────────────────────────────
// a) Add filter field to financeStore.js:
//    filters: { ...existing, newFilter: 'value' }
//
// b) Update TransactionFilters.jsx to include new filter input
//
// c) Update helpers.js filterTransactions() function
//
// d) The app automatically updates!

// 2. Add a new chart
// ──────────────────
// a) Add calculation function to helpers.js
// b) Create new chart component in Charts.jsx (export it)
// c) Import and use in App.jsx

// 3. Add a new insight
// ────────────────────
// a) Update getInsights() in helpers.js to calculate new insight
// b) The Insights.jsx component will automatically display it

// 4. Add new transaction category
// ────────────────────────────────
// a) Update categories array in mockData.js
// b) Add color to categoryColors in mockData.js
// c) Available everywhere automatically!

// =============================================================================
// STYLING GUIDE
// =============================================================================

// Tailwind CSS Classes Used:
// - Spacing: p-4, m-2, gap-3, etc.
// - Colors: bg-blue-50, text-red-600, border-gray-300
// - Layouts: grid, flex, grid-cols-1, md:grid-cols-2
// - Effects: shadow-soft, shadow-elevated, rounded-lg
// - Responsive: hidden md:flex, md:grid-cols-2, lg:grid-cols-3
// - States: hover:bg-blue-50, focus:ring-2, group-hover:opacity-100

// Custom Tailwind Colors (from tailwind.config.js):
// - primary: #0f172a
// - secondary: #1e293b
// - accent: #3b82f6
// - success: #10b981
// - danger: #ef4444
// - warning: #f59e0b

// Custom Shadows:
// - shadow-soft: subtle shadow
// - shadow-elevated: prominent shadow

// =============================================================================
// DARK MODE
// ==========================================================================

// Dark mode is controlled by isDarkMode store value
// The <div> element has className={isDarkMode ? 'dark' : ''}
// Tailwind automatically handles dark mode with dark: prefix

// Example: dark:bg-slate-900 dark:text-white

// Toggling:
// const toggleDarkMode = useFinanceStore(state => state.toggleDarkMode);
// User preference persists in localStorage

// =============================================================================
// LOCAL STORAGE
// =============================================================================

// Keys used:
// - 'financeTransactions': Array of transaction objects (JSON)
// - 'userRole': 'admin' or 'viewer'
// - 'darkMode': 'true' or 'false'

// Auto-persisted via Zustand store actions
// No manual localStorage calls needed!

// =============================================================================
// PERFORMANCE TIPS
// =============================================================================

// 1. Keep components small and focused
// 2. Use custom hooks to avoid redundant calculations
// 3. Leverage useMemo in hooks (already done!)
// 4. Split large components into smaller ones
// 5. Don't create new objects in renders
// 6. Use Zustand selectors to prevent unnecessary re-renders

// Good:
// const role = useFinanceStore(state => state.role); // Only re-renders when role changes

// Bad:
// const store = useFinanceStore(); // Re-renders on ANY store change

// =============================================================================
// DEBUGGING TIPS
// =============================================================================

// 1. Check store state:
//    In browser console:
//    import { useFinanceStore } from './store/financeStore';
//    useFinanceStore.getState()

// 2. Check filtered transactions:
//    useFinanceStore.getState().transactions.filter(...)

// 3. Use React DevTools browser extension
//    Inspect components and props

// 4. Use Zustand DevTools:
//    npm install zustand/middleware --save-dev
//    Then add to store

// 5. Console logs in helpers.js:
//    console.log('Filtered:', filterTransactions(...))

// =============================================================================
// COMMON ISSUES & SOLUTIONS
// =============================================================================

// Issue: Transactions not updating
// Solution: Make sure you're using the store action, not direct mutation
//   const addTransaction = useFinanceStore(state => state.addTransaction);
//   addTransaction({...}) // Not direct mutation!

// Issue: Filters not working
// Solution: Check if filterTransactions() is called with correct filter object
//   { type: 'all', category: 'all', search: '' }

// Issue: Charts not displaying
// Solution: Verify data exists and component is exported/imported correctly
//   Check mockData has transactions
//   Export/import in Charts.jsx and App.jsx

// Issue: Dark mode not persisting
// Solution: Check localStorage is not disabled
//   localStorage.setItem('darkMode', 'true')

// Issue: Role permissions not working
// Solution: Verify role-based rendering logic
//   {role === 'admin' && <Button />}

// =============================================================================
// USEFUL NPM COMMANDS
// =============================================================================

/*
npm run dev              # Start dev server with HMR
npm run build            # Production build
npm run preview          # Preview production build locally
npm run lint             # Run ESLint
npm install [package]    # Add new dependency
npm uninstall [package]  # Remove dependency
npm update               # Update dependencies
*/

// =============================================================================
// USEFUL RESOURCES
// =============================================================================

/*
React Docs: https://react.dev
Tailwind CSS: https://tailwindcss.com
Zustand: https://zustand.docs.pmnd.rs
Recharts: https://recharts.org
Vite: https://vitejs.dev
*/

// =============================================================================
// FILE CHECKLIST FOR NEW DEVELOPER
// =============================================================================

/*
□ Read this file
□ Review src/data/mockData.js (understand data structure)
□ Review src/store/financeStore.js (understand state management)
□ Review src/utils/helpers.js (understand calculations)
□ Review src/components/App.jsx (understand layout)
□ Run npm run dev and explore the app
□ Try switching roles (admin/viewer)
□ Try adding/editing/deleting transactions
□ Try filtering and searching
□ Test dark mode toggle
□ Refresh page to verify persistence
*/

export {}; // Make this a valid module
