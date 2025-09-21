import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrendingUp, Clock, Star, Users } from 'lucide-react';

export function FeaturedCreators() {
  const creators = [
    {
      id: 1,
      name: "Kwame Asante",
      title: "Afrobeat Producer",
      description: "Creating the next generation of African music. 3 years of experience, working with emerging artists.",
      image: "https://images.unsplash.com/photo-1571990455341-c06400a41071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0aXN0JTIwbXVzaWMlMjBjcmVhdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM5ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.05 ETH",
      timePrice: "0.001 ETH/hr",
      totalBonds: 1000,
      available: 750,
      growth: "+23%",
      category: "Music",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "AI Researcher",
      description: "PhD candidate developing breakthrough ML algorithms. Published 5 papers, working on autonomous systems.",
      image: "https://images.unsplash.com/photo-1562583616-e8a045ed56e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMHN0YXJ0dXAlMjBmb3VuZGVyfGVufDF8fHx8MTc1ODM5ODk0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.08 ETH",
      timePrice: "0.002 ETH/hr",
      totalBonds: 500,
      available: 200,
      growth: "+45%",
      category: "Tech",
      verified: true
    },
    {
      id: 3,
      name: "Maya Rodriguez",
      title: "Digital Artist",
      description: "Visual storyteller creating immersive digital experiences. Featured in 3 galleries, growing Instagram following.",
      image: "https://images.unsplash.com/photo-1740663173325-c3000e33c830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRlciUyMGFydGlzdCUyMGZlbWFsZXxlbnwxfHx8fDE3NTgzOTg5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.03 ETH",
      timePrice: "0.0008 ETH/hr",
      totalBonds: 800,
      available: 600,
      growth: "+12%",
      category: "Art",
      verified: false
    },
    {
      id: 4,
      name: "David Kim",
      title: "Blockchain Developer",
      description: "Building the future of DeFi. 2 successful protocol launches, strong community following.",
      image: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcGVyJTIwY29kaW5nJTIwcHJvZ3JhbW1lcnxlbnwxfHx8fDE3NTgzOTg5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bondPrice: "0.12 ETH",
      timePrice: "0.003 ETH/hr",
      totalBonds: 300,
      available: 50,
      growth: "+67%",
      category: "Blockchain",
      verified: true
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
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Featured Creators</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover emerging talent before they become household names
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                    <span className="text-white">{creator.available}/{creator.totalBonds}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Invest
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
            View All Creators <Users className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}