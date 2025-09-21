import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  Clock, 
  Target,
  Eye,
  Heart,
  MessageSquare,
  Settings
} from 'lucide-react';

export function Dashboard() {
  const [timeframe, setTimeframe] = useState('7d');

  const portfolioData = [
    { date: 'Jan', value: 2400 },
    { date: 'Feb', value: 2610 },
    { date: 'Mar', value: 2890 },
    { date: 'Apr', value: 3200 },
    { date: 'May', value: 3800 },
    { date: 'Jun', value: 4200 },
    { date: 'Jul', value: 4800 }
  ];

  const stats = [
    {
      title: "Portfolio Value",
      value: "$4,847",
      change: "+23.4%",
      trend: "up",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Active Investments",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "blue"
    },
    {
      title: "Hours Owned",
      value: "156",
      change: "+34",
      trend: "up",
      icon: Clock,
      color: "purple"
    },
    {
      title: "Bonds Minted",
      value: "3",
      change: "0",
      trend: "stable",
      icon: Target,
      color: "pink"
    }
  ];

  const investments = [
    {
      id: 1,
      name: "Kwame Asante",
      category: "Music",
      invested: "0.5 ETH",
      currentValue: "0.72 ETH",
      change: "+44%",
      hours: 25,
      image: "https://images.unsplash.com/photo-1571990455341-c06400a41071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0aXN0JTIwbXVzaWMlMjBjcmVhdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM5ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      name: "Elena Vasquez",
      category: "Tech",
      invested: "1.2 ETH",
      currentValue: "2.1 ETH",
      change: "+75%",
      hours: 40,
      image: "https://images.unsplash.com/photo-1562583616-e8a045ed56e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMHN0YXJ0dXAlMjBmb3VuZGVyfGVufDF8fHx8MTc1ODM5ODk0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "Sofia Chen",
      category: "Blockchain",
      invested: "0.8 ETH",
      currentValue: "1.6 ETH",
      change: "+100%",
      hours: 15,
      image: "https://images.unsplash.com/photo-1740663173325-c3000e33c830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRlciUyMGFydGlzdCUyMGZlbWFsZXxlbnwxfHx8fDE3NTgzOTg5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const myBonds = [
    {
      id: 1,
      title: "Music Production Services",
      category: "Music",
      price: "0.05 ETH",
      sold: 250,
      total: 1000,
      revenue: "12.5 ETH",
      views: 1247,
      likes: 89,
      status: "active"
    }
  ];

  const activities = [
    {
      type: "purchase",
      description: "Purchased 10 hours from Elena Vasquez",
      amount: "0.25 ETH",
      time: "2 hours ago"
    },
    {
      type: "sale",
      description: "Sold 5 hours to @musiclover",
      amount: "0.05 ETH",
      time: "4 hours ago"
    },
    {
      type: "milestone",
      description: "Kwame Asante completed studio setup milestone",
      amount: "50 tokens",
      time: "1 day ago"
    },
    {
      type: "trade",
      description: "Bond price increased for Sofia Chen",
      amount: "+15%",
      time: "2 days ago"
    }
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">Dashboard</h1>
            <p className="text-gray-400">Manage your investments and track your portfolio performance</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-4 md:mt-0">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            const isNegative = stat.change.startsWith('-');
            
            return (
              <Card key={index} className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                  <div className={`flex items-center text-sm ${
                    isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {isPositive && <TrendingUp className="w-3 h-3 mr-1" />}
                    {isNegative && <TrendingDown className="w-3 h-3 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.title}</div>
              </Card>
            );
          })}
        </motion.div>

        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Portfolio Performance</h2>
              <div className="flex gap-2">
                {['7d', '30d', '90d', '1y'].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className={timeframe === period 
                      ? "bg-purple-600 hover:bg-purple-700" 
                      : "border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                    }
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #7C3AED', 
                    borderRadius: '8px' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  fill="url(#gradient)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-purple-500/20">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="bonds">My Bonds</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="investments" className="space-y-6">
            <div className="grid gap-4">
              {investments.map((investment) => (
                <motion.div
                  key={investment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center gap-4">
                      <img 
                        src={investment.image} 
                        alt={investment.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{investment.name}</h3>
                          <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                            {investment.category}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Invested: </span>
                            <span className="text-white">{investment.invested}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Current: </span>
                            <span className="text-white">{investment.currentValue}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Change: </span>
                            <span className="text-green-400">{investment.change}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Hours: </span>
                            <span className="text-white">{investment.hours}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                          Trade
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bonds" className="space-y-6">
            <div className="grid gap-4">
              {myBonds.map((bond) => (
                <motion.div
                  key={bond.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg mb-1">{bond.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                            {bond.category}
                          </Badge>
                          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                            {bond.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-green-400">{bond.revenue}</div>
                        <div className="text-sm text-gray-400">Total Revenue</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg">{bond.price}</div>
                        <div className="text-sm text-gray-400">Current Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg">{bond.sold}/{bond.total}</div>
                        <div className="text-sm text-gray-400">Bonds Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4" />
                          {bond.views}
                        </div>
                        <div className="text-sm text-gray-400">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg flex items-center justify-center gap-1">
                          <Heart className="w-4 h-4" />
                          {bond.likes}
                        </div>
                        <div className="text-sm text-gray-400">Likes</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(bond.sold / bond.total) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                        Edit Bond
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        View Analytics
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
              <h3 className="text-xl mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
                  >
                    <div className="flex-1">
                      <p className="text-gray-300">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`text-right ${
                      activity.type === 'sale' || activity.amount.startsWith('+') 
                        ? 'text-green-400' 
                        : 'text-purple-400'
                    }`}>
                      {activity.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}