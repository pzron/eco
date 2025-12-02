import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Headphones, Search, Filter, Plus,
  MessageSquare, Clock, CheckCircle2, AlertCircle, User
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const tickets = [
  { id: "TKT-001", customer: "Sarah Chen", email: "sarah@email.com", subject: "Order delivery delay", priority: "high", status: "open", created: "2 hours ago", messages: 3 },
  { id: "TKT-002", customer: "Mike Johnson", email: "mike@email.com", subject: "Refund request for damaged item", priority: "high", status: "open", created: "4 hours ago", messages: 5 },
  { id: "TKT-003", customer: "Emma Wilson", email: "emma@email.com", subject: "Product inquiry about specifications", priority: "low", status: "pending", created: "6 hours ago", messages: 2 },
  { id: "TKT-004", customer: "David Brown", email: "david@email.com", subject: "Account password reset", priority: "medium", status: "resolved", created: "Yesterday", messages: 4 },
  { id: "TKT-005", customer: "Lisa Park", email: "lisa@email.com", subject: "Warranty claim", priority: "medium", status: "open", created: "Yesterday", messages: 6 },
  { id: "TKT-006", customer: "John Smith", email: "john@email.com", subject: "Shipping address change", priority: "low", status: "resolved", created: "2 days ago", messages: 2 },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-500/20 text-red-400 border-red-500/20",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/20 text-green-400 border-green-500/20",
};

const statusConfig: Record<string, { color: string; icon: any }> = {
  open: { color: "bg-blue-500/20 text-blue-400", icon: AlertCircle },
  pending: { color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  resolved: { color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
};

export default function OfficeSupport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCount = tickets.filter(t => t.status === 'open').length;
  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  return (
    <DashboardLayout role="office_member">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Customer Support</h1>
            <p className="text-white/60">Manage support tickets and customer inquiries</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-violet-500">
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/30">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{openCount}</p>
                  <p className="text-sm text-blue-300">Open</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingCount}</p>
                  <p className="text-sm text-white/60">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{resolvedCount}</p>
                  <p className="text-sm text-white/60">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Headphones className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{tickets.length}</p>
                  <p className="text-sm text-white/60">Total Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-indigo-400" />
                Support Tickets
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "open", "pending", "resolved"].map((status) => (
                    <Button
                      key={status}
                      variant="outline"
                      size="sm"
                      className={`border-white/10 ${statusFilter === status ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20' : 'text-white/60'}`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTickets.map((ticket, i) => {
                const StatusIcon = statusConfig[ticket.status].icon;
                
                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                          {ticket.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-white">{ticket.subject}</p>
                          <p className="text-sm text-white/60">{ticket.customer} • {ticket.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={statusConfig[ticket.status].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/40">
                        <span>{ticket.id}</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> {ticket.messages} messages
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ticket.created}
                        </span>
                      </div>
                      <Button size="sm" className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30">
                        View Ticket
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
