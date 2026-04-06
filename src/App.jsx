import { useState } from 'react';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import { AdvancedTrendChart, SpendingByCategoryChart } from './components/ChartsWithFilters';
import TransactionFilters from './components/TransactionFilters';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
import TransactionModal from './components/TransactionModal';
import { useFinanceStore } from './store/financeStore';
import { useFinancialSummary } from './hooks/useTransactions';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import './index.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const isDarkMode = useFinanceStore(state => state.isDarkMode);
  const toggleDarkMode = useFinanceStore(state => state.toggleDarkMode);
  const role = useFinanceStore(state => state.role);

  const addTransaction = useFinanceStore(state => state.addTransaction);
  const updateTransaction = useFinanceStore(state => state.updateTransaction);
  const deleteTransaction = useFinanceStore(state => state.deleteTransaction);

  const { balance, totalIncome, totalExpenses } = useFinancialSummary();

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowModal(true);
  };

  const handleEditTransaction = (transaction) => {
    if (role === 'admin') {
      setEditingTransaction(transaction);
      setShowModal(true);
    }
  };

  const handleDeleteTransaction = (id) => {
    if (role === 'admin') {
      if (confirm('Are you sure you want to delete this transaction?')) {
        deleteTransaction(id);
      }
    }
  };

  const handleModalSubmit = (formData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData);
    } else {
      addTransaction(formData);
    }
    setShowModal(false);
    setEditingTransaction(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'} transition-colors`}>
        {/* Header */}
        <Header
          onAddTransaction={handleAddTransaction}
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />

        {/* Main Content */}
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isDarkMode ? 'dark' : ''}`}>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard
              title="Total Balance"
              amount={balance}
              icon={Wallet}
              color="blue"
            />
            <SummaryCard
              title="Total Income"
              amount={totalIncome}
              icon={TrendingUp}
              color="green"
            />
            <SummaryCard
              title="Total Expenses"
              amount={totalExpenses}
              icon={TrendingDown}
              color="red"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AdvancedTrendChart />
            <SpendingByCategoryChart />
          </div>

          {/* Insights Section */}
          <div className="mb-8">
            <Insights />
          </div>

          {/* Transactions Section */}
          <div>
            <TransactionFilters />
            <TransactionList
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className={`border-t transition-colors ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'} mt-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center">
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                © 2026 FinanceHub. Built with React • Tailwind CSS • Recharts
              </p>
            </div>
          </div>
        </footer>

        {/* Transaction Modal */}
        {role === 'admin' && (
          <TransactionModal
            isOpen={showModal}
            transaction={editingTransaction}
            onClose={handleCloseModal}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
