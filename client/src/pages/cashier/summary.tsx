import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, DollarSign, Receipt, CreditCard,
  Banknote, Smartphone, TrendingUp, Download, Printer
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const hourlyData = [
  { hour: '6AM', sales: 5200, transactions: 8 },
  { hour: '7AM', sales: 8500, transactions: 12 },
  { hour: '8AM', sales: 12300, transactions: 18 },
  { hour: '9AM', sales: 15600, transactions: 22 },
  { hour: '10AM', sales: 18200, transactions: 26 },
  { hour: '11AM', sales: 22400, transactions: 31 },
  { hour: '12PM', sales: 19800, transactions: 28 },
  { hour: '1PM', sales: 16500, transactions: 24 },
];

const paymentBreakdown = [
  { method: "Cash", amount: 45600, count: 32, icon: Banknote, color: "text-green-400" },
  { method: "Card", amount: 38200, count: 28, icon: CreditCard, color: "text-blue-400" },
  { method: "Mobile Pay", amount: 22800, count: 15, icon: Smartphone, color: "text-purple-400" },
  { method: "QR Payment", amount: 11900, count: 8, icon: Receipt, color: "text-cyan-400" },
];

const topCategories = [
  { name: "Electronics", sales: 68500, percentage: 58 },
  { name: "Fashion", sales: 25200, percentage: 21 },
  { name: "Home & Living", sales: 15800, percentage: 13 },
  { name: "Accessories", sales: 9000, percentage: 8 },
];

export default function CashierSummary() {
  const totalSales = 118500;
  const totalTransactions = 83;
  const avgTransaction = Math.round(totalSales / totalTransactions);

  return (
    <DashboardLayout role="cashier">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Daily Summary</h1>
            <p className="text-white/60">December 2, 2024 • Your shift performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-green-500/30">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <Badge className="bg-green-500/30 text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" /> +15%
                </Badge>
              </div>
              <h3 className="text-sm text-white/60 mb-1">Total Sales</h3>
              <p className="text-3xl font-bold text-white">৳{totalSales.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="p-3 rounded-xl bg-blue-500/20 w-fit mb-4">
                <Receipt className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-sm text-white/60 mb-1">Transactions</h3>
              <p className="text-3xl font-bold text-white">{totalTransactions}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="p-3 rounded-xl bg-purple-500/20 w-fit mb-4">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm text-white/60 mb-1">Avg. Transaction</h3>
              <p className="text-3xl font-bold text-white">৳{avgTransaction.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="p-3 rounded-xl bg-orange-500/20 w-fit mb-4">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm text-white/60 mb-1">Peak Hour</h3>
              <p className="text-3xl font-bold text-white">11 AM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Hourly Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="hour" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentBreakdown.map((payment, i) => (
                  <motion.div
                    key={payment.method}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                  >
                    <div className={`p-2 rounded-lg bg-white/5`}>
                      <payment.icon className={`w-4 h-4 ${payment.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">{payment.method}</span>
                        <span className="text-sm font-bold text-white">৳{payment.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-white/40">{payment.count} transactions</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {topCategories.map((category, i) => (
                  <div key={category.name} className="p-4 rounded-xl bg-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-white/60">{category.percentage}%</span>
                    </div>
                    <p className="text-xl font-bold text-green-400 mb-2">৳{category.sales.toLocaleString()}</p>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
