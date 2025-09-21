import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, TrendingUp, Clock, Star, Users } from 'lucide-react';
import { FeaturedCreators } from './FeaturedCreators';
import { StatsPanel } from './StatsPanel';
import { HowItWorks } from './HowItWorks';

const inspirationalQuotes = [
  "Back someone's future. Own a piece of their rise.",
  "Trade time like money.",
  "Imagine buying 10 hours of Burna Boy before fame.",
  "The next Steve Jobs is somewhere in Lagos but can't eat.",
  "The next Maya Angelou is writing poems by candlelight with no publishing.",
  "The next Tesla just buried their laptop because the landlord chased them out.",
  "Give people their flowers while they can smell them.",
  "Back people, not just products.",
  "The greatest startups are humans.",
  "Prevent the death of greatness.",
  "Poverty is not a measure of potential.",
  "FameChain — Predict who will be famous before they blow."
];

export function Landing() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Clock,
      title: "Life Bonds",
      description: "Mint tradeable tokens representing slices of your time, talent, or future value.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Time Tokens",
      description: "1 token = 1 hour of someone's future time. Trade hours like stocks.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Star,
      title: "Fame Predictions",
      description: "Predict who will blow up before they're famous. Early backers win big.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Time Vaults",
      description: "Creators build vaults that investors can back with collective funding.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-4 bg-purple-600/20 text-purple-400 border-purple-500/30">
              Stock Market for People
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              UpNext
            </h1>
          </motion.div>

          {/* Cycling Quotes */}
          <div className="h-32 md:h-40 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl md:text-2xl lg:text-3xl max-w-3xl leading-relaxed text-gray-200"
              >
                "{inspirationalQuotes[currentQuoteIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Start Investing <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
              Create Life Bond
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-4">What We Do</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform human potential into tradeable assets. Back people before they're famous.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Creators */}
      <FeaturedCreators />

      {/* Stats Panel */}
      <StatsPanel />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6">Ready to Change Lives?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join the revolution where human potential becomes the most valuable currency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Start Trading Lives
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}