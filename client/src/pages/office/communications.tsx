import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Bell, Mail, Users,
  Plus, Search, Star, Archive, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const messages = [
  { id: 1, from: "Store Manager", subject: "Weekly team meeting reminder", preview: "Don't forget our weekly sync tomorrow at 10 AM...", time: "10 min ago", read: false, starred: true },
  { id: 2, from: "HR Department", subject: "New policy update", preview: "Please review the updated employee handbook...", time: "1 hour ago", read: false, starred: false },
  { id: 3, from: "Sales Team", subject: "Black Friday performance report", preview: "Great news! We exceeded our targets by 25%...", time: "2 hours ago", read: true, starred: true },
  { id: 4, from: "IT Support", subject: "System maintenance scheduled", preview: "The POS system will be down for maintenance...", time: "Yesterday", read: true, starred: false },
  { id: 5, from: "Marketing", subject: "New campaign assets ready", preview: "The holiday campaign materials are ready for review...", time: "Yesterday", read: true, starred: false },
];

const announcements = [
  { id: 1, title: "Holiday Store Hours", content: "Special hours for the holiday season starting Dec 15", type: "info", date: "Dec 2, 2024" },
  { id: 2, title: "New Product Training", content: "Mandatory training session for all staff on Dec 10", type: "important", date: "Dec 1, 2024" },
  { id: 3, title: "December Targets", content: "Store targets have been updated for the festive season", type: "info", date: "Nov 30, 2024" },
];

const typeColors: Record<string, string> = {
  info: "bg-blue-500/20 text-blue-400",
  important: "bg-red-500/20 text-red-400",
  update: "bg-green-500/20 text-green-400",
};

export default function OfficeCommunications() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'announcements'>('inbox');
  const [searchTerm, setSearchTerm] = useState("");

  const unreadCount = messages.filter(m => !m.read).length;

  const filteredMessages = messages.filter(m =>
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="office_member">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Communications</h1>
            <p className="text-white/60">Internal messages and announcements</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-violet-500">
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{unreadCount}</p>
                  <p className="text-sm text-white/60">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{messages.filter(m => m.starred).length}</p>
                  <p className="text-sm text-white/60">Starred</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Bell className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{announcements.length}</p>
                  <p className="text-sm text-white/60">Announcements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-sm text-white/60">Team Online</p>
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
                  className={`border-white/10 ${activeTab === 'inbox' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20' : 'text-white/60'}`}
                  onClick={() => setActiveTab('inbox')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Inbox
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white">{unreadCount}</Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 ${activeTab === 'announcements' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20' : 'text-white/60'}`}
                  onClick={() => setActiveTab('announcements')}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Announcements
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === 'inbox' ? (
              <div className="space-y-2">
                {filteredMessages.map((message, i) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                      message.read ? 'bg-white/5 border-white/5' : 'bg-indigo-500/10 border-indigo-500/20'
                    } hover:bg-white/[0.08]`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {message.from.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${message.read ? 'text-white/80' : 'text-white'}`}>
                              {message.from}
                            </span>
                            {!message.read && (
                              <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {message.starred && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                            <span className="text-xs text-white/40">{message.time}</span>
                          </div>
                        </div>
                        <p className={`text-sm mb-1 ${message.read ? 'text-white/60' : 'text-white'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-white/40 truncate">{message.preview}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement, i) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={typeColors[announcement.type]}>
                          {announcement.type}
                        </Badge>
                        <h3 className="font-medium text-white">{announcement.title}</h3>
                      </div>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {announcement.date}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{announcement.content}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
