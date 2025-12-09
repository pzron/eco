import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ShoppingBag, Heart, CreditCard, MapPin, Bell, Settings,
  Package, Star, TrendingUp, Gift, Clock, ChevronRight,
  Wallet, Award, Shield, User
} from "lucide-react";

const recentOrders = [
  { id: "ORD-7291", product: "iPhone 15 Pro Max", date: "Dec 5, 2024", status: "delivered", amount: "৳142,999", image: "📱" },
  { id: "ORD-7288", product: "AirPods Pro 2", date: "Dec 3, 2024", status: "shipped", amount: "৳29,999", image: "🎧" },
  { id: "ORD-7285", product: "MacBook Air M3", date: "Nov 28, 2024", status: "processing", amount: "৳134,999", image: "💻" },
];

const wishlistItems = [
  { name: "Apple Watch Ultra 2", price: "৳89,999", discount: "5% OFF", image: "⌚" },
  { name: "Sony WH-1000XM5", price: "৳34,999", discount: "10% OFF", image: "🎧" },
  { name: "iPad Pro 12.9", price: "৳129,999", discount: null, image: "📱" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <Badge className={`${styles[status]} border`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function DashboardCard({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      <div className="relative group h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-purple-500/5 to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              My Dashboard
            </h1>
            <p className="text-white/60">Welcome back! Manage your orders, wishlist, and account settings</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: ShoppingBag, label: "Total Orders", value: "24", color: "purple" },
              { icon: Heart, label: "Wishlist", value: "12", color: "pink" },
              { icon: Award, label: "Reward Points", value: "2,450", color: "yellow" },
              { icon: Wallet, label: "Wallet Balance", value: "৳5,000", color: "green" },
            ].map((stat, i) => (
              <DashboardCard key={stat.label} delay={i * 0.1}>
                <div className="p-4 md:p-6">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <p className="text-sm text-white/60 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </DashboardCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard className="lg:col-span-2" delay={0.4}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Package className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                      <p className="text-sm text-white/60">Your latest purchases</p>
                    </div>
                  </div>
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentOrders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">
                          {order.image}
                        </div>
                        <div>
                          <p className="font-medium text-white">{order.product}</p>
                          <p className="text-sm text-white/60">{order.id} • {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white mb-1">{order.amount}</p>
                        <StatusBadge status={order.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </DashboardCard>

            <DashboardCard delay={0.5}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Wishlist</h3>
                    <p className="text-sm text-white/60">Items you love</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {wishlistItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-lg">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">{item.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-400">{item.price}</span>
                          {item.discount && (
                            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                              {item.discount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0">
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <Link href="/wishlist">
                  <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    View All Wishlist
                  </Button>
                </Link>
              </div>
            </DashboardCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: User, label: "Profile Settings", desc: "Update your info", href: "/profile", color: "cyan" },
              { icon: MapPin, label: "Addresses", desc: "Manage delivery addresses", href: "/profile", color: "green" },
              { icon: CreditCard, label: "Payment Methods", desc: "Cards & wallets", href: "/profile", color: "orange" },
              { icon: Bell, label: "Notifications", desc: "Manage alerts", href: "/profile", color: "purple" },
            ].map((item, i) => (
              <DashboardCard key={item.label} delay={0.7 + i * 0.1}>
                <Link href={item.href}>
                  <div className="p-5 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </div>
                </Link>
              </DashboardCard>
            ))}
          </div>

          <DashboardCard className="mt-8" delay={0.9}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Gift className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Rewards & Offers</h3>
                  <p className="text-sm text-white/60">Exclusive deals just for you</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "10% OFF Electronics", code: "TECH10", expires: "Dec 31", color: "from-purple-500 to-pink-500" },
                  { title: "Free Shipping", code: "FREESHIP", expires: "Dec 25", color: "from-cyan-500 to-blue-500" },
                  { title: "৳500 Cashback", code: "CASH500", expires: "Dec 20", color: "from-green-500 to-emerald-500" },
                ].map((offer, i) => (
                  <motion.div
                    key={offer.code}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className={`p-4 rounded-xl bg-gradient-to-r ${offer.color} relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <h4 className="font-bold text-white mb-1">{offer.title}</h4>
                    <p className="text-white/80 text-sm mb-2">Use code: <span className="font-mono font-bold">{offer.code}</span></p>
                    <div className="flex items-center gap-1 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Expires {offer.expires}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
