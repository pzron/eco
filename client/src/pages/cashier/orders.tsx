import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Clock, CheckCircle2, AlertCircle,
  Search, Filter, Eye, Truck
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const orders = [
  { id: "ORD-7291", customer: "Sarah Chen", items: 3, total: 12500, status: "ready", time: "2 min ago", type: "pickup" },
  { id: "ORD-7290", customer: "Mike Johnson", items: 5, total: 34500, status: "preparing", time: "8 min ago", type: "pickup" },
  { id: "ORD-7289", customer: "Emma Wilson", items: 2, total: 8900, status: "ready", time: "12 min ago", type: "delivery" },
  { id: "ORD-7288", customer: "David Brown", items: 4, total: 21000, status: "new", time: "15 min ago", type: "pickup" },
  { id: "ORD-7287", customer: "Lisa Park", items: 1, total: 4500, status: "ready", time: "20 min ago", type: "pickup" },
  { id: "ORD-7286", customer: "John Smith", items: 6, total: 67800, status: "preparing", time: "25 min ago", type: "delivery" },
];

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  new: { color: "bg-blue-500/20 text-blue-400 border-blue-500/20", icon: AlertCircle, label: "New Order" },
  preparing: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20", icon: Clock, label: "Preparing" },
  ready: { color: "bg-green-500/20 text-green-400 border-green-500/20", icon: CheckCircle2, label: "Ready" },
};

export default function CashierOrders() {
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders = orders.filter(order => 
    filter === "all" || order.status === filter
  );

  const newOrders = orders.filter(o => o.status === 'new').length;
  const preparingOrders = orders.filter(o => o.status === 'preparing').length;
  const readyOrders = orders.filter(o => o.status === 'ready').length;

  return (
    <DashboardLayout role="cashier">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Quick Orders</h1>
            <p className="text-white/60">Manage pickup and delivery orders</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{newOrders}</p>
                  <p className="text-sm text-white/60">New Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{preparingOrders}</p>
                  <p className="text-sm text-white/60">Preparing</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{readyOrders}</p>
                  <p className="text-sm text-white/60">Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Package className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{orders.length}</p>
                  <p className="text-sm text-white/60">Total Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-green-400" />
                Active Orders
              </CardTitle>
              <div className="flex items-center gap-2">
                {["all", "new", "preparing", "ready"].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    size="sm"
                    className={`border-white/10 ${filter === status ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'text-white/60'}`}
                    onClick={() => setFilter(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.map((order, i) => {
                const config = statusConfig[order.status];
                const StatusIcon = config.icon;
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-mono text-sm text-white/60">{order.id}</p>
                        <p className="font-medium text-white">{order.customer}</p>
                      </div>
                      <Badge className={config.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Items</span>
                        <span className="text-white">{order.items}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Total</span>
                        <span className="font-bold text-green-400">৳{order.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Type</span>
                        <Badge variant="outline" className="border-white/10 text-white/60">
                          {order.type === 'delivery' ? <Truck className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                          {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-xs text-white/40 mb-4">{order.time}</p>

                    <div className="flex gap-2">
                      {order.status === 'new' && (
                        <Button size="sm" className="flex-1 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                          Start Preparing
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button size="sm" className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          Mark Ready
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button size="sm" className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                          Complete Handoff
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-white/10 text-white/60">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
