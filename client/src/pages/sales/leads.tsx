import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, UserPlus, Search, Phone, Mail, Building2,
  Star, StarOff, Plus, Filter, MoreVertical, MessageSquare
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: 'website' | 'referral' | 'social' | 'advertising' | 'cold_call';
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  score: number;
  createdAt: string;
  avatar: string;
  starred: boolean;
}

const sampleLeads: Lead[] = [
  { id: "1", name: "Alex Thompson", email: "alex@techcorp.com", phone: "+1 555-0101", company: "TechCorp", source: "website", status: "new", score: 85, createdAt: "2024-12-08", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", starred: true },
  { id: "2", name: "Jessica Lee", email: "jessica@globalsol.com", phone: "+1 555-0102", company: "Global Solutions", source: "referral", status: "contacted", score: 72, createdAt: "2024-12-07", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica", starred: false },
  { id: "3", name: "David Kim", email: "david@startupxyz.com", phone: "+1 555-0103", company: "StartupXYZ", source: "social", status: "qualified", score: 90, createdAt: "2024-12-06", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", starred: true },
  { id: "4", name: "Maria Garcia", email: "maria@enterprise.com", phone: "+1 555-0104", company: "Enterprise Ltd", source: "advertising", status: "new", score: 65, createdAt: "2024-12-05", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", starred: false },
  { id: "5", name: "James Wilson", email: "james@megacorp.com", phone: "+1 555-0105", company: "MegaCorp", source: "cold_call", status: "unqualified", score: 30, createdAt: "2024-12-04", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", starred: false }
];

export default function SalesLeads() {
  const [leads, setLeads] = useState<Lead[]>(sampleLeads);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStar = (id: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, starred: !lead.starred } : lead
    ));
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new': return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">New</Badge>;
      case 'contacted': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Contacted</Badge>;
      case 'qualified': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Qualified</Badge>;
      case 'unqualified': return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Unqualified</Badge>;
      default: return null;
    }
  };

  const getSourceBadge = (source: string) => {
    const colors: Record<string, string> = {
      website: 'bg-purple-500/20 text-purple-400',
      referral: 'bg-green-500/20 text-green-400',
      social: 'bg-blue-500/20 text-blue-400',
      advertising: 'bg-orange-500/20 text-orange-400',
      cold_call: 'bg-gray-500/20 text-gray-400'
    };
    return <Badge className={colors[source]}>{source.replace('_', ' ')}</Badge>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Leads Management</h1>
            <p className="text-muted-foreground">Track and qualify your sales leads</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Full name" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input placeholder="Company name" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@company.com" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+1 555-0000" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <Button className="w-full mt-2">Add Lead</Button>
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
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold text-white">{leads.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Users className="w-6 h-6 text-blue-400" />
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
                    <p className="text-sm text-muted-foreground">New Leads</p>
                    <p className="text-2xl font-bold text-white">{leads.filter(l => l.status === 'new').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <UserPlus className="w-6 h-6 text-green-400" />
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
                    <p className="text-sm text-muted-foreground">Qualified</p>
                    <p className="text-2xl font-bold text-white">{leads.filter(l => l.status === 'qualified').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Star className="w-6 h-6 text-purple-400" />
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
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold text-white">{Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Star className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>All Leads</CardTitle>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search leads..." 
                    className="pl-9 bg-white/5 border-white/10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-white/10">
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => toggleStar(lead.id)}
                      >
                        {lead.starred ? (
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={lead.avatar} />
                          <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {lead.company}
                      </div>
                    </TableCell>
                    <TableCell>{getSourceBadge(lead.source)}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="w-4 h-4" />
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
