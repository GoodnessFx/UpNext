import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { TrendingUp, Users, Coins, BarChart3, Target, PieChart } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: TrendingUp },
    { path: '/marketplace', label: 'Marketplace', icon: Users },
    { path: '/mint', label: 'Mint Bond', icon: Coins },
    { path: '/portfolio', label: 'Portfolio', icon: PieChart },
    { path: '/predictions', label: 'Fame Chain', icon: Target },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UpNext
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-purple-600/20 text-purple-400' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
              Connect Wallet
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}