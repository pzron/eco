import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, Mail, Zap, Wallet } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";

export default function SignUpPage() {
  const [, navigate] = useLocation();
  const { signup, login, loginWithGoogle, loginWithWeb3 } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (isLogin) {
        login(email, password);
      } else {
        signup(email, password, `${firstName} ${lastName}`);
      }
      setIsLoading(false);
      navigate("/");
    }, 500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle("Google User", email || "user@gmail.com", "https://api.dicebear.com/7.x/avataaars/svg?seed=google");
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  const handleWeb3Auth = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockWallet = `0x${Math.random().toString(16).substr(2, 40)}`;
      loginWithWeb3(mockWallet, "Web3 User");
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-foreground flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
        <motion.div animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 flex items-center justify-center relative z-10 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left Side - Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer mb-8">
                <img src="/attached_assets/logo.png" alt="NexCommerce" className="h-8 w-8" />
                <span className="font-heading font-bold text-xl tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NexCommerce
                </span>
              </motion.div>
            </Link>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h1 className="text-4xl font-bold text-white mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
              <p className="text-white/60 mb-8">{isLogin ? "Access your NexCommerce account" : "Join millions shopping the future"}</p>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  {[{ state: firstName, set: setFirstName, label: "First Name", placeholder: "John" }, { state: lastName, set: setLastName, label: "Last Name", placeholder: "Doe" }].map((field) => (
                    <div key={field.label} className="space-y-1.5">
                      <Label className="text-xs text-white/70">{field.label}</Label>
                      <motion.input type="text" placeholder={field.placeholder} value={field.state} onChange={(e) => field.set(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all" whileFocus={{ scale: 1.02 }} />
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">Email Address</Label>
                <motion.input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all" whileFocus={{ scale: 1.02 }} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">Password</Label>
                <motion.input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all" whileFocus={{ scale: 1.02 }} />
              </div>

              <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 rounded-lg text-white font-semibold flex items-center justify-center gap-2 mt-6 transition-all">
                {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <><ArrowRight className="w-5 h-5" /> {isLogin ? "Sign In" : "Create Account"}</> }
              </motion.button>
            </motion.form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center"><span className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-2 text-xs uppercase text-white/50">Or continue with</span></div>
            </div>

            <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <motion.button type="button" onClick={handleGoogleAuth} disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-2 h-11 border border-white/20 bg-white/5 hover:bg-white/10 disabled:opacity-50 rounded-lg text-white font-medium transition-all">
                <Mail className="w-4 h-4" /> Google
              </motion.button>
              <motion.button type="button" onClick={handleWeb3Auth} disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-2 h-11 border border-white/20 bg-white/5 hover:bg-white/10 disabled:opacity-50 rounded-lg text-white font-medium transition-all">
                <Wallet className="w-4 h-4" /> Web3
              </motion.button>
            </motion.div>

            <motion.p className="text-center text-sm text-white/60 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <motion.button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-secondary font-semibold transition-colors">
                {isLogin ? "Sign Up" : "Sign In"}
              </motion.button>
            </motion.p>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hidden lg:flex flex-col items-center justify-center text-center">
            <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative mb-8">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-30" />
              <img src="https://public.readdy.ai/ai/img_res/3ecb9515515c5565557f3118f811827c.jpg" alt="Feature" className="w-72 h-72 object-contain rounded-3xl border border-white/10 relative z-10 shadow-2xl" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-3">
              {isLogin ? "Welcome to NexCommerce" : "Unlock the Future"}
            </h2>
            <p className="text-white/70 max-w-md mb-6">
              {isLogin ? "Sign in with your email, Google, or Web3 wallet to continue." : "Join the future of shopping with 3D customization, AI-powered deals, and Web3 integration."}
            </p>

            <motion.div className="flex gap-3 justify-center text-xs text-white/60">
              {["3D Products", "AI Deals", "Web3 Ready"].map((feature) => (
                <motion.div key={feature} whileHover={{ scale: 1.1 }} className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-primary" /> {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
