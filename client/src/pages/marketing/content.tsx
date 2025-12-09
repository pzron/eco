import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Image, Video, Search, Plus, Edit, Trash2,
  Eye, Calendar, Tag, Folder, MoreVertical
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'image' | 'video' | 'email';
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  createdAt: string;
  category: string;
  views: number;
}

const sampleContent: ContentItem[] = [
  { id: "1", title: "Holiday Gift Guide 2024", type: "blog", status: "published", author: "Sarah Johnson", createdAt: "2024-12-01", category: "Guides", views: 12500 },
  { id: "2", title: "Product Launch Video", type: "video", status: "published", author: "Mike Chen", createdAt: "2024-11-28", category: "Products", views: 45000 },
  { id: "3", title: "Black Friday Banner Set", type: "image", status: "published", author: "Emily Davis", createdAt: "2024-11-20", category: "Promotions", views: 8900 },
  { id: "4", title: "Winter Collection Newsletter", type: "email", status: "scheduled", author: "Sarah Johnson", createdAt: "2024-12-10", category: "Newsletters", views: 0 },
  { id: "5", title: "Year in Review Blog Post", type: "blog", status: "draft", author: "John Smith", createdAt: "2024-12-05", category: "Company", views: 0 },
  { id: "6", title: "New Year Campaign Assets", type: "image", status: "draft", author: "Emily Davis", createdAt: "2024-12-08", category: "Campaigns", views: 0 }
];

export default function MarketingContent() {
  const [content, setContent] = useState<ContentItem[]>(sampleContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'email': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'blog': return 'bg-blue-500/20 text-blue-400';
      case 'image': return 'bg-pink-500/20 text-pink-400';
      case 'video': return 'bg-red-500/20 text-red-400';
      case 'email': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft': return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Draft</Badge>;
      case 'published': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Published</Badge>;
      case 'scheduled': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Scheduled</Badge>;
      default: return null;
    }
  };

  const stats = {
    total: content.length,
    published: content.filter(c => c.status === 'published').length,
    drafts: content.filter(c => c.status === 'draft').length,
    totalViews: content.reduce((sum, c) => sum + c.views, 0)
  };

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Management</h1>
            <p className="text-muted-foreground">Create and manage your marketing content</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Content
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Content title..." className="bg-white/5 border-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Input placeholder="blog / image / video" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input placeholder="Select category" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea placeholder="Write your content..." className="bg-white/5 border-white/10 min-h-32" />
                </div>
                <Button className="w-full mt-2">Create Content</Button>
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
                    <p className="text-sm text-muted-foreground">Total Content</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Folder className="w-6 h-6 text-blue-400" />
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
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold text-white">{stats.published}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <Eye className="w-6 h-6 text-green-400" />
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
                    <p className="text-sm text-muted-foreground">Drafts</p>
                    <p className="text-2xl font-bold text-white">{stats.drafts}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/20">
                    <FileText className="w-6 h-6 text-yellow-400" />
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
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold text-white">{(stats.totalViews / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white/5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="blog">Blog</TabsTrigger>
                  <TabsTrigger value="image">Images</TabsTrigger>
                  <TabsTrigger value="video">Videos</TabsTrigger>
                  <TabsTrigger value="email">Emails</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search content..." 
                  className="pl-9 bg-white/5 border-white/10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredContent.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.views > 0 && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views.toLocaleString()}
                      </span>
                    )}
                    {getStatusBadge(item.status)}
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
