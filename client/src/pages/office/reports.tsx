import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, Download, Calendar, TrendingUp,
  DollarSign, Users, Package, FileText
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, BarChart } from "recharts";
import { motion } from "framer-motion";

const salesData = [
  { month: 'Jul', sales: 245000, orders: 890 },
  { month: 'Aug', sales: 278000, orders: 950 },
  { month: 'Sep', sales: 312000, orders: 1120 },
  { month: 'Oct', sales: 298000, orders: 1050 },
  { month: 'Nov', sales: 385000, orders: 1340 },
  { month: 'Dec', sales: 420000, orders: 1580 },
];

const reportTypes = [
  { id: 1, name: "Sales Summary", description: "Monthly revenue and order statistics", icon: DollarSign, status: "ready" },
  { id: 2, name: "Customer Analytics", description: "User behavior and demographics", icon: Users, status: "ready" },
  { id: 3, name: "Inventory Report", description: "Stock levels and movement", icon: Package, status: "generating" },
  { id: 4, name: "Performance Metrics", description: "Team and store KPIs", icon: TrendingUp, status: "ready" },
];

export default function OfficeReports() {
  return (
    <DashboardLayout role="office_member">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Reports</h1>
            <p className="text-white/60">Generate and view store analytics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              Last 6 Months
            </Button>
            <Button className="bg-gradient-to-r from-indigo-500 to-violet-500">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-indigo-500/30">
                  <DollarSign className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-sm text-white/60 mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-white">৳1.94M</p>
              <p className="text-xs text-green-400 mt-1">+18% vs last period</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="p-3 rounded-xl bg-green-500/20 w-fit mb-4">
                <Package className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-sm text-white/60 mb-1">Total Orders</h3>
              <p className="text-3xl font-bold text-white">6,930</p>
              <p className="text-xs text-green-400 mt-1">+12% vs last period</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="p-3 rounded-xl bg-purple-500/20 w-fit mb-4">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm text-white/60 mb-1">New Customers</h3>
              <p className="text-3xl font-bold text-white">1,245</p>
              <p className="text-xs text-green-400 mt-1">+8% vs last period</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="p-3 rounded-xl bg-cyan-500/20 w-fit mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm text-white/60 mb-1">Avg. Order Value</h3>
              <p className="text-3xl font-bold text-white">৳280</p>
              <p className="text-xs text-green-400 mt-1">+5% vs last period</p>
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
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} fill="url(#colorSales)" />
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
                <CardTitle className="text-white">Quick Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportTypes.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/20">
                        <report.icon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{report.name}</p>
                        <p className="text-xs text-white/60">{report.description}</p>
                      </div>
                      {report.status === 'ready' ? (
                        <Button size="sm" variant="ghost" className="h-8 text-indigo-400 hover:text-indigo-300">
                          <Download className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          Generating...
                        </Badge>
                      )}
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
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                Orders by Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
