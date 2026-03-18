import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { TrendingUp, Users, Coins, BarChart3, Target, PieChart } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: TrendingUp },
    { path: '/discover', label: 'Discover', icon: Users },
    { path: '/talent/new', label: 'Raise', icon: Coins },
    { path: '/dashboard/investor', label: 'Portfolio', icon: PieChart },
    { path: '/predictions', label: 'Markets', icon: Target },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-[color:var(--surface)] border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color:var(--surface-raised)] border">
                <TrendingUp className="w-5 h-5 text-[color:var(--accent)]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
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
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full border transition-colors ${
                      isActive 
                        ? 'bg-[color:var(--surface-raised)] text-[color:var(--text-primary)] border-[color:var(--border-active)]'
                        : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--surface-raised)]'
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
            <Button asChild variant="outline" size="sm">
              <Link to="/auth?tab=wallet">Connect Wallet</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/auth?tab=signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}