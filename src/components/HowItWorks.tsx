import { motion } from 'motion/react';
import { Card } from './ui/card';
import { ArrowRight, UserPlus, DollarSign, TrendingUp } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Life Bond",
      description: "Mint your Life Bond representing your time, skills, or future achievements. Set your hourly rate and milestones.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: DollarSign,
      title: "Investors Buy",
      description: "Investors discover and back promising individuals by purchasing Time Tokens or Life Bonds.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Bonds Trade",
      description: "As your reputation and achievements grow, your bonds increase in value and trade on the marketplace.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to start trading human potential
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-8 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-center relative">
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-xl mb-4">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </Card>
                </motion.div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
            <p className="text-purple-200">
              💡 <strong>Pro Tip:</strong> Early investors in rising talent earn the highest returns. 
              The key is spotting potential before it's obvious.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}