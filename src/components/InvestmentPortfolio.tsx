import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, ComposedChart } from 'recharts';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Clock, Target, Activity } from 'lucide-react';

// Mock data for portfolio performance - Trading chart format
const portfolioData = [
  { date: 'Jan 1', value: 10000, open: 9800, high: 10200, low: 9700, close: 10000, volume: 150 },
  { date: 'Jan 15', value: 12500, open: 10000, high: 12800, low: 9950, close: 12500, volume: 280 },
  { date: 'Feb 1', value: 11800, open: 12500, high: 12600, low: 11500, close: 11800, volume: 190 },
  { date: 'Feb 15', value: 15200, open: 11800, high: 15400, low: 11600, close: 15200, volume: 340 },
  { date: 'Mar 1', value: 18700, open: 15200, high: 19000, low: 15100, close: 18700, volume: 420 },
  { date: 'Mar 15', value: 22100, open: 18700, high: 22500, low: 18500, close: 22100, volume: 390 },
  { date: 'Apr 1', value: 25800, open: 22100, high: 26000, low: 21800, close: 25800, volume: 480 },
];

// Support and Resistance levels
const supportResistance = [
  { value: 12000, type: 'support' },
  { value: 20000, type: 'resistance' },
  { value: 16000, type: 'support' },
];

// Custom Candlestick Component
const CandlestickShape = (props: any) => {
  const { payload, x, y, width, height, yScale } = props;
  
  if (!payload) return null;
  
  const { open, high, low, close } = payload;
  const isGreen = close >= open;
  const color = isGreen ? '#10B981' : '#EF4444';
  
  // Calculate positions
  const wickX = x + width / 2;
  const bodyTop = Math.max(open, close);
  const bodyBottom = Math.min(open, close);
  const bodyHeight = Math.abs(close - open);
  
  // Convert prices to Y coordinates
  const highY = yScale(high);
  const lowY = yScale(low);
  const bodyTopY = yScale(bodyTop);
  const bodyBottomY = yScale(bodyBottom);
  
  return (
    <g>
      {/* High-Low Wick */}
      <line
        x1={wickX}
        y1={highY}
        x2={wickX}
        y2={lowY}
        stroke={color}
        strokeWidth={1}
        opacity={0.8}
      />
      {/* Open-Close Body */}
      <rect
        x={x + width * 0.2}
        y={bodyTopY}
        width={width * 0.6}
        height={Math.max(bodyBottomY - bodyTopY, 1)}
        fill={isGreen ? 'transparent' : color}
        stroke={color}
        strokeWidth={1.5}
        fillOpacity={isGreen ? 0 : 1}
      />
    </g>
  );
};

const bondPerformance = [
  { name: 'Alex Chen', value: 2500, change: 12.5, category: 'Tech' },
  { name: 'Maria Santos', value: 1800, change: -3.2, category: 'Art' },
  { name: 'David Kim', value: 3200, change: 18.7, category: 'Music' },
  { name: 'Sarah Wilson', value: 1500, change: 8.9, category: 'Sports' },
  { name: 'James Rodriguez', value: 2200, change: 15.3, category: 'Business' },
];

const assetAllocation = [
  { name: 'Life Bonds', value: 19600, color: '#8B5CF6' },
  { name: 'Time Tokens', value: 6200, color: '#EC4899' },
];

const dailyActivity = [
  { time: '9:00', trades: 12 },
  { time: '10:00', trades: 19 },
  { time: '11:00', trades: 27 },
  { time: '12:00', trades: 15 },
  { time: '13:00', trades: 22 },
  { time: '14:00', trades: 31 },
  { time: '15:00', trades: 28 },
  { time: '16:00', trades: 18 },
];

