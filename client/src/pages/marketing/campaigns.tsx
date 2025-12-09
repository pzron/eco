import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Target, TrendingUp, DollarSign, Users, Plus,
  Play, Pause, Eye, Edit, Calendar, BarChart3
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'ppc' | 'display';
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

const sampleCampaigns: Campaign[] = [
  { id: "1", name: "Holiday Sale 2024", type: "email", status: "active", budget: 5000, spent: 3200, reach: 45000, conversions: 890, startDate: "2024-11-15", endDate: "2024-12-31" },
  { id: "2", name: "New Year Promo", type: "social", status: "draft", budget: 8000, spent: 0, reach: 0, conversions: 0, startDate: "2024-12-25", endDate: "2025-01-15" },
  { id: "3", name: "Black Friday Ads", type: "ppc", status: "completed", budget: 15000, spent: 14500, reach: 120000, conversions: 3200, startDate: "2024-11-20", endDate: "2024-11-30" },
  { id: "4", name: "Brand Awareness Q4", type: "display", status: "active", budget: 10000, spent: 6800, reach: 85000, conversions: 450, startDate: "2024-10-01", endDate: "2024-12-31" },
  { id: "5", name: "Flash Sale Weekend", type: "email", status: "paused", budget: 2000, spent: 800, reach: 25000, conversions: 320, startDate: "2024-12-01", endDate: "2024-12-03" }
];

export default function MarketingCampaigns() {
  const [campaigns] = useState<Campaign[]>(sampleCampaigns);

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft': return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Draft</Badge>;
      case 'active': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case 'paused': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Paused</Badge>;
      case 'completed': return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'email': return 'bg-purple-500/20 text-purple-400';
      case 'social': return 'bg-blue-500/20 text-blue-400';
      case 'ppc': return 'bg-green-500/20 text-green-400';
      case 'display': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Campaign Management</h1>
            <p className="text-muted-foreground">Create and manage your marketing campaigns</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Campaign Name</Label>
                  <Input placeholder="e.g., Summer Sale 2025" className="bg-white/5 border-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <Input type="number" placeholder="5000" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Input placeholder="email / social / ppc" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Campaign objectives..." className="bg-white/5 border-white/10" />
                </div>
                <Button className="w-full mt-2">Create Campaign</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold text-white">${totalBudget.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <DollarSign className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reach</p>
                    <p className="text-2xl font-bold text-white">{(totalReach / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="text-2xl font-bold text-white">{totalConversions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Target className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-4">
          {campaigns.map((campaign, index) => (
            <motion.div 
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${getTypeColor(campaign.type)}`}>
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                          {getStatusBadge(campaign.status)}
                          <Badge variant="outline" className="border-white/20 capitalize">{campaign.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Budget Used</p>
                        <p className="text-lg font-semibold text-white">
                          ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                        </p>
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1 mt-1 w-32" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Reach</p>
                        <p className="text-lg font-semibold text-white">{(campaign.reach / 1000).toFixed(1)}K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="text-lg font-semibold text-white">{campaign.conversions}</p>
                      </div>
                      <div className="flex gap-2">
                        {campaign.status === 'active' && (
                          <Button size="icon" variant="outline" className="border-yellow-500/30 text-yellow-400">
                            <Pause className="w-4 h-4" />
                          </Button>
                        )}
                        {(campaign.status === 'paused' || campaign.status === 'draft') && (
                          <Button size="icon" variant="outline" className="border-green-500/30 text-green-400">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="outline" className="border-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="border-white/10">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
