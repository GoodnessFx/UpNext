import { motion } from 'motion/react';
import { Card } from './ui/card';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

export function StatsPanel() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Volume Traded",
      value: "$2.4M",
      change: "+23%",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      label: "Active Creators",
      value: "1,247",
      change: "+12%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      label: "Life Bonds Minted",
      value: "8,432",
      change: "+45%",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      label: "Hours Traded",
      value: "156K",
      change: "+67%",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-blue-950/10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Platform Statistics</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time data from the world's first human stock market
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <motion.div
                    className="text-3xl mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  
                  <div className="flex items-center justify-center">
                    <span className="text-green-400 text-sm">{stat.change}</span>
                    <TrendingUp className="w-3 h-3 text-green-400 ml-1" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl text-purple-400 mb-1">99.2%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl text-pink-400 mb-1">4.7x</div>
                <div className="text-sm text-gray-400">Avg Return</div>
              </div>
              <div>
                <div className="text-2xl text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-400">Trading Hours</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}