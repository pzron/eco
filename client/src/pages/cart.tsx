import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Wallet, Truck, Gift, Zap, Package, Tag, Check, Clock, Shield, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[3], quantity: 2 }
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(index);
      return;
    }
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(10);
    } else if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const deliveryFee = deliveryOption === "express" ? 14.99 : (afterDiscount > 100 ? 0 : 9.99);
  const insurance = 4.99;
  const tax = Math.round((afterDiscount + deliveryFee) * 0.08 * 100) / 100;
  const total = afterDiscount + deliveryFee + insurance + tax;

  // Animation variants
  const productDropVariants = (index: number) => ({
    hidden: { opacity: 0, y: -400, x: 0 },
    drop: {
      opacity: 1,
      y: 0,
      x: (Math.random() - 0.5) * 100,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
      },
    },
  });

  const bucketVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: Math.max(cartItems.length * 0.15, 0.6) + 0.2,
        duration: 0.5,
      },
    },
    bounce: {
      y: [0, -12, 0],
      transition: {
        duration: 0.4,
        delay: Math.max(cartItems.length * 0.15, 0.6) + 0.7,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-heading font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6 text-lg">Your cart is empty</p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE - PRODUCTS & ANIMATION (50%) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Products List */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="hidden sm:grid grid-cols-5 gap-3 p-4 bg-gradient-to-r from-white/5 to-transparent border-b border-white/10">
                  <div className="col-span-2 text-xs font-bold text-muted-foreground uppercase">Product</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Price</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Qty</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase text-right">Total</div>
                </div>

                <div className="max-h-[500px] overflow-y-auto">
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group"
                    >
                      {/* Product Image & Name */}
                      <div className="sm:col-span-2 flex gap-3 items-center min-w-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-2 flex-shrink-0 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-colors">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block text-sm">
                        <span className="text-white font-semibold">${item.price.toLocaleString()}</span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-xs text-muted-foreground">Qty:</span>
                        <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 rounded hover:bg-white/20 text-white p-0"
                            onClick={() => updateQuantity(i, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white font-bold w-5 text-center text-xs">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 rounded hover:bg-white/20 text-white p-0"
                            onClick={() => updateQuantity(i, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Total & Delete */}
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <span className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-red-400 h-6 w-6 hover:bg-red-400/10 flex-shrink-0"
                          onClick={() => removeItem(i)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drop Animation */}
              {hasAnimated && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative h-72 bg-gradient-to-b from-purple-500/10 to-pink-500/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-50" />
                  
                  {/* Dropping Products */}
                  <div className="relative w-full h-full flex items-start justify-center pt-4">
                    {cartItems.map((item, i) => (
                      <motion.div
                        key={`drop-${item.id}`}
                        variants={productDropVariants(i)}
                        initial="hidden"
                        animate="drop"
                        className="absolute"
                      >
                        <div className="w-14 h-14 bg-white rounded-lg p-2 flex items-center justify-center shadow-2xl shadow-purple-500/40 border border-white">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bucket */}
                  <motion.div 
                    className="absolute bottom-4 flex items-end justify-center w-full pointer-events-none"
                    variants={bucketVariants}
                    initial="hidden"
                    animate={["visible", "bounce"]}
                  >
                    <div className="w-32 h-24 bg-gradient-to-b from-purple-600 to-pink-600 rounded-b-2xl shadow-2xl shadow-purple-500/50 border-4 border-purple-500 flex items-center justify-center overflow-hidden">
                      <div className="absolute -top-5 left-3 right-3 h-8 border-4 border-purple-500 rounded-t-full" />
                      <div className="text-center z-10">
                        <Truck className="w-6 h-6 text-white mx-auto mb-0.5" />
                        <p className="text-white font-bold text-xs">Ready</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* RIGHT SIDE - ORDER SUMMARY (50%) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="sticky top-24 space-y-4">
                {/* Promo Code */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
                  <label className="text-xs font-bold text-muted-foreground mb-3 block">APPLY PROMO CODE</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="SAVE10 or SAVE20"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                    />
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={applyPromo}
                    >
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  {discount > 0 && (
                    <motion.p 
                      className="text-xs text-green-400 mt-2 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Check className="w-4 h-4" /> {discount}% discount applied!
                    </motion.p>
                  )}
                </div>

                {/* Delivery Options */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-400" /> Delivery
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setDeliveryOption("standard")}
                      className={`w-full p-3 rounded-lg border transition-all text-left text-xs ${
                        deliveryOption === "standard"
                          ? "bg-primary/20 border-primary"
                          : "bg-white/5 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Standard</span>
                        <span className={deliveryOption === "standard" ? "text-primary font-bold" : "text-white font-bold"}>{afterDiscount > 100 ? "FREE" : "$9.99"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">2-5 days</p>
                    </button>
                    <button
                      onClick={() => setDeliveryOption("express")}
                      className={`w-full p-3 rounded-lg border transition-all text-left text-xs ${
                        deliveryOption === "express"
                          ? "bg-primary/20 border-primary"
                          : "bg-white/5 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Express</span>
                        <span className={deliveryOption === "express" ? "text-secondary font-bold" : "text-white font-bold"}>$14.99</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Next day</p>
                    </button>
                  </div>
                </div>

                {/* Order Summary Box */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
                  <h2 className="text-lg font-bold text-white">Order Summary</h2>

                  <div className="space-y-3 pb-4 border-b border-white/10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-sm bg-green-500/10 p-2 rounded border border-green-500/20">
                        <span className="text-green-400 font-semibold">Discount ({discount}%)</span>
                        <span className="text-green-400 font-bold">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className={deliveryFee === 0 ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                        {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Insurance</span>
                      <span className="text-white font-semibold">${insurance.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground">PAYMENT METHOD</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                        paymentMethod === "card"
                          ? "bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("crypto")}
                      className={`p-3 rounded-lg border transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                        paymentMethod === "crypto"
                          ? "bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30"
                      }`}
                    >
                      <Wallet className="w-4 h-4" /> Crypto
                    </button>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-xs text-blue-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span><span className="font-bold">Est. Delivery:</span> {deliveryOption === "express" ? "Tomorrow" : "Dec 2-3, 2025"}</span>
                  </p>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-xl shadow-primary/30 font-bold">
                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <RefreshCw className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-muted-foreground">30-Day Return</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
