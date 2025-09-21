import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  TrendingUp, 
  TrendingDown,
  Target, 
  Star, 
  Users, 
  Clock,
  Flame,
  Search,
  Filter,
  Award,
  Zap
} from 'lucide-react';

export function PredictionMarket() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [category, setCategory] = useState('all');

  const predictions = [
    {
      id: 1,
      name: "Amara Okafor",
      title: "Emerging Afrobeat Artist",
      description: "Rising star with viral TikTok songs, growing fanbase across Africa",
      image: "https://images.unsplash.com/photo-1571990455341-c06400a41071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0aXN0JTIwbXVzaWMlMjBjcmVhdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM5ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Music",
      prediction: "Will hit 1M followers by 2025",
      odds: "3.2x",
      confidence: 78,
      volume: "2.4 ETH",
      backers: 156,
      timeLeft: "6 months",
      trending: true,
      hot: true
    },
    {
      id: 2,
      name: "Marcus Kim",
      title: "AI Startup Founder",
      description: "Building next-gen ML tools, former Google engineer, Y Combinator alum",
      image: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcGVyJTIwY29kaW5nJTIwcHJvZ3JhbW1lcnxlbnwxfHx8fDE3NTgzOTg5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Tech",
      prediction: "Will raise $10M Series A by Q2 2025",
      odds: "2.8x",
      confidence: 85,
      volume: "5.1 ETH",
      backers: 289,
      timeLeft: "8 months",
      trending: true,
      hot: false
    },
    {
      id: 3,
      name: "Luna Chen",
      title: "Digital Artist",
      description: "NFT artist with unique style, growing collector base, gallery exhibitions",
      image: "https://images.unsplash.com/photo-1740663173325-c3000e33c830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRlciUyMGFydGlzdCUyMGZlbWFsZXxlbnwxfHx8fDE3NTgzOTg5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Art",
      prediction: "Will have work in major museum by 2026",
      odds: "4.5x",
      confidence: 65,
      volume: "1.8 ETH",
      backers: 94,
      timeLeft: "18 months",
      trending: false,
      hot: true
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Indie Game Developer",
      description: "Solo developer creating innovative indie games, growing Steam following",
      image: "https://images.unsplash.com/photo-1562583616-e8a045ed56e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMHN0YXJ0dXAlMjBmb3VuZGVyfGVufDF8fHx8MTc1ODM5ODk0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Gaming",
      prediction: "Will release viral game with 100K+ players",
      odds: "3.7x",
      confidence: 72,
      volume: "3.2 ETH",
      backers: 178,
      timeLeft: "12 months",
      trending: true,
      hot: false
    }
  ];

  const myPredictions = [
    {
      id: 1,
      name: "Amara Okafor",
      prediction: "Will hit 1M followers by 2025",
      invested: "0.5 ETH",
      currentOdds: "3.2x",
      potentialReturn: "1.6 ETH",
      status: "active",
      confidence: 78
    },
    {
      id: 2,
      name: "Marcus Kim", 
      prediction: "Will raise $10M Series A by Q2 2025",
      invested: "1.0 ETH",
      currentOdds: "2.8x",
      potentialReturn: "2.8 ETH",
      status: "active",
      confidence: 85
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: Target },
    { id: 'music', label: 'Music', icon: Star },
    { id: 'tech', label: 'Technology', icon: Zap },
    { id: 'art', label: 'Art & Design', icon: Award },
    { id: 'gaming', label: 'Gaming', icon: Users }
  ];

  const getCategoryColor = (cat: string) => {
    const colors = {
      Music: "from-purple-500 to-pink-500",
      Tech: "from-blue-500 to-cyan-500", 
      Art: "from-pink-500 to-orange-500",
      Gaming: "from-green-500 to-blue-500"
    };
    return colors[cat] || "from-gray-500 to-gray-600";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400";
    if (confidence >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl">FameChain</h1>
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/30">
              🔥 Prediction Market
            </Badge>
          </div>
          <p className="text-xl text-gray-400">
            Predict who will blow up before they're famous. Back rising talent and earn big returns.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-orange-400">847</div>
            <div className="text-sm text-gray-400">Active Predictions</div>
          </Card>
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-green-400">$1.2M</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </Card>
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-blue-400">3,421</div>
            <div className="text-sm text-gray-400">Predictors</div>
          </Card>
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-purple-400">67%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search predictions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-purple-500/20 focus:border-purple-500/40"
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-48 bg-gray-900/50 border-purple-500/20">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-900/50 border-purple-500/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="confidence">Highest Confidence</SelectItem>
              <SelectItem value="volume">Highest Volume</SelectItem>
              <SelectItem value="odds">Best Odds</SelectItem>
              <SelectItem value="ending">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-purple-500/20">
            <TabsTrigger value="market">Prediction Market</TabsTrigger>
            <TabsTrigger value="my-predictions">My Predictions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 bg-gradient-to-b from-gray-900/80 to-black/80 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <div className="relative mb-4">
                      <ImageWithFallback
                        src={prediction.image}
                        alt={prediction.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(prediction.category)} text-white border-none`}>
                          {prediction.category}
                        </Badge>
                        {prediction.trending && (
                          <Badge className="bg-blue-600/80 text-white border-none">
                            📈 Trending
                          </Badge>
                        )}
                        {prediction.hot && (
                          <Badge className="bg-orange-600/80 text-white border-none">
                            🔥 Hot
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="px-2 py-1 bg-black/70 rounded text-xs text-white">
                          {prediction.odds} odds
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg mb-1">{prediction.name}</h3>
                      <p className="text-purple-400 text-sm mb-2">{prediction.title}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{prediction.description}</p>
                      
                      <div className="p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                        <p className="text-sm text-purple-200">{prediction.prediction}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Confidence</span>
                        <span className={`${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Volume</span>
                        <span className="text-white">{prediction.volume}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Backers</span>
                        <span className="text-white">{prediction.backers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Time Left</span>
                        <span className="text-white">{prediction.timeLeft}</span>
                      </div>

                      {/* Confidence bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            prediction.confidence >= 80 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : prediction.confidence >= 60
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                        <Target className="w-4 h-4 mr-1" />
                        Back Prediction
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                        <Clock className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-predictions" className="space-y-6">
            <div className="grid gap-4">
              {myPredictions.map((prediction) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg mb-1">{prediction.name}</h3>
                        <p className="text-gray-400 text-sm">{prediction.prediction}</p>
                      </div>
                      <Badge className={`${
                        prediction.status === 'active' 
                          ? 'bg-green-600/20 text-green-400 border-green-500/30'
                          : 'bg-gray-600/20 text-gray-400 border-gray-500/30'
                      }`}>
                        {prediction.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg text-purple-400">{prediction.invested}</div>
                        <div className="text-sm text-gray-400">Invested</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg text-orange-400">{prediction.currentOdds}</div>
                        <div className="text-sm text-gray-400">Current Odds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg text-green-400">{prediction.potentialReturn}</div>
                        <div className="text-sm text-gray-400">Potential Return</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </div>
                        <div className="text-sm text-gray-400">Confidence</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
              <h3 className="text-xl mb-6">Top Predictors</h3>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "CryptoOracle", predictions: 47, success: 89, profit: "23.4 ETH" },
                  { rank: 2, name: "FameFinder", predictions: 32, success: 84, profit: "18.7 ETH" },
                  { rank: 3, name: "TalentSpotter", predictions: 28, success: 82, profit: "15.2 ETH" },
                  { rank: 4, name: "NextBigThing", predictions: 41, success: 78, profit: "12.8 ETH" },
                  { rank: 5, name: "RisingStarHunter", predictions: 35, success: 76, profit: "11.3 ETH" }
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        user.rank === 1 ? 'bg-yellow-600' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-orange-600' : 'bg-purple-600'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.predictions} predictions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400">{user.profit}</p>
                      <p className="text-sm text-gray-400">{user.success}% success</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}