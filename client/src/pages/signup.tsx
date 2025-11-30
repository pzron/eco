import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, Mail, Wallet, Eye, EyeOff, Check, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { isValidEmail, isValidPhone, validatePassword, connectWeb3Wallet } from "@/lib/validation";

export default function SignUpPage() {
  const [, navigate] = useLocation();
  const { signup, login, loginWithGoogle, loginWithWeb3 } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const passwordValidation = validatePassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate email
    const emailValidation = isValidEmail(email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error || 'Invalid email';
    }

    // Validate phone if provided
    if (phone && !isLogin) {
      const phoneValidation = isValidPhone(phone);
      if (!phoneValidation.valid) {
        newErrors.phone = phoneValidation.error || 'Invalid phone';
      }
    }

    // Validate password for signup
    if (!isLogin && !passwordValidation.valid) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      if (isLogin) {
        login(email, password);
      } else {
        signup(email, password, `${firstName} ${lastName}`);
      }
      setIsLoading(false);
      navigate("/");
    }, 600);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // Real Google OAuth would integrate with Google Sign-In library
      // For demonstration, we simulate the flow
      const name = "Google User";
      const googleEmail = email || "user@gmail.com";
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=google-${Date.now()}`;

      // In production, you would:
      // 1. Load Google Sign-In SDK
      // 2. Call google.accounts.id.initialize()
      // 3. Handle the callback with actual user data
      
      loginWithGoogle(name, googleEmail, avatar);
      navigate("/");
    } catch (error) {
      console.error('Google auth failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeb3Auth = async () => {
    setIsLoading(true);
    try {
      // Real Web3 wallet connection
      const walletData = await connectWeb3Wallet();
      if (walletData) {
        loginWithWeb3(walletData.address, walletData.name);
        navigate("/");
      } else {
        setErrors({ web3: 'Failed to connect wallet. Please ensure MetaMask is installed.' });
      }
    } catch (error) {
      console.error('Web3 auth failed:', error);
      setErrors({ web3: 'Wallet connection failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-40 -right-40 w-80 h-80 bg-primary/15 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1.08, 1, 1.08] }} transition={{ duration: 14, repeat: Infinity, delay: 2 }} className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 flex items-center justify-center relative z-10 min-h-screen py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md backdrop-blur-2xl bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 md:p-10 shadow-2xl"
        >
          {/* Logo */}
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer mb-8 justify-center">
              <img src="/attached_assets/logo.png" alt="NexCommerce" className="h-7 w-7" />
              <span className="font-heading font-bold text-lg tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NexCommerce
              </span>
            </motion.div>
          </Link>

          {/* Heading */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-1">
              {isLogin ? "Welcome Back" : "Secure Account"}
            </h1>
            <p className="text-sm text-white/50">
              {isLogin ? "Access your platform" : "Create your account"}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/60 font-medium">First Name</Label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/60 font-medium">Last Name</Label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs text-white/60 font-medium">Email Address</Label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }} 
                required 
                className={`w-full bg-white/[0.05] border rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/[0.08] transition-all text-sm ${
                  errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.08] focus:border-primary/50'
                }`}
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <Label className="text-xs text-white/60 font-medium">Phone Number</Label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                  value={phone} 
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }} 
                  className={`w-full bg-white/[0.05] border rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/[0.08] transition-all text-sm ${
                    errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.08] focus:border-primary/50'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs text-white/60 font-medium">Password</Label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }} 
                  required 
                  className={`w-full bg-white/[0.05] border rounded-lg px-3 py-2.5 pr-10 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/[0.08] transition-all text-sm ${
                    errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.08] focus:border-primary/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}

              {!isLogin && password && (
                <div className="mt-2 space-y-1.5">
                  <div className="text-xs text-white/50">Password requirements:</div>
                  <div className="space-y-1">
                    {[
                      { label: '8+ characters', valid: password.length >= 8 },
                      { label: 'Uppercase letter', valid: /[A-Z]/.test(password) },
                      { label: 'Lowercase letter', valid: /[a-z]/.test(password) },
                      { label: 'Number', valid: /[0-9]/.test(password) },
                      { label: 'Special character', valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
                    ].map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {req.valid ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <X className="w-3 h-3 text-white/30" />
                        )}
                        <span className={req.valid ? 'text-green-400' : 'text-white/40'}>{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button 
              type="submit" 
              disabled={isLoading || (!isLogin && !passwordValidation.valid)} 
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.99 }} 
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold flex items-center justify-center gap-2 mt-6 transition-all text-sm"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  {isLogin ? "Sign In" : "Create Account"}
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-2 text-xs text-white/40">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <motion.button 
              type="button" 
              onClick={handleGoogleAuth} 
              disabled={isLoading} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="flex items-center justify-center gap-2 h-10 border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-50 rounded-lg text-white font-medium transition-all text-sm"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Google</span>
            </motion.button>
            <motion.button 
              type="button" 
              onClick={handleWeb3Auth} 
              disabled={isLoading} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="flex items-center justify-center gap-2 h-10 border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-50 rounded-lg text-white font-medium transition-all text-sm"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Web3</span>
            </motion.button>
          </motion.div>

          {errors.web3 && <p className="text-xs text-red-400 text-center mt-2">{errors.web3}</p>}

          {/* Footer */}
          <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <p className="text-sm text-white/50">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <motion.button 
                type="button" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setPassword("");
                }} 
                className="text-primary hover:text-secondary font-semibold transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
