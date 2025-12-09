import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Briefcase, UserPlus, FileText, Mail,
  Phone, MapPin, Clock, Eye, MessageSquare, Plus
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  applicants: number;
  status: 'open' | 'closed';
  postedAt: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired';
  avatar: string;
  appliedAt: string;
  rating: number;
}

const sampleJobs: JobPosting[] = [
  { id: "1", title: "Senior Software Engineer", department: "Engineering", location: "Remote", type: "full-time", applicants: 45, status: "open", postedAt: "2024-11-15" },
  { id: "2", title: "Marketing Manager", department: "Marketing", location: "New York", type: "full-time", applicants: 28, status: "open", postedAt: "2024-11-20" },
  { id: "3", title: "Sales Representative", department: "Sales", location: "Los Angeles", type: "full-time", applicants: 32, status: "open", postedAt: "2024-11-25" },
  { id: "4", title: "UX Designer", department: "Design", location: "Remote", type: "contract", applicants: 19, status: "closed", postedAt: "2024-10-01" }
];

const sampleCandidates: Candidate[] = [
  { id: "1", name: "Alex Thompson", email: "alex.t@email.com", phone: "+1 555-0101", position: "Senior Software Engineer", stage: "interview", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", appliedAt: "2024-12-01", rating: 4.5 },
  { id: "2", name: "Jessica Lee", email: "jessica.lee@email.com", phone: "+1 555-0102", position: "Marketing Manager", stage: "screening", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica", appliedAt: "2024-12-03", rating: 4.0 },
  { id: "3", name: "David Kim", email: "david.kim@email.com", phone: "+1 555-0103", position: "Sales Representative", stage: "applied", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", appliedAt: "2024-12-05", rating: 3.5 },
  { id: "4", name: "Maria Garcia", email: "maria.g@email.com", phone: "+1 555-0104", position: "Senior Software Engineer", stage: "offer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", appliedAt: "2024-11-28", rating: 5.0 }
];

const stages = ['applied', 'screening', 'interview', 'offer', 'hired'];

export default function HRRecruitment() {
  const [jobs] = useState<JobPosting[]>(sampleJobs);
  const [candidates] = useState<Candidate[]>(sampleCandidates);

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'applied': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'screening': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'interview': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'offer': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'hired': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStageProgress = (stage: string) => {
    const index = stages.indexOf(stage);
    return ((index + 1) / stages.length) * 100;
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Recruitment</h1>
            <p className="text-muted-foreground">Manage job postings and candidates</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10">
              <DialogHeader>
                <DialogTitle>Create Job Posting</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input placeholder="e.g., Senior Software Engineer" className="bg-white/5 border-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input placeholder="e.g., Engineering" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="e.g., Remote" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Job Description</Label>
                  <Textarea placeholder="Describe the role..." className="bg-white/5 border-white/10 min-h-24" />
                </div>
                <Button className="w-full mt-2">Post Job</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Open Positions</p>
                    <p className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'open').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Briefcase className="w-6 h-6 text-blue-400" />
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
                    <p className="text-sm text-muted-foreground">Total Applicants</p>
                    <p className="text-2xl font-bold text-white">{jobs.reduce((sum, j) => sum + j.applicants, 0)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <Users className="w-6 h-6 text-green-400" />
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
                    <p className="text-sm text-muted-foreground">In Interview</p>
                    <p className="text-2xl font-bold text-white">{candidates.filter(c => c.stage === 'interview').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/20">
                    <MessageSquare className="w-6 h-6 text-yellow-400" />
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
                    <p className="text-sm text-muted-foreground">Offers Sent</p>
                    <p className="text-2xl font-bold text-white">{candidates.filter(c => c.stage === 'offer').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job Postings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobs.map((job) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Badge className={job.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {job.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-white/10">
                    <Eye className="w-4 h-4 mr-2" />
                    View Applicants
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Candidate Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidates.map((candidate) => (
                <motion.div 
                  key={candidate.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">{candidate.name}</h3>
                        <Badge className={getStageColor(candidate.stage)}>{candidate.stage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <Progress value={getStageProgress(candidate.stage)} className="h-1" />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {candidate.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {candidate.phone}
                    </span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
