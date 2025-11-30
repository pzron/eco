import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CreditCard, Wallet, Lock, Check, Truck, MapPin, User, Mail, Phone, Home, Gift, Clock, AlertCircle, Zap, ShieldCheck, ChevronRight, MapPinIcon, Smartphone, Banknote, PartyPopper } from "lucide-react";
import { Link, useLocation } from "wouter";

interface CheckoutStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("New York, NY");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    giftMessage: "",
    instructions: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.email && formData.firstName && formData.lastName && formData.phone;
      case 2:
        return formData.address && formData.city && formData.state && formData.zipCode;
      case 3:
        return formData.paymentMethod === "crypto" || formData.paymentMethod === "cod" || formData.paymentMethod === "banking" || (formData.cardNumber && formData.cardExpiry && formData.cardCVC);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps([...completedSteps, `step-${currentStep}`]);
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setOrderStatus("processing");

    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderStatus("confirmed");
    setCompletedSteps([...completedSteps, "step-4"]);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderStatus("shipped");

    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowSuccess(true);

    await new Promise(resolve => setTimeout(resolve, 3000));
    navigate("/");
  };

  const steps: CheckoutStep[] = [
    { id: "contact", title: "Contact", icon: <Mail className="w-5 h-5" />, completed: completedSteps.includes("step-1") },
    { id: "shipping", title: "Shipping", icon: <MapPin className="w-5 h-5" />, completed: completedSteps.includes("step-2") },
    { id: "payment", title: "Payment", icon: <CreditCard className="w-5 h-5" />, completed: completedSteps.includes("step-3") },
    { id: "review", title: "Review", icon: <Check className="w-5 h-5" />, completed: completedSteps.includes("step-4") },
  ];

  const mapLocations = [
    { name: "New York, NY", lat: 40.7128, lng: -74.0060, emoji: "🏙️" },
    { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, emoji: "☀️" },
    { name: "Chicago, IL", lat: 41.8781, lng: -87.6298, emoji: "🌆" },
    { name: "Houston, TX", lat: 29.7604, lng: -95.3698, emoji: "🤠" },
    { name: "Miami, FL", lat: 25.7617, lng: -80.1918, emoji: "🏖️" },
  ];

  const total = 2053.76;

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-center px-4"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <PartyPopper className="w-16 h-16 text-primary" />
          </motion.div>

          <h1 className="text-5xl font-heading font-bold text-white mb-4">Order Confirmed!</h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mb-2"
          >
            Thank you for your purchase
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-primary mb-8 font-semibold"
          >
            Order ID: #NX{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 max-w-md mx-auto"
          >
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="text-green-400 font-semibold">Dec 2-3, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="text-white font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-blue-400 font-semibold">Processing</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-muted-foreground mb-2"
          >
            Redirecting to home...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Secure Checkout</h1>
          <p className="text-muted-foreground text-sm">Complete your purchase safely and securely</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <motion.button
                  onClick={() => index < currentStep && setCurrentStep(index + 1)}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    index + 1 === currentStep
                      ? "bg-gradient-to-r from-primary to-secondary border-primary shadow-lg shadow-primary/30"
                      : step.completed
                      ? "bg-green-500/20 border-green-500"
                      : "bg-white/5 border-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.completed ? (
                    <Check className="w-6 h-6 text-green-400" />
                  ) : (
                    <span className={`text-sm font-bold ${index + 1 === currentStep ? "text-white" : "text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.button>

                {index < steps.length - 1 && (
                  <motion.div
                    className="flex-1 h-1 mx-2 rounded-full bg-white/10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index + 1 < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ originX: 0 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs md:text-sm">
            {steps.map(step => (
              <span key={step.id} className={`font-semibold ${step.completed || steps.indexOf(step) + 1 === currentStep ? "text-white" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" /> Contact Information
                </h2>

                <div className="space-y-4">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label className="text-sm font-semibold text-white mb-2 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label className="text-sm font-semibold text-white mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping Information with Map */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" /> Shipping Address
                </h2>

                {/* Location Selector with Map */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-black/40 border border-white/10 rounded-2xl p-4 cursor-pointer hover:border-white/30 transition-all"
                  onClick={() => setMapOpen(!mapOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Selected Location</p>
                        <p className="text-white font-semibold">{selectedLocation}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${mapOpen ? "rotate-90" : ""}`} />
                  </div>
                </motion.div>

                {/* Map Selector */}
                {mapOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3"
                  >
                    <p className="text-sm font-semibold text-white">Select Delivery Location</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mapLocations.map((loc, i) => (
                        <motion.button
                          key={loc.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => {
                            setSelectedLocation(loc.name);
                            setMapOpen(false);
                          }}
                          className={`p-3 rounded-lg border transition-all text-left text-sm ${
                            selectedLocation === loc.name
                              ? "bg-primary/20 border-primary"
                              : "bg-white/5 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <span className="text-lg mr-2">{loc.emoji}</span>
                          <span className="font-semibold">{loc.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <label className="text-sm font-semibold text-white mb-2 block">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="NY" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                    <label className="text-sm font-semibold text-white mb-2 block">Zip Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="10001" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Truck className="w-4 h-4" /> Delivery Instructions
                    </label>
                    <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} placeholder="Leave at door, ring doorbell twice, etc." rows={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" /> Payment Method
                </h2>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  {[
                    { id: "card", label: "Credit Card", icon: <CreditCard className="w-5 h-5" /> },
                    { id: "banking", label: "Mobile Banking", icon: <Smartphone className="w-5 h-5" /> },
                    { id: "crypto", label: "Crypto", icon: <Wallet className="w-5 h-5" /> },
                    { id: "cod", label: "Cash on Delivery", icon: <Banknote className="w-5 h-5" /> },
                  ].map((method, i) => (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.paymentMethod === method.id
                          ? "bg-primary/20 border-primary shadow-lg shadow-primary/30"
                          : "bg-black/40 border-white/20 hover:border-white/40"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {method.icon}
                        <span className="text-xs font-semibold text-white">{method.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Card Payment */}
                {formData.paymentMethod === "card" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="4111 1111 1111 1111" maxLength={19} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" maxLength={5} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                      <input type="text" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} placeholder="123" maxLength={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    </div>
                  </motion.div>
                )}

                {/* Mobile Banking */}
                {formData.paymentMethod === "banking" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 space-y-3">
                    <p className="text-sm font-semibold text-blue-200">📱 Mobile Banking Payment</p>
                    <p className="text-xs text-blue-300">You will receive a payment link on your registered mobile number. Complete the payment through your bank's mobile app.</p>
                  </motion.div>
                )}

                {/* Cash on Delivery */}
                {formData.paymentMethod === "cod" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 space-y-3">
                    <p className="text-sm font-semibold text-green-200">💵 Cash on Delivery</p>
                    <p className="text-xs text-green-300">Pay directly to our delivery partner when your package arrives. A small convenience fee of $2.99 will be added.</p>
                  </motion.div>
                )}

                {/* Crypto */}
                {formData.paymentMethod === "crypto" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                    <p className="text-sm text-purple-200">We accept Bitcoin, Ethereum, and Litecoin. Payment instructions will be provided on the next screen.</p>
                  </motion.div>
                )}

                {/* Gift Message */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Add Gift Message
                  </label>
                  <textarea name="giftMessage" value={formData.giftMessage} onChange={handleInputChange} placeholder="Write a special message..." rows={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                {[
                  { title: "Contact", icon: <User className="w-5 h-5 text-primary" />, content: `${formData.firstName} ${formData.lastName} • ${formData.email}` },
                  { title: "Location", icon: <MapPinIcon className="w-5 h-5 text-primary" />, content: selectedLocation },
                  { title: "Payment", icon: <CreditCard className="w-5 h-5 text-primary" />, content: formData.paymentMethod === "card" ? "Credit Card" : formData.paymentMethod === "banking" ? "Mobile Banking" : formData.paymentMethod === "cod" ? "Cash on Delivery" : "Cryptocurrency" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      {item.icon} {item.title}
                    </h3>
                    <p className="text-white font-semibold">{item.content}</p>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Check className="w-6 h-6 text-green-400" />
                    </motion.div>
                    <span className="text-green-400 font-semibold">Ready to complete your order</span>
                  </div>
                  <p className="text-sm text-green-300">Click "Place Order" to complete your purchase securely.</p>
                </motion.div>
              </motion.div>
            )}

            {/* Status Indicator */}
            {isProcessing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <div className="text-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
                      <Zap className="w-8 h-8 text-primary" />
                    </motion.div>
                    <p className="text-white font-bold text-lg mb-2">
                      {orderStatus === "processing" && "Processing Payment..."}
                      {orderStatus === "confirmed" && "Order Confirmed!"}
                      {orderStatus === "shipped" && "Preparing Shipment..."}
                    </p>
                    <motion.div className="flex justify-center gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-primary rounded-full" />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <motion.button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}
              {currentStep < 4 && (
                <motion.button
                  onClick={handleNextStep}
                  disabled={!validateStep(currentStep)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
              {currentStep === 4 && (
                <motion.button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? "Processing..." : "Place Order"} <Check className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 pb-4 border-b border-white/10">
                  {[
                    { name: "iPhone 15 Pro Max", qty: 1, price: 1199 },
                    { name: "Sony WH-1000X...", qty: 2, price: 349 },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} x {item.qty}</span>
                      <span className="text-white font-semibold">${item.price * item.qty}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3 py-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-white">${1897}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-green-400 font-semibold">FREE</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Insurance</span><span className="text-white">${4.99}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span className="text-white">${151.76}</span></div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">${total.toFixed(2)}</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-2">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "SSL Encrypted" },
                  { icon: <Lock className="w-4 h-4" />, text: "Secure Payment" },
                  { icon: <Truck className="w-4 h-4" />, text: "Insured Delivery" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.05 }} className="flex items-center gap-3">
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
