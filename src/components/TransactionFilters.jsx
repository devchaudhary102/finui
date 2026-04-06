import { useFinanceStore } from '../store/financeStore';
import { categories } from '../data/mockData';

/**
 * Transaction Filters Component
 */
const TransactionFilters = () => {
  const filters = useFinanceStore(state => state.filters);
  const setFilters = useFinanceStore(state => state.setFilters);
  const resetFilters = useFinanceStore(state => state.resetFilters);
  const sortBy = useFinanceStore(state => state.sortBy);
  const sortOrder = useFinanceStore(state => state.sortOrder);
  const setSortBy = useFinanceStore(state => state.setSortBy);
  const setSortOrder = useFinanceStore(state => state.setSortOrder);

  const handleSearchChange = (e) => {
    setFilters({ search: e.target.value });
  };

  const handleTypeChange = (e) => {
    setFilters({ type: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ category: e.target.value });
  };

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.search !== '';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filters & Search</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Search
          </label>
          <input
            type="text"
            placeholder="Category or description..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Type
          </label>
          <select
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Category
          </label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Sort
          </label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition bg-white dark:bg-slate-700"
              title="Toggle sort order"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
