import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, Users, Eye, MousePointer, Target,
  BarChart3, Activity, ArrowUp, ArrowDown
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const trafficData = [
  { date: 'Mon', visitors: 4200, pageViews: 8400, sessions: 5100 },
  { date: 'Tue', visitors: 3800, pageViews: 7600, sessions: 4600 },
  { date: 'Wed', visitors: 5100, pageViews: 10200, sessions: 6200 },
  { date: 'Thu', visitors: 4700, pageViews: 9400, sessions: 5700 },
  { date: 'Fri', visitors: 5500, pageViews: 11000, sessions: 6700 },
  { date: 'Sat', visitors: 6200, pageViews: 12400, sessions: 7500 },
  { date: 'Sun', visitors: 5800, pageViews: 11600, sessions: 7000 }
];

const channelData = [
  { name: 'Organic Search', value: 35, color: '#8b5cf6' },
  { name: 'Direct', value: 25, color: '#3b82f6' },
  { name: 'Social Media', value: 20, color: '#10b981' },
  { name: 'Email', value: 12, color: '#f59e0b' },
  { name: 'Referral', value: 8, color: '#ef4444' }
];

const conversionData = [
  { stage: 'Visitors', count: 45000, rate: 100 },
  { stage: 'Product Views', count: 28000, rate: 62 },
  { stage: 'Add to Cart', count: 8500, rate: 19 },
  { stage: 'Checkout', count: 4200, rate: 9.3 },
  { stage: 'Purchase', count: 2100, rate: 4.7 }
];

export default function MarketingAnalytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const metrics = [
    { label: 'Total Visitors', value: '35.4K', change: '+12.5%', positive: true, icon: Users },
    { label: 'Page Views', value: '70.6K', change: '+8.3%', positive: true, icon: Eye },
    { label: 'Avg. Session Duration', value: '4m 32s', change: '-2.1%', positive: false, icon: Activity },
    { label: 'Bounce Rate', value: '38.2%', change: '-5.4%', positive: true, icon: MousePointer }
  ];

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Marketing Analytics</h1>
            <p className="text-muted-foreground">Track performance and optimize campaigns</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Traffic Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="pageViews" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {channelData.map((entry, index) => (
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
              <Target className="w-5 h-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionData.map((stage, index) => (
                <motion.div 
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4"
                >
                  <div className="w-32 text-sm text-muted-foreground">{stage.stage}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.rate}%` }}
                        transition={{ delay: 0.2 + 0.1 * index, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-end px-3"
                      >
                        <span className="text-sm font-medium text-white">{stage.count.toLocaleString()}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm font-medium text-white">{stage.rate}%</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
