import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Upload, BarChart, MessageSquare, 
  Truck, AlertTriangle, CheckCircle 
} from "lucide-react";

export default function VendorDashboard() {
  return (
    <DashboardLayout role="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Vendor Portal</h1>
            <p className="text-muted-foreground">Manage products, orders, and inventory</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 w-4 h-4" /> Upload New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Overview */}
          <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "#ORD-9382", item: "iPhone 15 Pro Max", status: "Processing", amount: "$1,299", time: "2 mins ago" },
                  { id: "#ORD-9381", item: "Sony WH-1000XM5", status: "Shipped", amount: "$348", time: "1 hour ago" },
                  { id: "#ORD-9380", item: "MacBook Pro 16", status: "Delivered", amount: "$2,499", time: "3 hours ago" },
                ].map((order, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{order.item}</div>
                        <div className="text-xs text-muted-foreground">{order.id} • {order.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-white">{order.amount}</div>
                      <Badge variant="outline" className={`
                        ${order.status === 'Processing' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' : ''}
                        ${order.status === 'Shipped' ? 'text-blue-400 border-blue-400/20 bg-blue-400/10' : ''}
                        ${order.status === 'Delivered' ? 'text-green-400 border-green-400/20 bg-green-400/10' : ''}
                      `}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Health */}
          <div className="space-y-6">
             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
               <CardHeader>
                 <CardTitle className="text-white">Inventory Health</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-3">
                       <AlertTriangle className="w-5 h-5 text-red-500" />
                       <div>
                          <div className="text-sm font-medium text-white">Low Stock Alert</div>
                          <div className="text-xs text-muted-foreground">iPhone 15 Pro (2 left)</div>
                       </div>
                    </div>
                    <Button size="sm" variant="secondary" className="h-7 text-xs">Restock</Button>
                 </div>
                 
                 <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                       <CheckCircle className="w-5 h-5 text-green-500" />
                       <div>
                          <div className="text-sm font-medium text-white">Top Performer</div>
                          <div className="text-xs text-muted-foreground">Sony Headphones</div>
                       </div>
                    </div>
                    <div className="text-xs font-bold text-green-400">+12% Sales</div>
                 </div>
               </CardContent>
             </Card>

             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
               <CardHeader>
                 <CardTitle className="text-white">3D Asset Quality</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                       <Package className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">AI Analysis: Your 3D models are optimized for WebXR.</p>
                    <Button variant="outline" className="w-full border-white/10">View Report</Button>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
