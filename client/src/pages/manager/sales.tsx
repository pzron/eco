import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, DollarSign, Package, ArrowUpRight, 
  Download, Calendar, Filter
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const salesData = [
  { day: 'Week 1', revenue: 125000, orders: 450 },
  { day: 'Week 2', revenue: 142000, orders: 520 },
  { day: 'Week 3', revenue: 138000, orders: 490 },
  { day: 'Week 4', revenue: 165000, orders: 580 },
];

const categoryBreakdown = [
  { name: 'Electronics', value: 45, color: '#3b82f6' },
  { name: 'Fashion', value: 25, color: '#10b981' },
  { name: 'Home & Living', value: 20, color: '#f59e0b' },
  { name: 'Others', value: 10, color: '#8b5cf6' },
];

const topSelling = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", sold: 124, revenue: "৳1,240,000" },
  { id: 2, name: "MacBook Air M3", category: "Electronics", sold: 45, revenue: "৳540,000" },
  { id: 3, name: "Nike Air Max", category: "Fashion", sold: 89, revenue: "৳178,000" },
  { id: 4, name: "Smart Watch Pro", category: "Electronics", sold: 67, revenue: "৳201,000" },
];

export default function ManagerSales() {
  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Sales Overview</h1>
            <p className="text-white/60">Monitor store sales performance and trends</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              This Month
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +15.2%
                </Badge>
              </div>
              <h3 className="text-sm text-white/60 mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-white">৳570,000</p>
              <p className="text-sm text-white/40 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <Package className="w-5 h-5 text-green-400" />
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +8.3%
                </Badge>
              </div>
              <h3 className="text-sm text-white/60 mb-1">Total Orders</h3>
              <p className="text-3xl font-bold text-white">2,040</p>
              <p className="text-sm text-white/40 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +5.1%
                </Badge>
              </div>
              <h3 className="text-sm text-white/60 mb-1">Avg. Order Value</h3>
              <p className="text-3xl font-bold text-white">৳279</p>
              <p className="text-sm text-white/40 mt-1">Per transaction</p>
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
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
                    </AreaChart>
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
                <CardTitle className="text-white">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryBreakdown.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-xs text-white/60">{cat.name}</span>
                      <span className="text-xs text-white ml-auto">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Top Selling Products</CardTitle>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-sm text-white/60 pb-3">Product</th>
                      <th className="text-left text-sm text-white/60 pb-3">Category</th>
                      <th className="text-right text-sm text-white/60 pb-3">Units Sold</th>
                      <th className="text-right text-sm text-white/60 pb-3">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSelling.map((product) => (
                      <tr key={product.id} className="border-b border-white/5">
                        <td className="py-4 text-white font-medium">{product.name}</td>
                        <td className="py-4">
                          <Badge variant="outline" className="border-white/10 text-white/60">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="py-4 text-right text-white">{product.sold}</td>
                        <td className="py-4 text-right text-green-400 font-medium">{product.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
