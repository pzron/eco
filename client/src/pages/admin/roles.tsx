import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Users, Plus, Edit, Trash2,
  CheckCircle2, XCircle, Settings, Crown,
  Briefcase, CreditCard, Package, FileText,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Role {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  userCount: number;
  permissions: string[];
}

const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    userCount: 2,
    permissions: ["Full Access", "User Management", "System Settings", "Role Management", "Analytics", "All Operations"]
  },
  {
    id: "manager",
    name: "Manager",
    description: "Store management and team supervision",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
    userCount: 4,
    permissions: ["Team Management", "Sales Overview", "Inventory Control", "Reports", "Schedules", "Approvals"]
  },
  {
    id: "cashier",
    name: "Cashier",
    description: "Point of sale and transaction processing",
    icon: CreditCard,
    color: "from-green-500 to-emerald-500",
    userCount: 8,
    permissions: ["POS Access", "Process Transactions", "Refunds", "Daily Summary", "Quick Orders"]
  },
  {
    id: "stockkeeper",
    name: "Stockkeeper",
    description: "Inventory and warehouse management",
    icon: Package,
    color: "from-orange-500 to-yellow-500",
    userCount: 3,
    permissions: ["Inventory Management", "Receiving Stock", "Stock Transfers", "Stock Alerts", "Warehouse Access"]
  },
  {
    id: "office_member",
    name: "Office Member",
    description: "Administrative and customer support tasks",
    icon: FileText,
    color: "from-indigo-500 to-violet-500",
    userCount: 5,
    permissions: ["Documents", "Reports", "Customer Support", "Communications", "Data Entry"]
  },
  {
    id: "vendor",
    name: "Vendor",
    description: "Product management and sales tracking",
    icon: Users,
    color: "from-rose-500 to-red-500",
    userCount: 12,
    permissions: ["Own Products", "Sales & Payouts", "Store Settings", "Order Fulfillment"]
  },
  {
    id: "affiliate",
    name: "Affiliate",
    description: "Marketing campaigns and commission tracking",
    icon: Users,
    color: "from-teal-500 to-green-500",
    userCount: 25,
    permissions: ["Campaign Management", "Earnings Tracking", "Link Generation", "Profile Settings"]
  },
  {
    id: "customer",
    name: "Customer",
    description: "Standard customer account access",
    icon: Users,
    color: "from-gray-500 to-slate-500",
    userCount: 1520,
    permissions: ["Browse Products", "Make Purchases", "Order History", "Wishlist", "Reviews"]
  },
];

const allPermissions = [
  { id: "users", label: "User Management", category: "Administration" },
  { id: "products", label: "Product Management", category: "Operations" },
  { id: "orders", label: "Order Management", category: "Operations" },
  { id: "analytics", label: "View Analytics", category: "Reports" },
  { id: "inventory", label: "Inventory Control", category: "Operations" },
  { id: "payments", label: "Process Payments", category: "Finance" },
  { id: "reports", label: "Generate Reports", category: "Reports" },
  { id: "settings", label: "System Settings", category: "Administration" },
  { id: "approvals", label: "Approve Requests", category: "Administration" },
  { id: "team", label: "Team Management", category: "HR" },
  { id: "pos", label: "POS Access", category: "Sales" },
  { id: "stock", label: "Stock Management", category: "Operations" },
  { id: "documents", label: "Document Access", category: "Administration" },
  { id: "support", label: "Customer Support", category: "Service" },
];

export default function AdminRoles() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Role Management</h1>
            <p className="text-white/60">Configure roles and permissions for store management</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{roles.length}</p>
                  <p className="text-sm text-white/60">Total Roles</p>
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
                  <p className="text-2xl font-bold text-white">{roles.reduce((sum, r) => sum + r.userCount, 0)}</p>
                  <p className="text-sm text-white/60">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Settings className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{allPermissions.length}</p>
                  <p className="text-sm text-white/60">Permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Briefcase className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-sm text-white/60">Staff Roles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  System Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role, i) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedRole(role)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedRole?.id === role.id 
                          ? 'bg-purple-500/20 border-purple-500/40' 
                          : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color} bg-opacity-20`}>
                          <role.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-white">{role.name}</h3>
                            <Badge variant="outline" className="border-white/20 text-white/60">
                              {role.userCount} users
                            </Badge>
                          </div>
                          <p className="text-sm text-white/60 mb-3">{role.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((perm, j) => (
                              <Badge key={j} className="bg-white/10 text-white/70 text-xs">
                                {perm}
                              </Badge>
                            ))}
                            {role.permissions.length > 3 && (
                              <Badge className="bg-white/10 text-white/70 text-xs">
                                +{role.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/5 border-white/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">
                  {selectedRole ? `${selectedRole.name} Permissions` : 'Select a Role'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRole ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <selectedRole.icon className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="font-medium text-white">{selectedRole.name}</p>
                        <p className="text-xs text-white/60">{selectedRole.userCount} users assigned</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white/80">Permissions</h4>
                      {selectedRole.permissions.map((perm, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-white">{perm}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <Button className="w-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Permissions
                      </Button>
                      <Button variant="outline" className="w-full border-white/10 text-white/60">
                        <Users className="w-4 h-4 mr-2" />
                        View Users
                      </Button>
                      {!['admin', 'customer'].includes(selectedRole.id) && (
                        <Button variant="outline" className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Role
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-white/20" />
                    <p className="text-white/40">Select a role to view and edit its permissions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Role Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3 pr-4">Permission</th>
                    {roles.slice(0, 5).map(role => (
                      <th key={role.id} className="text-center text-sm text-white/60 pb-3 px-2">
                        <div className="flex flex-col items-center gap-1">
                          <role.icon className="w-4 h-4" />
                          <span>{role.name.split(' ')[0]}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allPermissions.slice(0, 8).map((perm, i) => (
                    <tr key={perm.id} className="border-b border-white/5">
                      <td className="py-3 pr-4">
                        <div>
                          <p className="text-sm text-white">{perm.label}</p>
                          <p className="text-xs text-white/40">{perm.category}</p>
                        </div>
                      </td>
                      {roles.slice(0, 5).map(role => (
                        <td key={role.id} className="py-3 text-center">
                          {role.id === 'admin' || (i < 3 && role.id === 'manager') ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                          ) : Math.random() > 0.5 ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-white/20 mx-auto" />
                          )}
                        </td>
                      ))}
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
