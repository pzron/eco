import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, TrendingUp, Target, Calendar, Plus,
  Eye, Edit, CheckCircle, XCircle, Clock
} from "lucide-react";

interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  contactAvatar: string;
  value: number;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  closeDate: string;
  createdAt: string;
  owner: string;
}

const sampleDeals: Deal[] = [
  { id: "1", title: "Enterprise License Deal", company: "TechCorp Inc", contact: "John Williams", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", value: 125000, stage: "negotiation", probability: 75, closeDate: "2024-12-20", createdAt: "2024-11-01", owner: "Sarah Johnson" },
  { id: "2", title: "Annual Subscription", company: "Global Solutions", contact: "Sarah Chen", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", value: 48000, stage: "proposal", probability: 50, closeDate: "2024-12-25", createdAt: "2024-11-15", owner: "Mike Chen" },
  { id: "3", title: "Premium Package", company: "StartupXYZ", contact: "Mike Davis", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", value: 32000, stage: "discovery", probability: 25, closeDate: "2025-01-15", createdAt: "2024-12-01", owner: "Emily Davis" },
  { id: "4", title: "Multi-year Contract", company: "Enterprise Ltd", contact: "Emily Brown", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", value: 250000, stage: "closed_won", probability: 100, closeDate: "2024-12-05", createdAt: "2024-10-01", owner: "Sarah Johnson" },
  { id: "5", title: "Pilot Program", company: "SmallBiz Co", contact: "Robert Wilson", contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert", value: 15000, stage: "closed_lost", probability: 0, closeDate: "2024-11-30", createdAt: "2024-10-15", owner: "Mike Chen" }
];

export default function SalesDeals() {
  const [deals] = useState<Deal[]>(sampleDeals);

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const wonValue = deals.filter(d => d.stage === 'closed_won').reduce((sum, d) => sum + d.value, 0);
  const openValue = deals.filter(d => !d.stage.startsWith('closed')).reduce((sum, d) => sum + d.value, 0);
  const winRate = Math.round((deals.filter(d => d.stage === 'closed_won').length / deals.filter(d => d.stage.startsWith('closed')).length) * 100) || 0;

  const getStageBadge = (stage: string) => {
    switch(stage) {
      case 'discovery': return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Discovery</Badge>;
      case 'proposal': return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Proposal</Badge>;
      case 'negotiation': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Negotiation</Badge>;
      case 'closed_won': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Won</Badge>;
      case 'closed_lost': return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Lost</Badge>;
      default: return null;
    }
  };

  const getStageIcon = (stage: string) => {
    switch(stage) {
      case 'closed_won': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'closed_lost': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Deals</h1>
            <p className="text-muted-foreground">Manage and track your sales deals</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Deal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pipeline</p>
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
                    <p className="text-sm text-muted-foreground">Won This Quarter</p>
                    <p className="text-2xl font-bold text-white">${wonValue.toLocaleString()}</p>
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
                    <p className="text-sm text-muted-foreground">Open Deals</p>
                    <p className="text-2xl font-bold text-white">${openValue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Target className="w-6 h-6 text-purple-400" />
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
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-2xl font-bold text-white">{winRate}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <CheckCircle className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>All Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Deal</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id} className="border-white/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getStageIcon(deal.stage)}
                        <div>
                          <div className="font-medium text-white">{deal.title}</div>
                          <div className="text-sm text-muted-foreground">{deal.contact}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{deal.company}</TableCell>
                    <TableCell className="font-semibold text-green-400">${deal.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={deal.probability} className="w-16 h-1" />
                        <span className="text-sm text-muted-foreground">{deal.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStageBadge(deal.stage)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(deal.closeDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-white/20">
                          <AvatarFallback>{deal.owner.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{deal.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