export function InvestmentPortfolio() {
  const [timeframe, setTimeframe] = useState('3M');
  
  const totalValue = portfolioData[portfolioData.length - 1].value;
  const totalGain = totalValue - portfolioData[0].value;
  const totalGainPercent = (totalGain / portfolioData[0].value) * 100;

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Investment Portfolio
          </h1>
          <p className="text-gray-400">Track your investments in human potential</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gray-900/50 border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Total Value</p>
                <p className="text-2xl">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Total Gain</p>
                <p className="text-2xl text-green-400">+${totalGain.toLocaleString()}</p>
                <p className="text-sm text-green-400">+{totalGainPercent.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Active Bonds</p>
                <p className="text-2xl">15</p>
              </div>
              <Target className="h-8 w-8 text-pink-400" />
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Time Tokens</p>
                <p className="text-2xl">247</p>
                <p className="text-sm text-gray-400">hours</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </Card>
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gray-900/50 border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Portfolio Performance</h3>
              <div className="flex gap-2">
                {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      timeframe === period
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-96">
              {/* Main Candlestick Chart */}
              <div className="h-3/4 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={portfolioData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="1 1" stroke="#2D3748" strokeOpacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#718096" 
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#718096" 
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      domain={['dataMin - 1000', 'dataMax + 1000']}
                    />
                    
                    {/* Support and Resistance Lines */}
                    {supportResistance.map((level, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={() => level.value}
                        stroke={level.type === 'support' ? '#10B981' : '#EF4444'}
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                        strokeOpacity={0.6}
                      />
                    ))}
                    
                    {/* Candlestick Bodies using Bar */}
                    <Bar 
                      dataKey="open"
                      shape={(props: any) => {
                        const { payload, x, y, width, height } = props;
                        if (!payload) return null;
                        
                        const { open, high, low, close } = payload;
                        const isGreen = close >= open;
                        const color = isGreen ? '#10B981' : '#EF4444';
                        
                        // Calculate chart scale
                        const dataMin = Math.min(...portfolioData.map(d => d.low)) - 1000;
                        const dataMax = Math.max(...portfolioData.map(d => d.high)) + 1000;
                        const range = dataMax - dataMin;
                        
                        // Convert prices to pixel positions
                        const yScale = (value: number) => y + height - ((value - dataMin) / range) * height;
                        
                        const highY = yScale(high);
                        const lowY = yScale(low);
                        const openY = yScale(open);
                        const closeY = yScale(close);
                        
                        const wickX = x + width / 2;
                        const bodyTop = Math.min(openY, closeY);
                        const bodyHeight = Math.abs(openY - closeY);
                        
                        return (
                          <g>
                            {/* High-Low Wick */}
                            <line
                              x1={wickX}
                              y1={highY}
                              x2={wickX}
                              y2={lowY}
                              stroke={color}
                              strokeWidth={1}
                              opacity={0.8}
                            />
                            {/* Open-Close Body */}
                            <rect
                              x={x + width * 0.2}
                              y={bodyTop}
                              width={width * 0.6}
                              height={Math.max(bodyHeight, 2)}
                              fill={isGreen ? 'transparent' : color}
                              stroke={color}
                              strokeWidth={1.5}
                              fillOpacity={isGreen ? 0 : 1}
                            />
                          </g>
                        );
                      }}
                    />
                    
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-gray-900 border border-gray-600 rounded p-3 shadow-lg">
                              <p className="text-gray-300 mb-2">{label}</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between gap-6">
                                  <span className="text-gray-400">Open:</span>
                                  <span className="text-white">${data.open.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-gray-400">High:</span>
                                  <span className="text-green-400">${data.high.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-gray-400">Low:</span>
                                  <span className="text-red-400">${data.low.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-gray-400">Close:</span>
                                  <span className={data.close >= data.open ? 'text-green-400' : 'text-red-400'}>
                                    ${data.close.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between gap-6 pt-2 border-t border-gray-600">
                                  <span className="text-gray-400">Change:</span>
                                  <span className={data.close >= data.open ? 'text-green-400' : 'text-red-400'}>
                                    {data.close >= data.open ? '+' : ''}
                                    ${(data.close - data.open).toLocaleString()} 
                                    ({((data.close - data.open) / data.open * 100).toFixed(2)}%)
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              {/* Volume Chart */}
              <div className="h-1/4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={portfolioData} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="1 1" stroke="#2D3748" strokeOpacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#718096" 
                      fontSize={11}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#718096" 
                      fontSize={11}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A202C', 
                        border: '1px solid #4A5568',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value}`, 'Volume']}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#4A5568"
                      radius={[1, 1, 0, 0]}
                      opacity={0.6}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bond Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-900/50 border-purple-500/20 p-6">
              <h3 className="mb-6">Bond Performance</h3>
              <div className="space-y-4">
                {bondPerformance.map((bond, index) => (
                  <div key={bond.name} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span>{bond.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{bond.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {bond.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>${bond.value.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        {bond.change > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                        <span className={bond.change > 0 ? 'text-green-400' : 'text-red-400'}>
                          {bond.change > 0 ? '+' : ''}{bond.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-purple-500/20 p-6">
              <h3 className="mb-6">Asset Allocation</h3>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #8B5CF6',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {assetAllocation.map((asset, index) => (
                  <div key={asset.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: asset.color }}
                      />
                      <span>{asset.name}</span>
                    </div>
                    <span>${asset.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Trading Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gray-900/50 border-purple-500/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-purple-400" />
              <h3>Daily Trading Activity</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #8B5CF6',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="trades" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}