import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, Search, Plus, Mail, Phone, Calendar, 
  Building2, MoreVertical, Edit, Trash2, UserCheck,
  Filter, Download
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
  avatar: string;
}

const sampleEmployees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@nex.com",
    phone: "+1 234-567-8901",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2022-01-15",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@nex.com",
    phone: "+1 234-567-8902",
    department: "Marketing",
    position: "Marketing Manager",
    hireDate: "2021-06-20",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@nex.com",
    phone: "+1 234-567-8903",
    department: "Sales",
    position: "Sales Representative",
    hireDate: "2023-03-10",
    status: "on_leave",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@nex.com",
    phone: "+1 234-567-8904",
    department: "HR",
    position: "HR Specialist",
    hireDate: "2022-09-01",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.w@nex.com",
    phone: "+1 234-567-8905",
    department: "Finance",
    position: "Accountant",
    hireDate: "2021-11-15",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert"
  }
];

export default function HREmployees() {
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(employees.map(e => e.department)));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'on_leave': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'terminated': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Employee Management</h1>
            <p className="text-muted-foreground">Manage your team members and their information</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a0a] border-white/10">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>Fill in the employee details below</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="john@nex.com" className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input placeholder="Job title" className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">Add Employee</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-2xl font-bold text-white">{employees.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Users className="w-6 h-6 text-blue-400" />
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
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold text-white">{employees.filter(e => e.status === 'active').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <UserCheck className="w-6 h-6 text-green-400" />
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
                    <p className="text-sm text-muted-foreground">On Leave</p>
                    <p className="text-2xl font-bold text-white">{employees.filter(e => e.status === 'on_leave').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/20">
                    <Calendar className="w-6 h-6 text-yellow-400" />
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
                    <p className="text-sm text-muted-foreground">Departments</p>
                    <p className="text-2xl font-bold text-white">{departments.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Building2 className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>All Employees</CardTitle>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search employees..." 
                    className="pl-9 bg-white/5 border-white/10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-40 bg-white/5 border-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="border-white/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{employee.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {employee.department}
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
