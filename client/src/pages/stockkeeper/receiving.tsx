import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, Package, CheckCircle2, Clock,
  Search, Plus, Scan, FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const pendingShipments = [
  { id: "SHP-001", supplier: "Apple Warehouse", items: 5, units: 150, eta: "Today, 2:00 PM", status: "arriving" },
  { id: "SHP-002", supplier: "Samsung Distribution", items: 3, units: 75, eta: "Today, 4:30 PM", status: "arriving" },
  { id: "SHP-003", supplier: "Nike Factory", items: 8, units: 200, eta: "Tomorrow", status: "in_transit" },
  { id: "SHP-004", supplier: "Sony Electronics", items: 2, units: 30, eta: "Dec 5", status: "in_transit" },
];

const recentReceived = [
  { id: "RCV-001", supplier: "Apple Warehouse", items: 3, units: 50, receivedAt: "Today, 10:30 AM", receivedBy: "You" },
  { id: "RCV-002", supplier: "Dell Distribution", items: 2, units: 25, receivedAt: "Today, 9:15 AM", receivedBy: "Mike J." },
  { id: "RCV-003", supplier: "LG Electronics", items: 4, units: 60, receivedAt: "Yesterday", receivedBy: "Sarah C." },
];

const statusColors: Record<string, string> = {
  arriving: "bg-green-500/20 text-green-400",
  in_transit: "bg-blue-500/20 text-blue-400",
  delayed: "bg-red-500/20 text-red-400",
};

export default function StockkeeperReceiving() {
  const [activeTab, setActiveTab] = useState<'pending' | 'received'>('pending');

  return (
    <DashboardLayout role="stockkeeper">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Receiving</h1>
            <p className="text-white/60">Manage incoming shipments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Scan className="w-4 h-4 mr-2" />
              Scan Barcode
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-yellow-500">
              <Plus className="w-4 h-4 mr-2" />
              Manual Entry
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Truck className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-sm text-white/60">Arriving Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Package className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-sm text-white/60">Pending Shipments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">135</p>
                  <p className="text-sm text-white/60">Units Received Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">455</p>
                  <p className="text-sm text-white/60">Units Expected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`border-white/10 ${activeTab === 'pending' ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' : 'text-white/60'}`}
                  onClick={() => setActiveTab('pending')}
                >
                  Pending Shipments
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 ${activeTab === 'received' ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' : 'text-white/60'}`}
                  onClick={() => setActiveTab('received')}
                >
                  Recently Received
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === 'pending' ? (
              <div className="space-y-4">
                {pendingShipments.map((shipment, i) => (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/20">
                          <Truck className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{shipment.supplier}</p>
                          <p className="text-sm text-white/60">{shipment.id}</p>
                        </div>
                      </div>
                      <Badge className={statusColors[shipment.status]}>
                        {shipment.status === 'arriving' ? 'Arriving Today' : 'In Transit'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-white/40">Items</p>
                        <p className="text-white font-medium">{shipment.items} SKUs</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40">Units</p>
                        <p className="text-white font-medium">{shipment.units} units</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40">ETA</p>
                        <p className="text-white font-medium">{shipment.eta}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Receive
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/10 text-white/60">
                        <FileText className="w-4 h-4 mr-1" /> Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-sm text-white/60 pb-3">ID</th>
                      <th className="text-left text-sm text-white/60 pb-3">Supplier</th>
                      <th className="text-center text-sm text-white/60 pb-3">Items</th>
                      <th className="text-center text-sm text-white/60 pb-3">Units</th>
                      <th className="text-center text-sm text-white/60 pb-3">Received At</th>
                      <th className="text-center text-sm text-white/60 pb-3">Received By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReceived.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-b border-white/5"
                      >
                        <td className="py-4 font-mono text-sm text-white">{item.id}</td>
                        <td className="py-4 text-white">{item.supplier}</td>
                        <td className="py-4 text-center text-white/60">{item.items}</td>
                        <td className="py-4 text-center text-white/60">{item.units}</td>
                        <td className="py-4 text-center text-white/60">{item.receivedAt}</td>
                        <td className="py-4 text-center text-white/60">{item.receivedBy}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
