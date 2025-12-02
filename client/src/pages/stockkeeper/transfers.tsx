import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeftRight, Package, CheckCircle2, Clock,
  Plus, ArrowRight, Building2
} from "lucide-react";
import { motion } from "framer-motion";

const pendingTransfers = [
  { id: "TRF-001", product: "iPhone 15 Pro", quantity: 10, from: "Warehouse A1", to: "Floor Display", status: "pending", requestedBy: "Floor Manager" },
  { id: "TRF-002", product: "MacBook Air M3", quantity: 5, from: "Warehouse B2", to: "Showroom", status: "in_progress", requestedBy: "Sales Team" },
  { id: "TRF-003", product: "AirPods Pro 2", quantity: 25, from: "Storage C3", to: "Floor Display", status: "pending", requestedBy: "Cashier" },
];

const recentTransfers = [
  { id: "TRF-098", product: "Samsung TV 55\"", quantity: 3, from: "Warehouse D1", to: "Floor Display", completedAt: "Today, 11:30 AM" },
  { id: "TRF-097", product: "Nike Air Max", quantity: 15, from: "Storage A2", to: "Showroom", completedAt: "Today, 9:45 AM" },
  { id: "TRF-096", product: "Coffee Maker", quantity: 8, from: "Warehouse E1", to: "Accessories Section", completedAt: "Yesterday" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
};

export default function StockkeeperTransfers() {
  return (
    <DashboardLayout role="stockkeeper">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Transfers</h1>
            <p className="text-white/60">Manage internal stock transfers</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-500">
            <Plus className="w-4 h-4 mr-2" />
            New Transfer
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingTransfers.filter(t => t.status === 'pending').length}</p>
                  <p className="text-sm text-white/60">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <ArrowLeftRight className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingTransfers.filter(t => t.status === 'in_progress').length}</p>
                  <p className="text-sm text-white/60">In Progress</p>
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
                  <p className="text-2xl font-bold text-white">26</p>
                  <p className="text-sm text-white/60">Completed Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-orange-400" />
              Pending Transfer Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTransfers.map((transfer, i) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-500/20">
                        <Package className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{transfer.product}</p>
                        <p className="text-sm text-white/60">{transfer.id} • {transfer.quantity} units</p>
                      </div>
                    </div>
                    <Badge className={statusColors[transfer.status]}>
                      {transfer.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-white/5">
                    <div className="flex-1 text-center">
                      <p className="text-xs text-white/40 mb-1">From</p>
                      <div className="flex items-center justify-center gap-2">
                        <Building2 className="w-4 h-4 text-white/60" />
                        <span className="text-white">{transfer.from}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-400" />
                    <div className="flex-1 text-center">
                      <p className="text-xs text-white/40 mb-1">To</p>
                      <div className="flex items-center justify-center gap-2">
                        <Building2 className="w-4 h-4 text-white/60" />
                        <span className="text-white">{transfer.to}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Requested by: {transfer.requestedBy}</span>
                    <div className="flex gap-2">
                      {transfer.status === 'pending' && (
                        <Button size="sm" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                          Start Transfer
                        </Button>
                      )}
                      {transfer.status === 'in_progress' && (
                        <Button size="sm" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Complete
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-white/10 text-white/60">
                        Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Recently Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3">ID</th>
                    <th className="text-left text-sm text-white/60 pb-3">Product</th>
                    <th className="text-center text-sm text-white/60 pb-3">Quantity</th>
                    <th className="text-center text-sm text-white/60 pb-3">From</th>
                    <th className="text-center text-sm text-white/60 pb-3">To</th>
                    <th className="text-right text-sm text-white/60 pb-3">Completed At</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransfers.map((transfer, i) => (
                    <motion.tr
                      key={transfer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-b border-white/5"
                    >
                      <td className="py-4 font-mono text-sm text-white">{transfer.id}</td>
                      <td className="py-4 text-white">{transfer.product}</td>
                      <td className="py-4 text-center text-white/60">{transfer.quantity}</td>
                      <td className="py-4 text-center text-white/60">{transfer.from}</td>
                      <td className="py-4 text-center text-white/60">{transfer.to}</td>
                      <td className="py-4 text-right text-white/40">{transfer.completedAt}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
