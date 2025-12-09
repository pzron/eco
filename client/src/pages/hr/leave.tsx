import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, CheckCircle, XCircle, AlertCircle,
  Plane, Heart, Briefcase, GraduationCap
} from "lucide-react";

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  type: 'vacation' | 'sick' | 'personal' | 'training';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  requestedAt: string;
}

const sampleLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "John Smith",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    department: "Engineering",
    type: "vacation",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    days: 5,
    status: "pending",
    reason: "Holiday vacation with family",
    requestedAt: "2024-12-05"
  },
  {
    id: "2",
    employeeName: "Sarah Johnson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    department: "Marketing",
    type: "sick",
    startDate: "2024-12-09",
    endDate: "2024-12-10",
    days: 2,
    status: "approved",
    reason: "Doctor appointment and recovery",
    requestedAt: "2024-12-08"
  },
  {
    id: "3",
    employeeName: "Mike Chen",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    department: "Sales",
    type: "training",
    startDate: "2024-12-15",
    endDate: "2024-12-17",
    days: 3,
    status: "pending",
    reason: "Sales certification course",
    requestedAt: "2024-12-01"
  },
  {
    id: "4",
    employeeName: "Emily Davis",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    department: "HR",
    type: "personal",
    startDate: "2024-12-12",
    endDate: "2024-12-12",
    days: 1,
    status: "rejected",
    reason: "Personal matters",
    requestedAt: "2024-12-06"
  }
];

export default function HRLeave() {
  const [requests, setRequests] = useState<LeaveRequest[]>(sampleLeaveRequests);
  const [activeTab, setActiveTab] = useState("all");

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === "all") return true;
    return req.status === activeTab;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'vacation': return <Plane className="w-4 h-4 text-blue-400" />;
      case 'sick': return <Heart className="w-4 h-4 text-red-400" />;
      case 'personal': return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'training': return <GraduationCap className="w-4 h-4 text-green-400" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      case 'approved': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Approved</Badge>;
      case 'rejected': return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Rejected</Badge>;
      default: return null;
    }
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Leave Requests</h1>
          <p className="text-muted-foreground">Review and manage employee leave requests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-bold text-white">{requests.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Calendar className="w-6 h-6 text-blue-400" />
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
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'pending').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/20">
                    <Clock className="w-6 h-6 text-yellow-400" />
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
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'approved').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <CheckCircle className="w-6 h-6 text-green-400" />
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
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'rejected').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <XCircle className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <TabsList className="bg-white/5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} className="border-white/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={request.employeeAvatar} />
                          <AvatarFallback>{request.employeeName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{request.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{request.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 capitalize">
                        {getTypeIcon(request.type)}
                        {request.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(request.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">to {new Date(request.endDate).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/20">
                        {request.days} {request.days === 1 ? 'day' : 'days'}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-48">
                      <p className="text-sm text-muted-foreground truncate">{request.reason}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      {request.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                            onClick={() => handleApprove(request.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                            onClick={() => handleReject(request.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
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
