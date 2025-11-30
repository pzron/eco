import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  User, Package, Heart, Award, Settings, 
  LogOut, MapPin, CreditCard, Clock, ChevronRight 
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please login first</h2>
          <Button 
            onClick={() => navigate("/signup")}
            className="bg-primary hover:bg-primary/90"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mx-auto mb-4">
                <img 
                  src={user?.avatar || "https://github.com/shadcn.png"} 
                  alt="User" 
                  className="w-full h-full rounded-full border-4 border-black"
                />
              </div>
              <h2 className="text-xl font-bold text-white">{user?.name || "User"}</h2>
              <p className="text-muted-foreground text-sm mb-4">{user?.email}</p>
              <Badge className="bg-primary/20 text-primary border-primary/20 mb-4">Platinum Member</Badge>
              
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-primary to-secondary w-[75%] h-full" />
              </div>
              <p className="text-xs text-muted-foreground">750 points to Diamond Tier</p>
            </motion.div>

            <nav className="space-y-2">
              {[
                { icon: Package, label: "Orders", active: true },
                { icon: Heart, label: "Wishlist" },
                { icon: Award, label: "Affiliate Program" },
                { icon: MapPin, label: "Addresses" },
                { icon: CreditCard, label: "Payment Methods" },
                { icon: Settings, label: "Settings" },
              ].map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={`w-full justify-start h-12 text-base ${
                    item.active 
                      ? "bg-white/10 text-white border border-white/5" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="mr-3 w-5 h-5" />
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full justify-start h-12 text-base text-red-400 hover:text-red-300 hover:bg-red-500/10"
                variant="ghost"
              >
                <LogOut className="mr-3 w-5 h-5" />
                Log Out
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-auto p-0 rounded-none gap-6">
                <TabsTrigger 
                  value="orders"
                  className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none text-lg"
                >
                  Order History
                </TabsTrigger>
                <TabsTrigger 
                  value="affiliate"
                  className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none text-lg"
                >
                  Affiliate Status
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-6 mt-6">
                {[
                  { id: "ORD-2024-001", date: "Today", status: "In Transit", total: "$47,298.00", items: 2 },
                  { id: "ORD-2023-892", date: "Nov 12, 2024", status: "Delivered", total: "$299.00", items: 1 },
                ].map((order, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden">
                      <CardHeader className="bg-white/5 border-b border-white/5 flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-base text-white">{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                             <div className="text-white font-bold">{order.total}</div>
                             <div className="text-xs text-muted-foreground">{order.items} items</div>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/10">
                            View Details
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="relative py-8">
                          {/* Order Timeline */}
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
                          <div className="relative flex justify-between">
                             {[
                               { label: "Order Placed", done: true },
                               { label: "Processing", done: true },
                               { label: "Shipped", done: order.status === "In Transit" || order.status === "Delivered" },
                               { label: "Delivered", done: order.status === "Delivered" },
                             ].map((step, j) => (
                               <div key={j} className="flex flex-col items-center gap-2 bg-background px-2 z-10">
                                 <div className={`w-4 h-4 rounded-full border-2 ${step.done ? "bg-primary border-primary" : "bg-background border-muted-foreground"}`} />
                                 <span className={`text-xs ${step.done ? "text-white" : "text-muted-foreground"}`}>{step.label}</span>
                               </div>
                             ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="affiliate" className="mt-6">
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">Become a NexCommerce Partner</h3>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                      Join our affiliate program and earn up to 15% commission on every sale you refer. 
                      Get access to exclusive marketing assets and a dedicated 3D dashboard.
                    </p>
                    <div className="flex justify-center gap-4">
                       <Button className="bg-primary hover:bg-primary/90 h-12 px-8">
                         Apply Now
                       </Button>
                       <Button variant="outline" className="border-white/10 h-12 px-8">
                         Learn More
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
