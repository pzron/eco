import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, TrendingUp, Target, Users, Plus,
  Phone, Mail, Calendar, ArrowRight
} from "lucide-react";

interface Deal {
  id: string;
  company: string;
  contact: string;
  contactAvatar: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
  expectedClose: string;
  lastContact: string;
}

const sampleDeals: Deal[] = [
  { id: "1", company: "TechCorp Inc", contact: "John Williams", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", value: 45000, stage: "negotiation", probability: 80, expectedClose: "2024-12-20", lastContact: "2024-12-07" },
  { id: "2", company: "Global Solutions", contact: "Sarah Chen", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", value: 28000, stage: "proposal", probability: 60, expectedClose: "2024-12-25", lastContact: "2024-12-05" },
  { id: "3", company: "StartupXYZ", contact: "Mike Davis", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", value: 15000, stage: "qualified", probability: 40, expectedClose: "2025-01-10", lastContact: "2024-12-08" },
  { id: "4", company: "Enterprise Ltd", contact: "Emily Brown", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", value: 120000, stage: "lead", probability: 20, expectedClose: "2025-02-15", lastContact: "2024-12-01" },
  { id: "5", company: "MegaCorp", contact: "Robert Wilson", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert", value: 85000, stage: "closed", probability: 100, expectedClose: "2024-12-05", lastContact: "2024-12-05" }
];

const stages = [
  { key: 'lead', label: 'Lead', color: 'bg-gray-500' },
  { key: 'qualified', label: 'Qualified', color: 'bg-blue-500' },
  { key: 'proposal', label: 'Proposal', color: 'bg-yellow-500' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-purple-500' },
  { key: 'closed', label: 'Closed Won', color: 'bg-green-500' }
];

export default function SalesPipeline() {
  const [deals] = useState<Deal[]>(sampleDeals);

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const weightedValue = deals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0);
  const closedValue = deals.filter(d => d.stage === 'closed').reduce((sum, d) => sum + d.value, 0);

  const getStageDeals = (stage: string) => deals.filter(d => d.stage === stage);

  const getStageBadge = (stage: string) => {
    const stageConfig = stages.find(s => s.key === stage);
    return <Badge className={`${stageConfig?.color}/20 text-white border-white/20`}>{stageConfig?.label}</Badge>;
  };

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Sales Pipeline</h1>
            <p className="text-muted-foreground">Track and manage your deals</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
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
                    <p className="text-sm text-muted-foreground">Weighted Value</p>
                    <p className="text-2xl font-bold text-white">${weightedValue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Target className="w-6 h-6 text-purple-400" />
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
                    <p className="text-sm text-muted-foreground">Closed Won</p>
                    <p className="text-2xl font-bold text-white">${closedValue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <TrendingUp className="w-6 h-6 text-green-400" />
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
                    <p className="text-sm text-muted-foreground">Active Deals</p>
                    <p className="text-2xl font-bold text-white">{deals.filter(d => d.stage !== 'closed').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
          {stages.map((stage, stageIndex) => (
            <motion.div 
              key={stage.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * stageIndex }}
            >
              <Card className="bg-white/5 border-white/10 min-h-[500px]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <CardTitle className="text-sm">{stage.label}</CardTitle>
                    </div>
                    <Badge variant="outline" className="border-white/20">
                      {getStageDeals(stage.key).length}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ${getStageDeals(stage.key).reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getStageDeals(stage.key).map((deal) => (
                    <motion.div 
                      key={deal.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6 border border-white/20">
                          <AvatarImage src={deal.contactAvatar} />
                          <AvatarFallback>{deal.contact.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{deal.company}</p>
                          <p className="text-xs text-muted-foreground truncate">{deal.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-green-400">${deal.value.toLocaleString()}</span>
                        <span className="text-muted-foreground">{deal.probability}%</span>
                      </div>
                      <Progress value={deal.probability} className="h-1 mt-2" />
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(deal.expectedClose).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
