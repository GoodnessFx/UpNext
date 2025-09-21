import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Filter, TrendingUp, Clock, Star, Users, ArrowUpDown } from 'lucide-react';

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [filterCategory, setFilterCategory] = useState('all');

  const listings = [
    {
      id: 1,
      name: "Amara Okafor",
      title: "Music Producer",
      description: "Specializing in Afrobeats fusion. Worked with 15+ artists, growing fanbase.",
      image: "https://images.unsplash.com/photo-1571990455341-c06400a41071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0aXN0JTIwbXVzaWMlMjBjcmVhdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM5ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.045 ETH",
      timePrice: "0.0012 ETH/hr",
      available: 450,
      total: 1000,
      growth: "+34%",
      category: "Music",
      verified: true,
      trending: true
    },
    {
      id: 2,
      name: "Elena Vasquez",
      title: "AI Research Scientist",
      description: "PhD in Machine Learning, published researcher, startup founder.",
      image: "https://images.unsplash.com/photo-1562583616-e8a045ed56e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMHN0YXJ0dXAlMjBmb3VuZGVyfGVufDF8fHx8MTc1ODM5ODk0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.089 ETH",
      timePrice: "0.0025 ETH/hr",
      available: 120,
      total: 500,
      growth: "+67%",
      category: "Tech",
      verified: true,
      trending: true
    },
    {
      id: 3,
      name: "Marcus Johnson",
      title: "Digital Artist",
      description: "NFT artist and motion graphics designer. Featured in major exhibitions.",
      image: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcGVyJTIwY29kaW5nJTIwcHJvZ3JhbW1lcnxlbnwxfHx8fDE3NTgzOTg5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.032 ETH",
      timePrice: "0.0009 ETH/hr",
      available: 680,
      total: 800,
      growth: "+18%",
      category: "Art",
      verified: false,
      trending: false
    },
    {
      id: 4,
      name: "Sofia Chen",
      title: "Blockchain Developer",
      description: "Smart contract specialist, DeFi protocol builder, security auditor.",
      image: "https://images.unsplash.com/photo-1740663173325-c3000e33c830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRlciUyMGFydGlzdCUyMGZlbWFsZXxlbnwxfHx8fDE3NTgzOTg5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.125 ETH",
      timePrice: "0.0035 ETH/hr",
      available: 25,
      total: 300,
      growth: "+89%",
      category: "Blockchain",
      verified: true,
      trending: true
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Music: "from-purple-500 to-pink-500",
      Tech: "from-blue-500 to-cyan-500",
      Art: "from-pink-500 to-orange-500",
      Blockchain: "from-green-500 to-blue-500"
    };
    return colors[category] || "from-gray-500 to-gray-600";
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
          <h1 className="text-3xl md:text-4xl mb-4">Marketplace</h1>
          <p className="text-xl text-gray-400">
            Discover and invest in the next generation of creators and innovators
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-purple-500/20 focus:border-purple-500/40"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 bg-gray-900/50 border-purple-500/20">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-900/50 border-purple-500/20">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="growth">Highest Growth</SelectItem>
              <SelectItem value="available">Most Available</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-purple-400">1,247</div>
            <div className="text-sm text-gray-400">Active Creators</div>
          </Card>
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-green-400">$2.4M</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </Card>
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-blue-400">8,432</div>
            <div className="text-sm text-gray-400">Bonds Minted</div>
          </Card>
          <Card className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
            <div className="text-lg text-pink-400">156K</div>
            <div className="text-sm text-gray-400">Hours Traded</div>
          </Card>
        </motion.div>

        {/* Creator Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 bg-gradient-to-b from-gray-900/80 to-black/80 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="relative mb-4">
                  <ImageWithFallback
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(creator.category)} text-white border-none`}>
                      {creator.category}
                    </Badge>
                    {creator.verified && (
                      <Badge className="bg-blue-600/80 text-white border-none">
                        <Star className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {creator.trending && (
                      <Badge className="bg-orange-600/80 text-white border-none">
                        🔥 Hot
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`px-2 py-1 rounded text-xs text-white ${
                      creator.growth.startsWith('+') ? 'bg-green-600/80' : 'bg-red-600/80'
                    }`}>
                      {creator.growth}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg mb-1">{creator.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{creator.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{creator.description}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Bond Price</span>
                    <span className="text-white">{creator.bondPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Time Price</span>
                    <span className="text-white">{creator.timePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Available</span>
                    <span className="text-white">{creator.available}/{creator.total}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${(creator.available / creator.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Buy Bond
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
            Load More Creators <Users className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}