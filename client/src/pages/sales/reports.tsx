import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, DollarSign, Users, Download,
  Calendar, Target, ArrowUp, ArrowDown
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const salesData = [
  { month: 'Jul', revenue: 45000, deals: 12, target: 50000 },
  { month: 'Aug', revenue: 52000, deals: 15, target: 50000 },
  { month: 'Sep', revenue: 48000, deals: 13, target: 55000 },
  { month: 'Oct', revenue: 61000, deals: 18, target: 55000 },
  { month: 'Nov', revenue: 75000, deals: 22, target: 60000 },
  { month: 'Dec', revenue: 82000, deals: 25, target: 65000 }
];

const teamPerformance = [
  { name: 'Sarah Johnson', deals: 28, revenue: 185000, quota: 150000, avatar: 'SJ' },
  { name: 'Mike Chen', deals: 22, revenue: 142000, quota: 150000, avatar: 'MC' },
  { name: 'Emily Davis', deals: 19, revenue: 128000, quota: 120000, avatar: 'ED' },
  { name: 'Robert Wilson', deals: 15, revenue: 95000, quota: 100000, avatar: 'RW' }
];

const dealSources = [
  { name: 'Inbound', value: 45, color: '#8b5cf6' },
  { name: 'Outbound', value: 30, color: '#3b82f6' },
  { name: 'Referral', value: 15, color: '#10b981' },
  { name: 'Partner', value: 10, color: '#f59e0b' }
];

export default function SalesReports() {
  const [timeRange, setTimeRange] = useState("q4");

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalDeals = salesData.reduce((sum, d) => sum + d.deals, 0);
  const avgDealSize = Math.round(totalRevenue / totalDeals);

  const metrics = [
    { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: '+18.5%', positive: true, icon: DollarSign },
    { label: 'Deals Closed', value: totalDeals, change: '+12.3%', positive: true, icon: Target },
    { label: 'Avg Deal Size', value: `$${(avgDealSize / 1000).toFixed(1)}K`, change: '+5.2%', positive: true, icon: TrendingUp },
    { label: 'Win Rate', value: '68%', change: '-2.1%', positive: false, icon: BarChart3 }
  ];

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Sales Reports</h1>
            <p className="text-muted-foreground">Analyze your sales performance</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-white/5 border-white/10">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q4">Q4 2024</SelectItem>
                <SelectItem value="q3">Q3 2024</SelectItem>
                <SelectItem value="year">Full Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.label}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <div className={`flex items-center gap-1 text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {metric.change}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/20">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Revenue vs Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" />
                  <Bar dataKey="target" fill="#3b82f6" opacity={0.5} name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Deal Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dealSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {dealSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamPerformance.map((member, index) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">{member.name}</span>
                      <span className="text-sm text-muted-foreground">{member.deals} deals</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((member.revenue / member.quota) * 100, 100)}%` }}
                            transition={{ delay: 0.2 + 0.1 * index, duration: 0.8 }}
                            className={`h-full rounded-full ${member.revenue >= member.quota ? 'bg-green-500' : 'bg-primary'}`}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${member.revenue >= member.quota ? 'text-green-400' : 'text-muted-foreground'}`}>
                        ${(member.revenue / 1000).toFixed(0)}K / ${(member.quota / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
