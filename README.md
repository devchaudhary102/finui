# FinUI - Finance Dashboard

A modern, fully-functional finance dashboard built with React, Tailwind CSS, and Recharts. Track your income, expenses, and financial insights with a clean, intuitive interface.

## 🎯 Project Overview

FinUI is a frontend-only finance dashboard designed to help users visualize and manage their financial data. It demonstrates modern React best practices, component-based architecture, and excellent UX/UI design principles.

**Live Demo Available:** Start the dev server to see the dashboard in action!

## ✨ Features Implemented

### 1. **Dashboard Overview**
- **Summary Cards**: Display Total Balance, Total Income, and Total Expenses with dynamic updates
- **Visual Design**: Gradient backgrounds, icons, and subtle shadows for distinction
- **Currency Formatting**: All amounts properly formatted as USD currency

### 2. **Time-Based Visualizations**
- **Balance Trend Chart** (Line Chart): Shows balance over the last 30 days
- **Income vs Expenses Chart**: Dual-line chart comparing income and expenses trends
- **Smooth, Responsive Charts**: Built with Recharts for optimal performance
- **Interactive Tooltips**: Hover to see detailed values

### 3. **Category-Based Visualization**
- **Spending by Category** (Pie Chart): Visual breakdown of expenses by category
- **Color-Coded Categories**: Each category has a distinct color for easy identification
- **Percentage Display**: Shows percentage breakdown on chart

### 4. **Transactions Section**
- **Comprehensive Table View** (Desktop): All transaction details in a clean table layout
- **Card View** (Mobile): Responsive card layout for small screens
- **Smart Responsive Design**: Automatically adapts between table and cards based on screen size

#### Transaction Features:
- **Search**: Filter transactions by category or description
- **Multi-Filter**: Filter by transaction type (Income/Expense) and category
- **Sort Options**: Sort by date or amount, toggle ascending/descending order
- **Quick Actions**: Edit and delete buttons on hover (admin only)
- **Empty State**: User-friendly message when no transactions match filters

### 5. **Role-Based UI (Frontend Simulation)**
Two distinct roles with different permissions:

#### **Viewer Role**
- ✅ View all dashboard data and charts
- ✅ View transactions and apply filters
- ❌ Cannot add/edit/delete transactions
- 👁️ Read-only interface

#### **Admin Role**
- ✅ Full access to all features
- ✅ Add new transactions via modal
- ✅ Edit existing transactions
- ✅ Delete transactions
- 👑 Full administrative access

**Role Switcher**: Easy toggle in the header to switch between roles

### 6. **Insights Section**
Smart financial analytics displayed in dedicated cards:
- **Top Spending Category**: Shows which category you spend the most on
- **Monthly Spending Change**: Percentage change compared to previous month
- **Total Savings**: Overall savings (Income - Expenses)
- **Visual Cards**: Hover effects and color-coded indicators

### 7. **State Management**
- **Zustand Store**: Lightweight, scalable state management
- **No Prop Drilling**: Clean separation of concerns
- **Reusable Hooks**: `useFinancialSummary` and `useFilteredTransactions`
- **LocalStorage Persistence**: Data persists across browser sessions

### 8. **UI/UX Excellence**
✨ **Design Highlights:**
- Clean, minimal aesthetic with modern spacing
- Consistent color palette (blue, green, red accents)
- Soft shadows and rounded corners
- Smooth transitions and hover effects
- Professional typography hierarchy

📱 **Fully Responsive:**
- Mobile-first approach
- Tablet optimization
- Desktop-optimized layouts
- Adaptive charts and tables

🎨 **Dark Mode:**
- Toggle dark/light mode via button in header
- Persists user preference in localStorage
- Smooth color transitions

### 9. **Data Handling**
- **Mock Data**: 15+ realistic transaction samples
- **Helper Functions**: Robust utilities for calculations
  - `calculateBalance()`: Total balance calculation
  - `calculateTotalIncome()` & `calculateTotalExpenses()`: Category-specific sums
  - `getCategorySpending()`: Aggregated spending by category
  - `getMonthlyTrend()`: Monthly financial trends
  - `getDailyTrend()`: Daily financial patterns
  - `getInsights()`: Smart financial observations
  - `filterTransactions()`: Multi-criteria filtering
  - `sortTransactions()`: Flexible sorting

## 🏗️ Project Structure

```
/src
├── /components
│   ├── Header.jsx              # Main navigation header
│   ├── SummaryCard.jsx         # Dashboard summary cards
│   ├── Charts.jsx              # Recharts components (Line, Pie, etc.)
│   ├── TransactionList.jsx     # Transaction display component
│   ├── TransactionItem.jsx     # Individual transaction items
│   ├── TransactionFilters.jsx  # Filter and search controls
│   ├── TransactionModal.jsx    # Add/Edit transaction modal
│   ├── RoleSwitcher.jsx        # Role toggle component
│   └── Insights.jsx            # Financial insights display
├── /store
│   └── financeStore.js         # Zustand state management
├── /hooks
│   └── useTransactions.js      # Custom React hooks
├── /utils
│   └── helpers.js              # Helper functions & calculations
├── /data
│   └── mockData.js             # Mock transaction data
├── App.jsx                     # Main application component
├── main.jsx                    # Entry point
└── index.css                   # Global styles (Tailwind)
```

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Library | ^19.2.4 |
| **Vite** | Build Tool | ^8.0.1 |
| **Tailwind CSS** | Styling | ^3.4.1 |
| **Recharts** | Data Visualization | ^2.12.7 |
| **Zustand** | State Management | ^4.4.7 |
| **PostCSS** | CSS Processor | ^8.4.35 |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone or navigate to the project:**
   ```bash
   cd FinUI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173` (Vite default)

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎮 Usage Guide

