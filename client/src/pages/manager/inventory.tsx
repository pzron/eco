import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Boxes, AlertTriangle, Package, TrendingDown,
  Search, Filter, ArrowUpDown
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const inventoryItems = [
  { id: 1, name: "iPhone 15 Pro", sku: "IPH-15P-256", category: "Electronics", stock: 45, minStock: 20, status: "healthy" },
  { id: 2, name: "MacBook Air M3", sku: "MBA-M3-256", category: "Electronics", stock: 8, minStock: 15, status: "low" },
  { id: 3, name: "AirPods Pro 2", sku: "APP-2-WHT", category: "Electronics", stock: 156, minStock: 50, status: "healthy" },
  { id: 4, name: "Nike Air Max", sku: "NAM-BLK-42", category: "Fashion", stock: 3, minStock: 10, status: "critical" },
  { id: 5, name: "Samsung TV 55", sku: "STV-55-4K", category: "Electronics", stock: 12, minStock: 10, status: "healthy" },
  { id: 6, name: "Smart Watch Pro", sku: "SWP-BLK-L", category: "Electronics", stock: 0, minStock: 15, status: "out" },
];

const statusColors: Record<string, string> = {
  healthy: "bg-green-500/20 text-green-400 border-green-500/20",
  low: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  critical: "bg-orange-500/20 text-orange-400 border-orange-500/20",
  out: "bg-red-500/20 text-red-400 border-red-500/20",
};

export default function ManagerInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = inventoryItems.filter(i => i.status === 'low' || i.status === 'critical').length;
  const outOfStockCount = inventoryItems.filter(i => i.status === 'out').length;

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Inventory Control</h1>
            <p className="text-white/60">Monitor and manage stock levels</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Package className="w-4 h-4 mr-2" />
            Order Stock
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Boxes className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{inventoryItems.length}</p>
                  <p className="text-sm text-white/60">Total Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Package className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">224</p>
                  <p className="text-sm text-white/60">Total Units</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <TrendingDown className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{lowStockCount}</p>
                  <p className="text-sm text-white/60">Low Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{outOfStockCount}</p>
                  <p className="text-sm text-white/60">Out of Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-blue-400" />
                Inventory Items
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search products..."
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-0">
                        Product <ArrowUpDown className="w-3 h-3 ml-1 inline" />
                      </Button>
                    </th>
                    <th className="text-left text-sm text-white/60 pb-3">SKU</th>
                    <th className="text-left text-sm text-white/60 pb-3">Category</th>
                    <th className="text-center text-sm text-white/60 pb-3">Stock Level</th>
                    <th className="text-center text-sm text-white/60 pb-3">Status</th>
                    <th className="text-right text-sm text-white/60 pb-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 text-white font-medium">{item.name}</td>
                      <td className="py-4 text-white/60 font-mono text-sm">{item.sku}</td>
                      <td className="py-4">
                        <Badge variant="outline" className="border-white/10 text-white/60">
                          {item.category}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-white text-sm">{item.stock} / {item.minStock}</span>
                          <Progress 
                            value={Math.min((item.stock / item.minStock) * 100, 100)} 
                            className="w-24 h-1.5"
                          />
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <Badge className={statusColors[item.status]}>
                          {item.status === 'out' ? 'Out of Stock' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 text-right">
                        <Button size="sm" variant="outline" className="border-white/10 text-white/60 hover:text-white">
                          Reorder
                        </Button>
                      </td>
                    </tr>
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
