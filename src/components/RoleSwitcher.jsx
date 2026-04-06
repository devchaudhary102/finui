import { useFinanceStore } from '../store/financeStore';
import { Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Role Switcher Component
 * Toggle between Viewer and Admin roles - Industry-standard design
 */
const RoleSwitcher = () => {
  const role = useFinanceStore(state => state.role);
  const isDarkMode = useFinanceStore(state => state.isDarkMode);
  const setRole = useFinanceStore(state => state.setRole);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div className="hidden sm:block">
        <motion.div 
          className={`flex gap-1.5 rounded-xl p-1.5 backdrop-blur-sm ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100/50'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {['viewer', 'admin'].map((r) => (
            <motion.button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2.5 ${
                role === r
                  ? isDarkMode 
                    ? 'bg-slate-700 shadow-lg text-white' 
                    : 'bg-white shadow-md text-blue-600'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {r === 'admin' ? (
                <>
                  <motion.div animate={{ rotate: role === r ? [0, 360] : 0 }} transition={{ duration: 0.5 }}>
                    <Lock size={18} strokeWidth={2} />
                  </motion.div>
                  <span className="capitalize">Admin</span>
                </>
              ) : (
                <>
                  <motion.div animate={{ scale: role === r ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.5 }}>
                    <Eye size={18} strokeWidth={2} />
                  </motion.div>
                  <span className="capitalize">Viewer</span>
                </>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Mobile dropdown */}
      <select
        value={role}
        onChange={(e) => handleRoleChange(e.target.value)}
        className={`sm:hidden px-3.5 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-bold ${
          isDarkMode
            ? 'border-slate-700 bg-slate-800 text-white'
            : 'border-gray-300 bg-white text-gray-900'
        }`}
      >
        <option value="viewer">👁️ Viewer</option>
        <option value="admin">� Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
