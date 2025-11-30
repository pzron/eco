import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, Github, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";

export default function SignUpPage() {
  const [, navigate] = useLocation();
  const { signup, login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(email, password, `${firstName} ${lastName}`);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
        >
          {/* Left Side - Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
             <Link href="/">
               <div className="flex items-center gap-2 cursor-pointer mb-8">
                 <img src="/attached_assets/logo.png" alt="NexCommerce" className="h-8 w-8" />
                 <span className="font-heading font-bold text-xl tracking-wider text-white">
                   Nex<span className="text-primary">Commerce</span>
                 </span>
               </div>
             </Link>

             <h1 className="text-3xl font-bold text-white mb-2">
               {isLogin ? "Welcome Back" : "Create Account"}
             </h1>
             <p className="text-muted-foreground mb-8">
               {isLogin ? "Sign in to your account" : "Join the future of shopping today."}
             </p>

             <form onSubmit={handleSubmit} className="space-y-4">
               {!isLogin && (
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>First Name</Label>
                     <Input 
                       className="bg-white/5 border-white/10" 
                       placeholder="John" 
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       required
                     />
                   </div>
                   <div className="space-y-2">
                     <Label>Last Name</Label>
                     <Input 
                       className="bg-white/5 border-white/10" 
                       placeholder="Doe"
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                       required
                     />
                   </div>
                 </div>
               )}
               <div className="space-y-2">
                 <Label>Email</Label>
                 <Input 
                   className="bg-white/5 border-white/10" 
                   placeholder="john@example.com" 
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </div>
               <div className="space-y-2">
                 <Label>Password</Label>
                 <Input 
                   className="bg-white/5 border-white/10" 
                   placeholder="••••••••" 
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
               </div>

               <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-4">
                 {isLogin ? "Sign In" : "Sign Up"} <ArrowRight className="ml-2 w-5 h-5" />
               </Button>
             </form>

             <div className="relative my-6">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-muted-foreground">Or continue with</span></div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                   <Github className="mr-2 w-4 h-4" /> Github
                 </Button>
                 <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                   <Mail className="mr-2 w-4 h-4" /> Google
                 </Button>
               </div>
             </div>
             
             <p className="text-center text-sm text-muted-foreground mt-8">
               {isLogin ? "Don't have an account? " : "Already have an account? "}
               <span 
                 onClick={() => setIsLogin(!isLogin)}
                 className="text-primary hover:underline cursor-pointer"
               >
                 {isLogin ? "Sign Up" : "Sign In"}
               </span>
             </p>
          </div>

          {/* Right Side - Visual */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             
             <motion.div 
               animate={{ y: [0, -20, 0] }} 
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
             >
                <img 
                   src="https://public.readdy.ai/ai/img_res/3ecb9515515c5565557f3118f811827c.jpg" 
                   className="w-64 h-64 object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.5)] rounded-3xl"
                />
             </motion.div>
             
             <h2 className="text-2xl font-bold text-white mt-8 relative z-10">Unlock the Future</h2>
             <p className="text-white/70 mt-4 max-w-sm relative z-10">
               Get exclusive access to limited drops, 3D customization, and AI-powered deals.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