### Getting Started
1. **Explore as Viewer**: The app defaults to "Viewer" role - explore the dashboard
2. **Switch to Admin**: Use the role selector in the header to switch to "Admin"
3. **Add Transactions**: Click "+ Add Transaction" button (admin only)
4. **Filter & Search**: Use the filter panel to find specific transactions
5. **View Charts**: Scroll through the dashboard to see various visualizations

### Adding/Editing Transactions
1. Click the "+ Add Transaction" button (admin role required)
2. Fill in the transaction details:
   - **Type**: Income or Expense
   - **Amount**: Dollar amount
   - **Category**: Select from predefined categories
   - **Date**: Transaction date
   - **Description**: Optional note
3. Click "Add Transaction" to save

### Filtering Transactions
- **Search**: Type to filter by category or description
- **Type Filter**: Show all, income only, or expenses only
- **Category Filter**: Filter by specific category
- **Sort**: Choose to sort by date or amount
- **Sort Order**: Toggle between ascending (↑) and descending (↓)
- **Clear Filters**: Reset all filters at once

### Data Persistence
- All transactions are automatically saved to localStorage
- Dark mode preference is remembered
- User role preference is persisted
- Data survives browser refresh and restart

## 📊 State Management

### Zustand Store (`financeStore.js`)

The app uses Zustand for lightweight, scalable state management:

```javascript
// Access state
const transactions = useFinanceStore(state => state.transactions);
const role = useFinanceStore(state => state.role);

// Update state
const addTransaction = useFinanceStore(state => state.addTransaction);
const setRole = useFinanceStore(state => state.setRole);
```

**Benefits:**
- ✅ No context provider boilerplate
- ✅ Minimal re-renders
- ✅ TypeScript-friendly (optional)
- ✅ Easy debugging with devtools

### Custom Hooks

**`useFinancialSummary()`**
```javascript
const { balance, totalIncome, totalExpenses } = useFinancialSummary();
```
Memoized calculation of financial totals with automatic updates.

**`useFilteredTransactions()`**
```javascript
const filteredTransactions = useFilteredTransactions();
```
Returns filtered and sorted transactions based on current store state.

## 🔐 Role-Based Access Control

### Frontend-Only Simulation

The app implements role-based UI without backend logic:

```javascript
{role === 'admin' && (
  <button onClick={onAddTransaction}>+ Add Transaction</button>
)}
```

**Key Points:**
- Purely frontend-based (no API/backend)
- Role stored in localStorage
- Easy to swap with real authentication later
- Demonstrates proper access control patterns

## 🎨 Design System

### Color Palette
- **Primary**: #0f172a (Dark blue)
- **Secondary**: #1e293b (Slate)
- **Accent**: #3b82f6 (Blue)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)

### Category Colors
Each expense category has a distinct color:
- Salary → Green
- Rent → Red
- Groceries → Purple
- Food → Pink
- Travel → Cyan
- Entertainment → Orange
- Bills → Amber
- ...and more

### Typography
- **Headings**: Bold, large sizes (1.5rem - 2rem)
- **Body**: Regular weight, 14-16px
- **Small**: 12-13px for captions and labels

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (full-width single column)
- **Tablet**: 640px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-column grids, full features)

## 🚀 Performance Optimizations

1. **Memoization**: Custom hooks use `useMemo` for expensive calculations
2. **Component Splitting**: Smaller components for better re-render control
3. **Lazy Calculations**: Financial summaries only recalculate when data changes
4. **Efficient Filtering**: Debounced search and filter operations
5. **Chart Optimization**: Recharts handles rendering optimization

## 📝 Code Quality

### Best Practices Implemented
- ✅ Functional components with hooks
- ✅ Custom hooks for logic reuse
- ✅ Proper component composition
- ✅ Clean naming conventions
- ✅ Comments on complex logic
- ✅ Consistent code formatting
- ✅ No prop drilling with Zustand
- ✅ Separation of concerns

### Naming Conventions
- Components: PascalCase (`Header.jsx`, `SummaryCard.jsx`)
- Utilities & Hooks: camelCase (`formatCurrency`, `useFinancialSummary`)
- Constants: UPPER_SNAKE_CASE (in data files)

## 🔄 Data Flow

```
User Interaction
    ↓
Component State Update (Zustand)
    ↓
Derived State (Custom Hooks with useMemo)
    ↓
Component Re-render
    ↓
localStorage Persistence
```

## 🌟 Optional Enhancements (Future)

- [ ] Dark mode animations
- [ ] Export transactions as CSV/JSON
- [ ] Budget tracking and alerts
- [ ] Recurring transaction templates
- [ ] Multi-currency support
- [ ] Data import from CSV
- [ ] Advanced analytics (forecasting)
- [ ] Backend API integration
- [ ] Authentication system
- [ ] User profiles

## 🧪 Testing Suggestions

1. **Add Transactions**: Test adding various income and expense entries
2. **Filter & Search**: Verify all filter combinations work correctly
3. **Role Switching**: Confirm UI changes based on role
4. **Dark Mode**: Test dark mode toggle and persistence
5. **Responsive Design**: Check layout on mobile, tablet, desktop
6. **Data Persistence**: Refresh page and verify data persists

## 📄 License

This project is open source and available under the MIT License.

## 💡 Key Learnings

This project demonstrates:
- Modern React patterns (hooks, functional components)
- Effective state management with Zustand
- Clean component architecture
- Professional UI/UX design principles
- Responsive web design
- Data visualization with Recharts
- localStorage API usage
- Performance optimization techniques

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements!

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React, Tailwind CSS, and Recharts**

