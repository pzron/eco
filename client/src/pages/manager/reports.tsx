import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Calendar, TrendingUp,
  Users, Package, DollarSign, Clock
} from "lucide-react";
import { motion } from "framer-motion";

const reports = [
  { id: 1, name: "Daily Sales Report", type: "Sales", lastGenerated: "Today, 6:00 PM", status: "ready", icon: DollarSign },
  { id: 2, name: "Inventory Status", type: "Inventory", lastGenerated: "Today, 5:30 PM", status: "ready", icon: Package },
  { id: 3, name: "Team Performance", type: "HR", lastGenerated: "Today, 4:00 PM", status: "ready", icon: Users },
  { id: 4, name: "Weekly Analytics", type: "Analytics", lastGenerated: "Processing...", status: "processing", icon: TrendingUp },
  { id: 5, name: "Customer Insights", type: "Marketing", lastGenerated: "Yesterday", status: "ready", icon: Users },
  { id: 6, name: "Shift Summary", type: "Operations", lastGenerated: "Today, 2:00 PM", status: "ready", icon: Clock },
];

const quickStats = [
  { label: "Reports Generated Today", value: "12", change: "+3" },
  { label: "Scheduled Reports", value: "8", change: "0" },
  { label: "Pending Approvals", value: "3", change: "-2" },
  { label: "Team Submissions", value: "15", change: "+5" },
];

export default function ManagerReports() {
  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Reports</h1>
            <p className="text-white/60">Generate and view store reports</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <FileText className="w-4 h-4 mr-2" />
              Generate New
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <Card key={stat.label} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60 mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : stat.change === '0' ? 'text-white/40' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Available Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <report.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{report.name}</p>
                        <p className="text-xs text-white/60">{report.type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-white/40">{report.lastGenerated}</span>
                    <Badge className={report.status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                      {report.status === 'ready' ? 'Ready' : 'Processing'}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                      disabled={report.status !== 'ready'}
                    >
                      <Download className="w-3 h-3 mr-1" /> Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white/60">
                      View
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
