import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Megaphone, Target, TrendingUp, Users, Eye, MousePointer,
  DollarSign, BarChart3, PieChart, Share2, Mail, MessageSquare,
  Instagram, Facebook, Twitter, Youtube, ArrowUpRight, ArrowDownRight,
  Calendar, Zap, Bell, Plus, RefreshCw
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart as RechartsBarChart, Cell, PieChart as RechartsPieChart, Pie } from "recharts";
import { useState } from "react";

const campaignData = [
  { name: 'Mon', impressions: 45000, clicks: 2400, conversions: 120 },
  { name: 'Tue', impressions: 52000, clicks: 2800, conversions: 145 },
  { name: 'Wed', impressions: 48000, clicks: 2600, conversions: 130 },
  { name: 'Thu', impressions: 61000, clicks: 3200, conversions: 180 },
  { name: 'Fri', impressions: 58000, clicks: 3000, conversions: 165 },
  { name: 'Sat', impressions: 72000, clicks: 3800, conversions: 210 },
  { name: 'Sun', impressions: 68000, clicks: 3500, conversions: 195 },
];

const channelData = [
  { name: 'Social Media', value: 35, color: '#a855f7' },
  { name: 'Email', value: 25, color: '#ec4899' },
  { name: 'Paid Ads', value: 22, color: '#06b6d4' },
  { name: 'Organic', value: 18, color: '#f59e0b' },
];

const activeCampaigns = [
  { name: "Holiday Sale 2024", status: "active", budget: "৳50,000", spent: "৳32,450", roi: "+234%", platform: "Multi" },
  { name: "New Year Promo", status: "scheduled", budget: "৳30,000", spent: "৳0", roi: "-", platform: "Social" },
  { name: "Flash Deal Friday", status: "active", budget: "৳15,000", spent: "৳12,800", roi: "+156%", platform: "Email" },
  { name: "Influencer Collab", status: "active", budget: "৳25,000", spent: "৳18,200", roi: "+189%", platform: "Instagram" },
];

const socialMetrics = [
  { platform: "Instagram", icon: Instagram, followers: "45.2K", growth: "+12%", engagement: "4.8%", color: "pink" },
  { platform: "Facebook", icon: Facebook, followers: "32.1K", growth: "+8%", engagement: "3.2%", color: "blue" },
  { platform: "Twitter", icon: Twitter, followers: "18.5K", growth: "+15%", engagement: "2.9%", color: "cyan" },
  { platform: "YouTube", icon: Youtube, followers: "12.3K", growth: "+22%", engagement: "5.1%", color: "red" },
];

function HolographicCard({ 
  children, 
  className = "",
  glowColor = "purple"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "orange" | "blue" | "red";
}) {
  const glowColors: Record<string, string> = {
    purple: "from-purple-500/20 via-purple-500/5 to-transparent",
    pink: "from-pink-500/20 via-pink-500/5 to-transparent",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    green: "from-green-500/20 via-green-500/5 to-transparent",
    orange: "from-orange-500/20 via-orange-500/5 to-transparent",
    blue: "from-blue-500/20 via-blue-500/5 to-transparent",
    red: "from-red-500/20 via-red-500/5 to-transparent",
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

function MetricCard({ title, value, change, icon: Icon, color, delay = 0 }: any) {
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
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

export default function MarketingDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Marketing Hub
              </h1>
              <Badge variant="outline" className="border-pink-500/30 text-pink-400 bg-pink-500/10">
                <Megaphone className="w-3 h-3 mr-1" />
                Marketing Team
              </Badge>
            </div>
            <p className="text-white/60">Manage campaigns, track performance, and grow your audience</p>
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
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Total Impressions" value="2.4M" change="+18.5%" icon={Eye} color="purple" delay={0} />
          <MetricCard title="Click Rate" value="4.2%" change="+0.8%" icon={MousePointer} color="cyan" delay={0.1} />
          <MetricCard title="Conversions" value="1,245" change="+23.1%" icon={Target} color="green" delay={0.2} />
          <MetricCard title="Ad Spend ROI" value="234%" change="+12%" icon={TrendingUp} color="orange" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <HolographicCard glowColor="purple">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Campaign Performance</h3>
                      <p className="text-sm text-white/60">Weekly metrics overview</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-white/60">Impressions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-white/60">Clicks</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={campaignData}>
                      <defs>
                        <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="impressions" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorImpressions)" />
                      <Area type="monotone" dataKey="clicks" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
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
            <HolographicCard glowColor="pink">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <PieChart className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
                    <p className="text-sm text-white/60">Channel distribution</p>
                  </div>
                </div>
                
                <div className="h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {channelData.map((channel, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: channel.color }} />
                      <span className="text-xs text-white/60">{channel.name}</span>
                      <span className="text-xs text-white font-medium ml-auto">{channel.value}%</span>
                    </div>
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
                      <Target className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Active Campaigns</h3>
                      <p className="text-sm text-white/60">Running promotions</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">View All</Button>
                </div>
                
                <div className="space-y-3">
                  {activeCampaigns.map((campaign, i) => (
                    <motion.div
                      key={campaign.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{campaign.name}</span>
                        <Badge className={campaign.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Budget: {campaign.budget}</span>
                        <span className="text-white/60">Spent: {campaign.spent}</span>
                        <span className={`font-medium ${campaign.roi !== '-' ? 'text-green-400' : 'text-white/40'}`}>ROI: {campaign.roi}</span>
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
          >
            <HolographicCard glowColor="green">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Share2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Social Media</h3>
                      <p className="text-sm text-white/60">Platform performance</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {socialMetrics.map((platform, i) => (
                    <motion.div
                      key={platform.platform}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-${platform.color}-500/20 flex items-center justify-center`}>
                          <platform.icon className={`w-4 h-4 text-${platform.color}-400`} />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{platform.platform}</p>
                          <p className="text-xs text-white/60">{platform.followers} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-400 font-medium">{platform.growth}</p>
                        <p className="text-xs text-white/60">Eng: {platform.engagement}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <HolographicCard glowColor="orange">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                  <p className="text-sm text-white/60">Common marketing tasks</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: Mail, label: "Email Blast", color: "purple" },
                  { icon: MessageSquare, label: "Social Post", color: "pink" },
                  { icon: Target, label: "Create Ad", color: "cyan" },
                  { icon: BarChart3, label: "Analytics", color: "green" },
                  { icon: Calendar, label: "Schedule", color: "orange" },
                ].map((action, i) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <action.icon className={`w-6 h-6 mb-2 mx-auto text-${action.color}-400 group-hover:scale-110 transition-transform`} />
                    <span className="text-sm text-white/80 group-hover:text-white">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
