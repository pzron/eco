import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, Plus, Search, Filter, MoreVertical,
  Clock, CheckCircle2, XCircle, Calendar, Mail, Phone
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const teamMembers = [
  { id: 1, name: "Sarah Chen", role: "Cashier", status: "active", shift: "Morning", avatar: "SC", email: "sarah@store.com", phone: "+880 1712-345678", performance: 95 },
  { id: 2, name: "Mike Johnson", role: "Stockkeeper", status: "active", shift: "Morning", avatar: "MJ", email: "mike@store.com", phone: "+880 1712-345679", performance: 88 },
  { id: 3, name: "Emma Wilson", role: "Cashier", status: "active", shift: "Evening", avatar: "EW", email: "emma@store.com", phone: "+880 1712-345680", performance: 92 },
  { id: 4, name: "John Smith", role: "Office Member", status: "break", shift: "Morning", avatar: "JS", email: "john@store.com", phone: "+880 1712-345681", performance: 85 },
  { id: 5, name: "Lisa Park", role: "Stockkeeper", status: "off", shift: "Night", avatar: "LP", email: "lisa@store.com", phone: "+880 1712-345682", performance: 90 },
  { id: 6, name: "David Brown", role: "Cashier", status: "active", shift: "Evening", avatar: "DB", email: "david@store.com", phone: "+880 1712-345683", performance: 87 },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/20",
  break: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  off: "bg-gray-500/20 text-gray-400 border-gray-500/20",
};

export default function ManagerTeam() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Team Management</h1>
            <p className="text-white/60">Manage your store team members and schedules</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-sm text-white/60">Active Now</p>
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
                  <p className="text-2xl font-bold text-white">1</p>
                  <p className="text-sm text-white/60">On Break</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-500/20">
                  <XCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1</p>
                  <p className="text-sm text-white/60">Off Duty</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-sm text-white/60">Total Team</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Team Members
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search team..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border border-white/20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                        <p className="text-sm text-white/60">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white/40 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Status</span>
                      <Badge className={statusColors[member.status]}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Shift</span>
                      <span className="text-sm text-white">{member.shift}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Performance</span>
                      <span className={`text-sm font-medium ${member.performance >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {member.performance}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                    <Button variant="outline" size="sm" className="flex-1 border-white/10 text-white/60">
                      <Mail className="w-3 h-3 mr-1" /> Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-white/10 text-white/60">
                      <Calendar className="w-3 h-3 mr-1" /> Schedule
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
