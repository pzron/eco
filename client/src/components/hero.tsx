import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Box, Star, Headset, Globe } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="text-xs md:text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI-Powered Personalization • Real-Time 3D Visualization • Web3 Integration
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white mb-6 max-w-5xl"
        >
          The Future of Shopping <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Starts Here
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
        >
          Everything You Need, One Click Away
          <br />
          <span className="text-white/80 italic">"Your Cart, Your Rules, Feel Better"</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-105">
            Explore Products <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105">
            Get Started
          </Button>
        </motion.div>

        {/* Floating 3D Elements (Simulated with Icons/Cards) */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] hidden lg:block glass-card p-4 rounded-2xl rotate-12"
        >
          <Box className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[10%] hidden lg:block glass-card p-4 rounded-2xl -rotate-12"
        >
          <Globe className="w-12 h-12 text-secondary" />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl"
        >
          <StatsCard icon={Box} value="350+" label="Products" color="text-primary" />
          <StatsCard icon={Star} value="4.9/5" label="Rating" color="text-yellow-400" />
          <StatsCard icon={Headset} value="24/7" label="Support" color="text-green-400" />
          <StatsCard icon={Globe} value="Web3" label="Enabled" color="text-blue-400" />
        </motion.div>
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
      <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-2xl font-bold font-heading text-white">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
