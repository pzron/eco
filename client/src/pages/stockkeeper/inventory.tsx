import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Boxes, Search, Filter, ArrowUpDown, 
  Plus, Minus, Edit, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const inventoryData = [
  { id: 1, name: "iPhone 15 Pro", sku: "IPH-15P-256", location: "A1-01", stock: 45, min: 20, max: 100, status: "healthy" },
  { id: 2, name: "MacBook Air M3", sku: "MBA-M3-256", location: "B2-03", stock: 8, min: 15, max: 50, status: "low" },
  { id: 3, name: "AirPods Pro 2", sku: "APP-2-WHT", location: "A3-12", stock: 156, min: 50, max: 200, status: "healthy" },
  { id: 4, name: "Nike Air Max", sku: "NAM-BLK-42", location: "C1-05", stock: 3, min: 10, max: 40, status: "critical" },
  { id: 5, name: "Samsung TV 55\"", sku: "STV-55-4K", location: "D1-01", stock: 12, min: 10, max: 30, status: "healthy" },
  { id: 6, name: "Smart Watch Pro", sku: "SWP-BLK-L", location: "A2-08", stock: 0, min: 15, max: 60, status: "out" },
  { id: 7, name: "Coffee Maker Pro", sku: "CFM-PRO-01", location: "E2-04", stock: 25, min: 8, max: 35, status: "healthy" },
  { id: 8, name: "Gaming Mouse RGB", sku: "GMR-RGB-01", location: "A4-15", stock: 67, min: 20, max: 100, status: "healthy" },
];

const statusColors: Record<string, string> = {
  healthy: "bg-green-500/20 text-green-400",
  low: "bg-yellow-500/20 text-yellow-400",
  critical: "bg-orange-500/20 text-orange-400",
  out: "bg-red-500/20 text-red-400",
};

export default function StockkeeperInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredItems = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout role="stockkeeper">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Inventory</h1>
            <p className="text-white/60">Manage warehouse stock levels</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </motion.div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-orange-400" />
                All Items
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search by name, SKU, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50 w-64"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="low">Low</option>
                  <option value="critical">Critical</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3">Product</th>
                    <th className="text-left text-sm text-white/60 pb-3">SKU</th>
                    <th className="text-center text-sm text-white/60 pb-3">Location</th>
                    <th className="text-center text-sm text-white/60 pb-3">Stock Level</th>
                    <th className="text-center text-sm text-white/60 pb-3">Status</th>
                    <th className="text-right text-sm text-white/60 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-white font-medium">{item.name}</td>
                      <td className="py-4 font-mono text-sm text-white/60">{item.sku}</td>
                      <td className="py-4 text-center">
                        <Badge variant="outline" className="border-white/10 text-white/60">
                          {item.location}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.stock}</span>
                            <span className="text-white/40 text-sm">/ {item.max}</span>
                          </div>
                          <Progress 
                            value={(item.stock / item.max) * 100}
                            className="w-24 h-1.5"
                          />
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <Badge className={statusColors[item.status]}>
                          {item.status === 'out' ? 'Out of Stock' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 text-green-400 hover:text-green-300">
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-orange-400 hover:text-orange-300">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-white/60 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
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
