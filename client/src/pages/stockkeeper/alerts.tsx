import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, Package, TrendingDown, XCircle,
  CheckCircle2, ShoppingCart, Bell
} from "lucide-react";
import { motion } from "framer-motion";

const stockAlerts = [
  { id: 1, product: "Smart Watch Pro", sku: "SWP-BLK-L", current: 0, minimum: 15, urgency: "out", lastSold: "2 hours ago" },
  { id: 2, product: "Nike Air Max", sku: "NAM-BLK-42", current: 3, minimum: 10, urgency: "critical", lastSold: "30 min ago" },
  { id: 3, product: "MacBook Air M3", sku: "MBA-M3-256", current: 8, minimum: 15, urgency: "high", lastSold: "1 hour ago" },
  { id: 4, product: "Coffee Maker Pro", sku: "CFM-PRO-01", current: 5, minimum: 8, urgency: "medium", lastSold: "4 hours ago" },
  { id: 5, product: "Gaming Mouse RGB", sku: "GMR-RGB-01", current: 12, minimum: 20, urgency: "medium", lastSold: "3 hours ago" },
  { id: 6, product: "Wireless Keyboard", sku: "WKB-WHT-01", current: 4, minimum: 10, urgency: "high", lastSold: "45 min ago" },
];

const urgencyConfig: Record<string, { color: string; bgColor: string; label: string; icon: any }> = {
  out: { color: "text-red-400", bgColor: "bg-red-500/20", label: "Out of Stock", icon: XCircle },
  critical: { color: "text-orange-400", bgColor: "bg-orange-500/20", label: "Critical", icon: AlertTriangle },
  high: { color: "text-yellow-400", bgColor: "bg-yellow-500/20", label: "High", icon: TrendingDown },
  medium: { color: "text-blue-400", bgColor: "bg-blue-500/20", label: "Medium", icon: Bell },
};

export default function StockkeeperAlerts() {
  const outOfStock = stockAlerts.filter(a => a.urgency === 'out').length;
  const criticalCount = stockAlerts.filter(a => a.urgency === 'critical').length;
  const highCount = stockAlerts.filter(a => a.urgency === 'high').length;

  return (
    <DashboardLayout role="stockkeeper">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Stock Alerts</h1>
            <p className="text-white/60">Items requiring immediate attention</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-500">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Order All Low Stock
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/30">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{outOfStock}</p>
                  <p className="text-sm text-red-300">Out of Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{criticalCount}</p>
                  <p className="text-sm text-white/60">Critical</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <TrendingDown className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{highCount}</p>
                  <p className="text-sm text-white/60">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stockAlerts.length}</p>
                  <p className="text-sm text-white/60">Total Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              All Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((alert, i) => {
                const config = urgencyConfig[alert.urgency];
                const AlertIcon = config.icon;
                const stockPercentage = (alert.current / alert.minimum) * 100;

                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                          <AlertIcon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{alert.product}</p>
                          <p className="text-sm text-white/60 font-mono">{alert.sku}</p>
                        </div>
                      </div>
                      <Badge className={`${config.bgColor} ${config.color}`}>
                        {config.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-white/40">Current Stock</p>
                        <p className={`text-lg font-bold ${alert.current === 0 ? 'text-red-400' : 'text-white'}`}>
                          {alert.current} units
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40">Minimum Required</p>
                        <p className="text-lg font-bold text-white">{alert.minimum} units</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40">Last Sold</p>
                        <p className="text-sm text-white/60">{alert.lastSold}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/40">Stock Level</span>
                        <span className={config.color}>{Math.round(stockPercentage)}%</span>
                      </div>
                      <Progress value={stockPercentage} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
                        <ShoppingCart className="w-4 h-4 mr-1" /> Order Now
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/10 text-white/60">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Resolved
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
