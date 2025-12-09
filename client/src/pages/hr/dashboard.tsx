import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Users, UserPlus, Calendar, Clock, FileText, Award,
  TrendingUp, Building, Briefcase, GraduationCap,
  Heart, DollarSign, ArrowUpRight, Bell, Search,
  Mail, Phone, MapPin, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const employees = [
  { id: 1, name: "Rahim Ahmed", role: "Senior Developer", department: "Engineering", status: "active", avatar: "RA", joinDate: "Jan 2022" },
  { id: 2, name: "Fatima Khan", role: "Marketing Manager", department: "Marketing", status: "active", avatar: "FK", joinDate: "Mar 2021" },
  { id: 3, name: "Kamal Hossain", role: "Sales Lead", department: "Sales", status: "on-leave", avatar: "KH", joinDate: "Jun 2020" },
  { id: 4, name: "Nusrat Jahan", role: "HR Specialist", department: "HR", status: "active", avatar: "NJ", joinDate: "Aug 2023" },
  { id: 5, name: "Arif Rahman", role: "Product Designer", department: "Design", status: "active", avatar: "AR", joinDate: "Feb 2023" },
];

const leaveRequests = [
  { id: 1, employee: "Kamal Hossain", type: "Sick Leave", days: 3, from: "Dec 10", to: "Dec 12", status: "pending" },
  { id: 2, employee: "Fatima Khan", type: "Vacation", days: 5, from: "Dec 20", to: "Dec 24", status: "approved" },
  { id: 3, employee: "Arif Rahman", type: "Personal", days: 1, from: "Dec 15", to: "Dec 15", status: "pending" },
];

const upcomingEvents = [
  { title: "Team Building Event", date: "Dec 15", type: "event", icon: Heart },
  { title: "Performance Reviews", date: "Dec 20", type: "review", icon: Award },
  { title: "New Employee Orientation", date: "Dec 22", type: "onboarding", icon: UserPlus },
  { title: "Year-End Party", date: "Dec 28", type: "party", icon: Calendar },
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
  const glowColors = {
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

function StatCard({ title, value, change, icon: Icon, color, delay = 0 }: any) {
  const colorClasses: Record<string, string> = {
    purple: "text-purple-400 bg-purple-500/20",
    pink: "text-pink-400 bg-pink-500/20",
    cyan: "text-cyan-400 bg-cyan-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    blue: "text-blue-400 bg-blue-500/20",
  };

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
            {change && (
              <div className="flex items-center gap-1 text-xs font-medium text-green-400">
                <ArrowUpRight className="w-3 h-3" />
                {change}
              </div>
            )}
          </div>
          <h3 className="text-xs font-medium text-white/60 mb-1">{title}</h3>
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

export default function HRDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="hr">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                HR Dashboard
              </h1>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                Human Resources
              </Badge>
            </div>
            <p className="text-white/60">Manage employees, leave requests, and company culture</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Employees" value="156" change="+5" icon={Users} color="blue" delay={0} />
          <StatCard title="New Hires" value="12" change="+3" icon={UserPlus} color="green" delay={0.1} />
          <StatCard title="On Leave" value="8" icon={Calendar} color="orange" delay={0.2} />
          <StatCard title="Open Positions" value="5" icon={Briefcase} color="purple" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <HolographicCard glowColor="blue">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Employee Directory</h3>
                      <p className="text-sm text-white/60">All team members</p>
                    </div>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input 
                      placeholder="Search employees..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {filteredEmployees.map((employee, i) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                          {employee.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-white">{employee.name}</p>
                          <p className="text-sm text-white/60">{employee.role} • {employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={employee.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}>
                          {employee.status === 'active' ? 'Active' : 'On Leave'}
                        </Badge>
                        <span className="text-sm text-white/40">{employee.joinDate}</span>
                        <ChevronRight className="w-4 h-4 text-white/40" />
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
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <HolographicCard glowColor="orange">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Calendar className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Leave Requests</h3>
                </div>
                
                <div className="space-y-3">
                  {leaveRequests.map((request, i) => (
                    <div
                      key={request.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm">{request.employee}</span>
                        <Badge className={request.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/60">{request.type} • {request.days} days</p>
                      <p className="text-xs text-white/40">{request.from} - {request.to}</p>
                      {request.status === 'pending' && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" className="h-7 bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs">Approve</Button>
                          <Button size="sm" variant="ghost" className="h-7 text-red-400 hover:bg-red-500/20 text-xs">Reject</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </HolographicCard>

            <HolographicCard glowColor="purple">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                </div>
                
                <div className="space-y-3">
                  {upcomingEvents.map((event, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <event.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{event.title}</p>
                        <p className="text-xs text-white/60">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: "Payroll", desc: "Manage salaries", color: "green" },
            { icon: GraduationCap, label: "Training", desc: "Learning programs", color: "blue" },
            { icon: Award, label: "Performance", desc: "Reviews & goals", color: "purple" },
            { icon: Building, label: "Departments", desc: "Team structure", color: "cyan" },
          ].map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <HolographicCard glowColor={action.color as any}>
                <div className="p-5 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-${action.color}-500/20 flex items-center justify-center`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-400`} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{action.label}</p>
                    <p className="text-sm text-white/60">{action.desc}</p>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
