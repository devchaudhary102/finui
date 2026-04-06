import RoleSwitcher from './RoleSwitcher';
import { useFinanceStore } from '../store/financeStore';
import { Moon, Sun, Plus, BarChart3, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Header Component
 * Main navigation and controls - Industry-standard design
 */
const Header = ({ onAddTransaction, onToggleDarkMode, isDarkMode }) => {
  const role = useFinanceStore(state => state.role);

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <header className={`${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-100'} border-b sticky top-0 z-40 transition-colors backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Branding - Left */}
          <motion.div 
            className="flex items-center gap-3.5 flex-shrink-0"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <motion.div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20'}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full"></div>
              </div>
              <BarChart3 size={24} strokeWidth={2.5} className="relative z-10" />
            </motion.div>
            <motion.div 
              className="hidden sm:flex flex-col justify-center gap-0.5"
              variants={textVariants}
            >
              <h1 className={`text-2xl font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                FinanceHub
              </h1>
            </motion.div>
          </motion.div>

          {/* Center - Navigation */}
          <motion.div 
            className="hidden lg:flex items-center gap-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <nav className={`flex gap-1 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100/50'} rounded-xl p-1.5 backdrop-blur-sm`}>
              <motion.button 
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-white'}`}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Dashboard
              </motion.button>
              <motion.button 
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-white'}`}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Analytics
              </motion.button>
            </nav>
          </motion.div>

          {/* Right - Controls */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.4
                }
              }
            }}
          >
            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleDarkMode}
              className={`p-2.5 rounded-lg transition-all duration-200 ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700 shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-sm'}`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              variants={buttonVariants}
              whileHover={{ scale: 1.1, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </motion.button>

            {/* Role Switcher */}
            <motion.div
              variants={buttonVariants}
            >
              <RoleSwitcher />
            </motion.div>

            {/* Add Transaction Button */}
            {role === 'admin' && (
              <motion.button
                onClick={onAddTransaction}
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-bold rounded-lg transition-all duration-200 flex items-center gap-2.5 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0"
                variants={buttonVariants}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95, translateY: 0 }}
              >
                <Plus size={20} strokeWidth={2} />
                <span className="hidden sm:inline">Add</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
