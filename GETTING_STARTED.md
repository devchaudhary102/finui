# 🚀 FinUI - Getting Started Guide

Welcome to FinUI, a modern finance dashboard built with React, Tailwind CSS, and Recharts!

## ⚡ Quick Start (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

That's it! The app is now running! 🎉

---

## 📋 What You'll See

### **1. Summary Cards (Top)**
Three colorful cards showing:
- 💵 **Total Balance** - Your overall balance
- 📈 **Total Income** - Money coming in
- 📉 **Total Expenses** - Money going out

### **2. Charts (Middle)**
Multiple interactive charts:
- **Balance Trend Chart** - Line chart of your balance over 30 days
- **Spending by Category** - Pie chart showing where your money goes
- **Income vs Expenses** - Comparison chart

### **3. Insights (Below Charts)**
Smart financial observations:
- Top spending category
- Monthly spending change
- Total savings

### **4. Transactions (Bottom)**
Complete transaction list with:
- Search functionality
- Multiple filters
- Sort options
- Edit/Delete capabilities

---

## 🎮 How to Use

### **1. Explore as Viewer (Default)**
- You start as a "Viewer"
- Explore all the dashboards and charts
- View all transactions
- You CANNOT add/edit/delete transactions yet

### **2. Switch to Admin Role**
- Look at the **header** (top of page)
- Find the **role selector dropdown**
- Change from "Viewer" to "Admin"
- Now you have full permissions!

### **3. Add a Transaction**
- Click **"+ Add Transaction"** button (appears when in Admin role)
- Fill in the form:
  - **Type**: Choose "Income" or "Expense"
  - **Amount**: Enter the dollar amount
  - **Category**: Pick from the list (Salary, Food, Travel, etc.)
  - **Date**: Select a date
  - **Description**: Optional note (e.g., "Lunch at restaurant")
- Click **"Add Transaction"**
- Watch the dashboard update instantly!

### **4. Edit a Transaction**
- Hover over any transaction in the list
- Click the **✏️ (edit)** icon
- Modify the details
- Click **"Update Transaction"**

### **5. Delete a Transaction**
- Hover over any transaction
- Click the **🗑️ (delete)** icon
- Confirm deletion
- Transaction is removed instantly

### **6. Filter Transactions**
At the top of the transactions section:
- **Search box**: Type to filter by category or description
- **Type dropdown**: Show All / Income only / Expenses only
- **Category dropdown**: Filter by specific category
- **Sort options**: Sort by Date or Amount
- **Sort direction**: Toggle ↑ (ascending) and ↓ (descending)
- **Clear Filters button**: Reset all filters

### **7. Toggle Dark Mode**
- Click the **🌙** (moon) icon in the header
- Switch to dark theme
- Click again to switch back to light theme
- Your preference is saved!

---

## 💾 Data Persistence

Everything is **automatically saved**:
- ✅ All transactions persist in browser's localStorage
- ✅ Your role preference (Admin/Viewer) is saved
- ✅ Dark mode preference is remembered
- ✅ Data survives browser refresh and restart!

**To reset to default mock data:**
```javascript
// In browser console:
localStorage.removeItem('financeTransactions');
location.reload();
```

---

## 📁 Project Structure

```
src/
├── components/           # React UI components
├── store/               # Zustand state management
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
├── data/                # Mock transaction data
├── App.jsx              # Main component
└── index.css            # Tailwind styles
```

**Key Files to Know:**

| File | Purpose |
|------|---------|
| `src/data/mockData.js` | Sample transactions and categories |
| `src/store/financeStore.js` | All app state management |
| `src/utils/helpers.js` | Calculations and formatting |
| `src/components/App.jsx` | Main layout and logic |

---

## 🎨 Features Tour

### **Summary Cards**
- Shows your financial overview at a glance
- Color-coded: Blue (balance), Green (income), Red (expenses)
- Formatted as USD currency
- Hover effects for interactivity

### **Charts**
- **Recharts library** for beautiful visualizations
- **Responsive**: Adapts to screen size
- **Interactive**: Hover to see values
- **Smooth animations**: Professional look

### **Insights**
- AI-like observations about your spending
- Top spending category
- Monthly comparison (vs previous month)
- Total savings calculation

### **Transactions Table**
- **Desktop**: Responsive table view
- **Mobile**: Card-based view
- **View toggle**: Switch between Table and Cards on desktop
- **Hover actions**: Edit/delete on hover
- **Status indicators**: Green for income, Red for expenses

### **Role-Based Access**
- **Viewer**: Read-only access (great for demos!)
- **Admin**: Full access to add/edit/delete
- No backend required - purely frontend logic
- Easy to swap with real authentication later

### **Dark Mode**
- Toggle in header (🌙 icon)
- Smooth transitions
- Persisted to localStorage
- Professional color scheme for dark theme

---

## 🛠️ Build & Deploy

### **Development**
```bash
npm run dev      # Start dev server
```

### **Production**
```bash
npm run build    # Build for production
npm run preview  # Preview the build locally
```

The built app is ready in the `dist/` folder!

---

## 🐛 Troubleshooting

### **Transactions not showing?**
- Make sure you're in Admin role to see edit/delete options
- Check the filters - you might have filters applied
- Click "Clear Filters" to reset

### **Changes not persisting?**
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading
- Check browser console for errors (F12)

### **Dark mode not saving?**
- localStorage might be disabled
- Check browser privacy settings
- Try a different browser

### **Charts not displaying?**
- You might need to add more transactions first
- Try the default mock data by refreshing (or reset localStorage)
- Check browser console for errors

---

## 📚 Tech Stack Explained

| Technology | What It Does |
|-----------|--------------|
| **React** | Creates interactive UI components |
| **Vite** | Fast build tool for development |
| **Tailwind CSS** | Fast UI styling with utility classes |
| **Recharts** | Beautiful charts and graphs |
| **Zustand** | Simple, lightweight state management |
| **localStorage API** | Saves data in browser |

---

## 🎯 Next Steps

1. **Explore the App**
   - Switch roles, add transactions, filter data
   - Try dark mode, check different screen sizes

2. **Read the Code**
   - Start with `src/App.jsx` (main layout)
   - Look at `src/store/financeStore.js` (how state works)
   - Check `src/utils/helpers.js` (calculations)

3. **Try Adding Features**
   - Add a new category
   - Create a new insight
   - Customize colors or layout

4. **Deploy**
   - Run `npm run build`
   - Upload `dist/` folder to your hosting

---

## 📖 Additional Resources

- **React**: [react.dev](https://react.dev)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Recharts**: [recharts.org](https://recharts.org)
- **Zustand**: [zustand.docs.pmnd.rs](https://zustand.docs.pmnd.rs)
- **Vite**: [vitejs.dev](https://vitejs.dev)

---

## 💡 Pro Tips

✅ **Try These**
- Switch between Viewer and Admin roles to see UI changes
- Add 10+ transactions to see meaningful charts
- Filter by different categories
- Resize your browser to see responsive design
- Check localStorage: Open DevTools → Application → localStorage → financeTransactions

❌ **Avoid**
- Directly modifying localStorage (use the UI instead)
- Refreshing during a modal action (wait for submission first)
- Disabling JavaScript (nothing will work!)

---

## 🎉 You're Ready!

Start exploring FinUI now with:
```bash
npm run dev
```

Have fun building! 🚀

---

**Questions?** Check the `README.md` for detailed documentation or the `QUICK_REFERENCE.md` for developer info.
