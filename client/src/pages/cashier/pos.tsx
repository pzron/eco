import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Plus, Minus, Trash2, CreditCard, 
  Banknote, Smartphone, QrCode, User, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const products = [
  { id: 1, name: "iPhone 15 Pro", price: 145000, sku: "IPH-15P", image: "📱", category: "Electronics" },
  { id: 2, name: "AirPods Pro 2", price: 25000, sku: "APP-2", image: "🎧", category: "Electronics" },
  { id: 3, name: "MacBook Air", price: 120000, sku: "MBA-M3", image: "💻", category: "Electronics" },
  { id: 4, name: "Apple Watch", price: 45000, sku: "AW-9", image: "⌚", category: "Electronics" },
  { id: 5, name: "Nike Air Max", price: 12000, sku: "NAM-42", image: "👟", category: "Fashion" },
  { id: 6, name: "Smart TV 55\"", price: 85000, sku: "STV-55", image: "📺", category: "Electronics" },
  { id: 7, name: "Coffee Maker", price: 8500, sku: "CFM-01", image: "☕", category: "Home" },
  { id: 8, name: "Backpack Pro", price: 4500, sku: "BPP-01", image: "🎒", category: "Accessories" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CashierPOS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = () => {
    if (selectedPayment && cart.length > 0) {
      alert(`Transaction completed!\nTotal: ৳${total.toLocaleString()}\nPayment Method: ${selectedPayment}`);
      setCart([]);
      setSelectedPayment(null);
    }
  };

  return (
    <DashboardLayout role="cashier">
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search products or scan barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-green-500/50"
              />
            </div>
          </div>

          <Card className="flex-1 bg-white/5 border-white/10 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-green-400" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[calc(100%-4rem)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => addToCart(product)}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-500/30 cursor-pointer transition-all group"
                  >
                    <div className="text-4xl mb-3 text-center">{product.image}</div>
                    <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
                    <p className="text-xs text-white/40 mb-2">{product.sku}</p>
                    <p className="text-green-400 font-bold">৳{product.price.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-96 flex flex-col">
          <Card className="flex-1 bg-white/5 border-white/10 flex flex-col">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-green-400" />
                  Current Sale
                </CardTitle>
                <Badge className="bg-green-500/20 text-green-400">
                  {cart.length} items
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto py-4">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-white/40">
                    <div className="text-center">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No items in cart</p>
                      <p className="text-sm">Click products to add</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                      >
                        <span className="text-2xl">{item.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-xs text-white/60">৳{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-white/60"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-white font-medium">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-white/60"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-400"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </CardContent>

            <div className="border-t border-white/10 p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Tax (5%)</span>
                  <span className="text-white">৳{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-green-400">৳{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'cash', icon: Banknote, label: 'Cash' },
                  { id: 'card', icon: CreditCard, label: 'Card' },
                  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                  { id: 'qr', icon: QrCode, label: 'QR Pay' },
                ].map((method) => (
                  <Button
                    key={method.id}
                    variant="outline"
                    className={`flex-col h-auto py-3 ${
                      selectedPayment === method.id 
                        ? 'border-green-500 bg-green-500/20 text-green-400' 
                        : 'border-white/10 text-white/60'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <method.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{method.label}</span>
                  </Button>
                ))}
              </div>

              <Button 
                className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                disabled={cart.length === 0 || !selectedPayment}
                onClick={handleCheckout}
              >
                Complete Sale
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
