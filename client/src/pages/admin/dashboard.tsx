import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, DollarSign, ShoppingCart, 
  Activity, Globe, Zap, AlertCircle 
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: 'Mon', sales: 4000, visitors: 2400 },
  { name: 'Tue', sales: 3000, visitors: 1398 },
  { name: 'Wed', sales: 2000, visitors: 9800 },
  { name: 'Thu', sales: 2780, visitors: 3908 },
  { name: 'Fri', sales: 1890, visitors: 4800 },
  { name: 'Sat', sales: 2390, visitors: 3800 },
  { name: 'Sun', sales: 3490, visitors: 4300 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Command Center</h1>
            <p className="text-muted-foreground">Real-time system overview and AI insights</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-white/10 bg-white/5">
               <Activity className="mr-2 w-4 h-4 text-green-500" /> System Healthy
             </Button>
             <Button className="bg-primary hover:bg-primary/90">
               <Zap className="mr-2 w-4 h-4" /> AI Actions
             </Button>
          </div>
        </div>

        {/* Holographic KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Revenue", value: "$128,430", change: "+12.5%", icon: DollarSign, color: "text-primary" },
            { title: "Active Users", value: "14,293", change: "+5.2%", icon: Users, color: "text-blue-400" },
            { title: "Orders Today", value: "1,432", change: "+18.1%", icon: ShoppingCart, color: "text-green-400" },
            { title: "Avg. Order Value", value: "$89.40", change: "-2.4%", icon: TrendingUp, color: "text-orange-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color.split('-')[1]}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'} flex items-center mt-1`}>
                    {stat.change}
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Revenue Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1222', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-6">
             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" /> AI Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { text: "Inventory low on 'iPhone 15 Pro'", type: "warning" },
                    { text: "Unusual traffic spike from Region Asia", type: "info" },
                    { text: "Affiliate #492 flagged for review", type: "danger" }
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.type === 'warning' ? 'bg-yellow-500' : alert.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}`} />
                      <p className="text-sm text-gray-300">{alert.text}</p>
                    </div>
                  ))}
                </CardContent>
             </Card>

             <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-white/10">
               <CardContent className="p-6 flex flex-col items-center text-center">
                 <Globe className="w-12 h-12 text-white mb-4 animate-pulse" />
                 <h3 className="text-lg font-bold text-white mb-2">Live 3D Map</h3>
                 <p className="text-sm text-white/70 mb-4">View real-time global transactions in 3D space.</p>
                 <Button variant="secondary" className="w-full">Open Map View</Button>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
