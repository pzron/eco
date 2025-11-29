import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Sparkles, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getSubtotal, getShipping, getTax, getTotal, getItemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f] border-l border-white/10 z-50 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
            
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Your Cart</h2>
                    <p className="text-sm text-white/50">{getItemCount()} items</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-white/70"
                  onClick={() => setIsOpen(false)}
                  data-testid="close-cart"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-white/30" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                  <p className="text-white/50 text-sm mb-6">Add items to get started</p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    data-testid="continue-shopping"
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                      data-testid={`cart-item-${item.product.id}`}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate">{item.product.name}</h3>
                          
                          <div className="flex items-center gap-2 mt-1">
                            {item.product.selectedColor && (
                              <div 
                                className="w-3 h-3 rounded-full border border-white/20"
                                style={{ backgroundColor: item.product.selectedColor }}
                              />
                            )}
                            {item.product.selectedSize && (
                              <span className="text-xs text-white/50">{item.product.selectedSize}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white/70"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                data-testid={`decrease-quantity-${item.product.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white/70"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                data-testid={`increase-quantity-${item.product.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-white font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              {item.product.originalPrice && (
                                <div className="text-xs text-white/40 line-through">
                                  ${(item.product.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-400 transition-all"
                          onClick={() => removeItem(item.product.id)}
                          data-testid={`remove-item-${item.product.id}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="relative p-6 border-t border-white/10 space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Free shipping on orders over $100!</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>{getShipping() === 0 ? <span className="text-green-400">Free</span> : `$${getShipping().toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax (8%)</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]"
                      data-testid="checkout-button"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="outline"
                      className="w-full h-11 border-white/20 text-white hover:bg-white/10 rounded-xl"
                      data-testid="view-cart-button"
                    >
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
