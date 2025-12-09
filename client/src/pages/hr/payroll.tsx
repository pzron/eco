import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, Users, CreditCard, Calendar, Download,
  TrendingUp, FileText, CheckCircle
} from "lucide-react";

interface PayrollRecord {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'pending' | 'processed' | 'paid';
  payDate: string;
}

const samplePayroll: PayrollRecord[] = [
  { id: "1", employeeName: "John Smith", employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", department: "Engineering", baseSalary: 8500, bonus: 1200, deductions: 850, netPay: 8850, status: "paid", payDate: "2024-12-01" },
  { id: "2", employeeName: "Sarah Johnson", employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", department: "Marketing", baseSalary: 7200, bonus: 800, deductions: 720, netPay: 7280, status: "paid", payDate: "2024-12-01" },
  { id: "3", employeeName: "Mike Chen", employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", department: "Sales", baseSalary: 6500, bonus: 1500, deductions: 650, netPay: 7350, status: "processed", payDate: "2024-12-15" },
  { id: "4", employeeName: "Emily Davis", employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", department: "HR", baseSalary: 6000, bonus: 600, deductions: 600, netPay: 6000, status: "pending", payDate: "2024-12-15" },
  { id: "5", employeeName: "Robert Wilson", employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert", department: "Finance", baseSalary: 7800, bonus: 900, deductions: 780, netPay: 7920, status: "pending", payDate: "2024-12-15" }
];

export default function HRPayroll() {
  const [payrollRecords] = useState<PayrollRecord[]>(samplePayroll);
  const [selectedMonth, setSelectedMonth] = useState("december");

  const totalPayroll = payrollRecords.reduce((sum, r) => sum + r.netPay, 0);
  const totalBonuses = payrollRecords.reduce((sum, r) => sum + r.bonus, 0);
  const totalDeductions = payrollRecords.reduce((sum, r) => sum + r.deductions, 0);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      case 'processed': return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Processed</Badge>;
      case 'paid': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>;
      default: return null;
    }
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Payroll Management</h1>
            <p className="text-muted-foreground">Manage employee salaries and payments</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40 bg-white/5 border-white/10">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="december">December 2024</SelectItem>
                <SelectItem value="november">November 2024</SelectItem>
                <SelectItem value="october">October 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <CreditCard className="w-4 h-4 mr-2" />
              Run Payroll
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Payroll</p>
                    <p className="text-2xl font-bold text-white">${totalPayroll.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-2xl font-bold text-white">{payrollRecords.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bonuses</p>
                    <p className="text-2xl font-bold text-white">${totalBonuses.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deductions</p>
                    <p className="text-2xl font-bold text-white">${totalDeductions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <FileText className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Payroll Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Base Salary</TableHead>
                  <TableHead className="text-right">Bonus</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRecords.map((record) => (
                  <TableRow key={record.id} className="border-white/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={record.employeeAvatar} />
                          <AvatarFallback>{record.employeeName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-white">{record.employeeName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell className="text-right">${record.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-400">+${record.bonus.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-400">-${record.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium text-white">${record.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(record.payDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="text-right">
                      {record.status === 'pending' && (
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-400">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Process
                        </Button>
                      )}
                      {record.status === 'processed' && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <CreditCard className="w-4 h-4 mr-1" />
                          Pay
                        </Button>
                      )}
                      {record.status === 'paid' && (
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          <Download className="w-4 h-4 mr-1" />
                          Slip
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
