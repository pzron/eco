import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CreditCard, Wallet, Lock, Check, Truck, MapPin, User, Mail, Phone, Home, Gift, Clock, AlertCircle, Zap, ShieldCheck, ChevronRight, MapPinIcon } from "lucide-react";
import { Link } from "wouter";

interface CheckoutStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
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
    billingAddress: "same",
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
        return formData.paymentMethod === "crypto" || (formData.cardNumber && formData.cardExpiry && formData.cardCVC);
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
  };

  const steps: CheckoutStep[] = [
    { id: "contact", title: "Contact", icon: <Mail className="w-5 h-5" />, completed: completedSteps.includes("step-1") },
    { id: "shipping", title: "Shipping", icon: <MapPin className="w-5 h-5" />, completed: completedSteps.includes("step-2") },
    { id: "payment", title: "Payment", icon: <CreditCard className="w-5 h-5" />, completed: completedSteps.includes("step-3") },
    { id: "review", title: "Review", icon: <Check className="w-5 h-5" />, completed: completedSteps.includes("step-4") },
  ];

  const total = 2053.76;

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
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" /> Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        <option className="bg-slate-900">United States</option>
                        <option className="bg-slate-900">Canada</option>
                        <option className="bg-slate-900">Mexico</option>
                        <option className="bg-slate-900">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Truck className="w-4 h-4" /> Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      placeholder="Leave at door, ring doorbell twice, etc."
                      rows={3}
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    />
                  </div>
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
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-primary" /> Payment Method
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { id: "card", label: "Credit/Debit Card", icon: <CreditCard className="w-5 h-5" /> },
                      { id: "crypto", label: "Cryptocurrency", icon: <Wallet className="w-5 h-5" /> },
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.paymentMethod === method.id
                            ? "bg-primary/20 border-primary"
                            : "bg-black/40 border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {method.icon}
                          <span className="text-sm font-semibold text-white">{method.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4111 1111 1111 1111"
                        maxLength={19}
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-white mb-2 block">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-white mb-2 block">CVC</label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "crypto" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30"
                  >
                    <p className="text-sm text-blue-200">
                      You will be able to select your preferred cryptocurrency during the next step. We accept Bitcoin, Ethereum, and Litecoin.
                    </p>
                  </motion.div>
                )}

                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Add Gift Message (Optional)
                  </label>
                  <textarea
                    name="giftMessage"
                    value={formData.giftMessage}
                    onChange={handleInputChange}
                    placeholder="Write a special message for the recipient..."
                    rows={3}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="text-white font-semibold">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="text-white font-semibold">{formData.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-primary" /> Shipping Address
                  </h3>
                  <div className="text-sm text-white space-y-1">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                  </h3>
                  <p className="text-white font-semibold">
                    {formData.paymentMethod === "card" ? "Credit/Debit Card" : "Cryptocurrency"}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-3xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Check className="w-6 h-6 text-green-400" />
                    </motion.div>
                    <span className="text-green-400 font-semibold">Ready to complete your order</span>
                  </div>
                  <p className="text-sm text-green-300">
                    Review your information above and click "Place Order" to complete your purchase securely.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Status Indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-block mb-4"
                    >
                      <Zap className="w-8 h-8 text-primary" />
                    </motion.div>
                    <p className="text-white font-bold text-lg mb-2">
                      {orderStatus === "processing" && "Processing Payment..."}
                      {orderStatus === "confirmed" && "Order Confirmed!"}
                      {orderStatus === "shipped" && "Preparing Shipment..."}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {orderStatus === "processing" && "Please don't close this window"}
                      {orderStatus === "confirmed" && "Your payment has been received"}
                      {orderStatus === "shipped" && "Your order is being prepared"}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
              )}
              {currentStep < 4 && (
                <Button
                  onClick={handleNextStep}
                  disabled={!validateStep(currentStep)}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Next <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              {currentStep === 4 && (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
                >
                  {isProcessing ? "Processing..." : "Place Order"} <Check className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 pb-4 border-b border-white/10">
                  {[
                    { name: "iPhone 15 Pro Max", qty: 1, price: 1199 },
                    { name: "Sony WH-1000X...", qty: 2, price: 349 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.name} x {item.qty}
                      </span>
                      <span className="text-white font-semibold">${item.price * item.qty}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-b border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-white">${1897}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-400 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="text-white">${4.99}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-white">${151.76}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <h3 className="text-sm font-bold text-white">Security</h3>
                <div className="space-y-2">
                  {[
                    { icon: <ShieldCheck className="w-4 h-4" />, text: "SSL Encrypted" },
                    { icon: <Lock className="w-4 h-4" />, text: "Secure Payment" },
                    { icon: <Truck className="w-4 h-4" />, text: "Insured Delivery" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-primary">{item.icon}</span>
                      <span className="text-xs text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-2xl p-5">
                <p className="text-xs text-blue-200 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span><span className="font-bold">Estimated Delivery:</span> Dec 2-3, 2025</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
