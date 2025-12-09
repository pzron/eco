import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  TrendingUp, DollarSign, Users, Target, Phone, Mail,
  Calendar, Clock, Award, Star, ArrowUpRight, ArrowDownRight,
  BarChart3, PieChart, ShoppingCart, UserPlus, CheckCircle,
  AlertCircle, RefreshCw, Plus, ChevronRight, Briefcase
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart as RechartsBarChart, Cell } from "recharts";
import { useState } from "react";

const salesData = [
  { name: 'Mon', revenue: 45000, deals: 12 },
  { name: 'Tue', revenue: 52000, deals: 15 },
  { name: 'Wed', revenue: 48000, deals: 11 },
  { name: 'Thu', revenue: 61000, deals: 18 },
  { name: 'Fri', revenue: 58000, deals: 16 },
  { name: 'Sat', revenue: 72000, deals: 22 },
  { name: 'Sun', revenue: 38000, deals: 9 },
];

const pipelineData = [
  { stage: 'Lead', count: 45, value: '৳2.4M', color: '#a855f7' },
  { stage: 'Qualified', count: 28, value: '৳1.8M', color: '#ec4899' },
  { stage: 'Proposal', count: 15, value: '৳980K', color: '#06b6d4' },
  { stage: 'Negotiation', count: 8, value: '৳520K', color: '#f59e0b' },
  { stage: 'Closed', count: 12, value: '৳890K', color: '#10b981' },
];

const topPerformers = [
  { name: "Rahim Ahmed", avatar: "RA", deals: 28, revenue: "৳4.2M", quota: 115, rank: 1 },
  { name: "Fatima Khan", avatar: "FK", deals: 24, revenue: "৳3.8M", quota: 108, rank: 2 },
  { name: "Kamal Hossain", avatar: "KH", deals: 21, revenue: "৳3.2M", quota: 95, rank: 3 },
  { name: "Nusrat Jahan", avatar: "NJ", deals: 18, revenue: "৳2.6M", quota: 88, rank: 4 },
];

const recentDeals = [
  { company: "TechCorp Ltd", contact: "Ahmed Ali", value: "৳245,000", stage: "won", probability: 100, product: "Enterprise Suite" },
  { company: "Digital Solutions", contact: "Sara Rahman", value: "৳180,000", stage: "proposal", probability: 75, product: "Pro Package" },
  { company: "Innovation Hub", contact: "Karim Hassan", value: "৳320,000", stage: "negotiation", probability: 85, product: "Custom Build" },
  { company: "StartupXYZ", contact: "Mina Khan", value: "৳95,000", stage: "qualified", probability: 50, product: "Starter Plan" },
];

const upcomingTasks = [
  { task: "Follow up with TechCorp", time: "10:00 AM", type: "call", priority: "high" },
  { task: "Proposal review meeting", time: "2:00 PM", type: "meeting", priority: "medium" },
  { task: "Send quote to Digital Solutions", time: "4:00 PM", type: "email", priority: "high" },
  { task: "Demo for Innovation Hub", time: "Tomorrow", type: "demo", priority: "medium" },
];

function HolographicCard({ 
  children, 
  className = "",
  glowColor = "purple"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "orange" | "blue";
}) {
  const glowColors: Record<string, string> = {
    purple: "from-purple-500/20 via-purple-500/5 to-transparent",
    pink: "from-pink-500/20 via-pink-500/5 to-transparent",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    green: "from-green-500/20 via-green-500/5 to-transparent",
    orange: "from-orange-500/20 via-orange-500/5 to-transparent",
    blue: "from-blue-500/20 via-blue-500/5 to-transparent",
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColors[glowColor]} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function SalesKPI({ title, value, change, icon: Icon, color, delay = 0, subValue }: any) {
  const colorClasses: Record<string, string> = {
    purple: "text-purple-400 bg-purple-500/20",
    pink: "text-pink-400 bg-pink-500/20",
    cyan: "text-cyan-400 bg-cyan-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
  };

  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <HolographicCard glowColor={color}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {change}
            </div>
          </div>
          <h3 className="text-xs font-medium text-white/60 mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{value}</span>
            {subValue && <span className="text-xs text-white/40">{subValue}</span>}
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

export default function SalesDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <DashboardLayout role="sales">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Sales Dashboard
              </h1>
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                <TrendingUp className="w-3 h-3 mr-1" />
                Sales Team
              </Badge>
            </div>
            <p className="text-white/60">Track deals, manage pipeline, and hit your targets</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={handleRefresh}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SalesKPI title="Monthly Revenue" value="৳3.74M" change="+18.5%" icon={DollarSign} color="green" delay={0} subValue="this month" />
          <SalesKPI title="Deals Closed" value="103" change="+12.3%" icon={CheckCircle} color="cyan" delay={0.1} />
          <SalesKPI title="Pipeline Value" value="৳6.5M" change="+8.7%" icon={Target} color="purple" delay={0.2} />
          <SalesKPI title="Win Rate" value="34%" change="+2.1%" icon={Award} color="orange" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <HolographicCard glowColor="green">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <BarChart3 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                      <p className="text-sm text-white/60">Weekly performance</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-white/60">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-white/60">Deals</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSalesRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSalesRevenue)" dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <HolographicCard glowColor="purple">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Pipeline Stages</h3>
                    <p className="text-sm text-white/60">Deal distribution</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {pipelineData.map((stage, i) => (
                    <motion.div
                      key={stage.stage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{stage.stage}</span>
                          <span className="text-white/60">{stage.count} deals</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: stage.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(stage.count / 45) * 100}%` }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-xs text-white/40">{stage.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HolographicCard glowColor="cyan">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Briefcase className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recent Deals</h3>
                      <p className="text-sm text-white/60">Latest opportunities</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">View All</Button>
                </div>
                
                <div className="space-y-3">
                  {recentDeals.map((deal, i) => (
                    <motion.div
                      key={deal.company}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{deal.company}</span>
                        <Badge className={
                          deal.stage === 'won' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          deal.stage === 'negotiation' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          deal.stage === 'proposal' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                          'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        }>
                          {deal.stage}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{deal.contact}</span>
                        <span className="text-white font-semibold">{deal.value}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-white/40">{deal.product}</span>
                        <span className="text-white/40">{deal.probability}% probability</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <HolographicCard glowColor="orange">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Award className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Top Performers</h3>
                </div>
                
                <div className="space-y-3">
                  {topPerformers.map((person, i) => (
                    <div
                      key={person.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
                            {person.avatar}
                          </div>
                          {person.rank <= 3 && (
                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              person.rank === 1 ? 'bg-yellow-500 text-black' :
                              person.rank === 2 ? 'bg-gray-300 text-black' :
                              'bg-orange-600 text-white'
                            }`}>
                              {person.rank}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{person.name}</p>
                          <p className="text-xs text-white/60">{person.deals} deals • {person.revenue}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${person.quota >= 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {person.quota}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HolographicCard>

            <HolographicCard glowColor="pink">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Clock className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Today's Tasks</h3>
                </div>
                
                <div className="space-y-2">
                  {upcomingTasks.map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{task.task}</p>
                        <p className="text-xs text-white/40">{task.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-white/10">
                        {task.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
