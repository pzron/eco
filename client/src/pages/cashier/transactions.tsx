import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, Search, Filter, Download, Eye,
  RefreshCw, CheckCircle2, XCircle, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const transactions = [
  { id: "TXN-20241202-001", customer: "Walk-in", amount: 12500, items: 3, method: "Cash", status: "completed", time: "10:32 AM" },
  { id: "TXN-20241202-002", customer: "Sarah Chen", amount: 34500, items: 5, method: "Card", status: "completed", time: "10:15 AM" },
  { id: "TXN-20241202-003", customer: "Mike Johnson", amount: 8900, items: 2, method: "Mobile", status: "refunded", time: "9:45 AM" },
  { id: "TXN-20241202-004", customer: "Walk-in", amount: 21000, items: 4, method: "Cash", status: "completed", time: "9:30 AM" },
  { id: "TXN-20241202-005", customer: "Emma Wilson", amount: 15600, items: 3, method: "QR", status: "completed", time: "9:12 AM" },
  { id: "TXN-20241202-006", customer: "Walk-in", amount: 4500, items: 1, method: "Cash", status: "pending", time: "8:55 AM" },
  { id: "TXN-20241202-007", customer: "David Brown", amount: 67800, items: 6, method: "Card", status: "completed", time: "8:30 AM" },
];

const statusIcons: Record<string, any> = {
  completed: CheckCircle2,
  refunded: RefreshCw,
  pending: Clock,
  cancelled: XCircle,
};

const statusColors: Record<string, string> = {
  completed: "bg-green-500/20 text-green-400 border-green-500/20",
  refunded: "bg-orange-500/20 text-orange-400 border-orange-500/20",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/20",
};

const methodColors: Record<string, string> = {
  Cash: "bg-green-500/10 text-green-400",
  Card: "bg-blue-500/10 text-blue-400",
  Mobile: "bg-purple-500/10 text-purple-400",
  QR: "bg-cyan-500/10 text-cyan-400",
};

export default function CashierTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayTotal = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout role="cashier">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Transactions</h1>
            <p className="text-white/60">View and manage all sales transactions</p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-white/60 mb-1">Today's Total</p>
              <p className="text-2xl font-bold text-white">৳{todayTotal.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <p className="text-sm text-white/60 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-400">{transactions.filter(t => t.status === 'completed').length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <p className="text-sm text-white/60 mb-1">Refunded</p>
              <p className="text-2xl font-bold text-orange-400">{transactions.filter(t => t.status === 'refunded').length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <p className="text-sm text-white/60 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{transactions.filter(t => t.status === 'pending').length}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-green-400" />
                Transaction History
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-green-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3">Transaction ID</th>
                    <th className="text-left text-sm text-white/60 pb-3">Customer</th>
                    <th className="text-center text-sm text-white/60 pb-3">Items</th>
                    <th className="text-center text-sm text-white/60 pb-3">Method</th>
                    <th className="text-right text-sm text-white/60 pb-3">Amount</th>
                    <th className="text-center text-sm text-white/60 pb-3">Status</th>
                    <th className="text-center text-sm text-white/60 pb-3">Time</th>
                    <th className="text-right text-sm text-white/60 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn, i) => {
                    const StatusIcon = statusIcons[txn.status];
                    return (
                      <motion.tr
                        key={txn.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 font-mono text-sm text-white">{txn.id}</td>
                        <td className="py-4 text-white">{txn.customer}</td>
                        <td className="py-4 text-center text-white/60">{txn.items}</td>
                        <td className="py-4 text-center">
                          <Badge className={methodColors[txn.method]}>{txn.method}</Badge>
                        </td>
                        <td className="py-4 text-right font-bold text-white">৳{txn.amount.toLocaleString()}</td>
                        <td className="py-4 text-center">
                          <Badge className={statusColors[txn.status]}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 text-center text-white/60 text-sm">{txn.time}</td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 text-white/60 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {txn.status === 'completed' && (
                              <Button size="sm" variant="ghost" className="h-8 text-orange-400 hover:text-orange-300">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
