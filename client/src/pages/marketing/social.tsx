import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Heart, MessageCircle, Share2, Eye, Plus,
  Send, Image, Calendar, TrendingUp, BarChart3
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  postedAt: string;
  status: 'published' | 'scheduled' | 'draft';
}

const samplePosts: SocialPost[] = [
  { id: "1", platform: "instagram", content: "Discover our holiday collection! 🎄 Shop now and get 30% off...", likes: 2450, comments: 189, shares: 320, reach: 45000, postedAt: "2024-12-08", status: "published" },
  { id: "2", platform: "twitter", content: "Big news! Our new product line drops tomorrow. Stay tuned! 🚀", likes: 890, comments: 156, shares: 445, reach: 28000, postedAt: "2024-12-07", status: "published" },
  { id: "3", platform: "facebook", content: "Thank you for 100K followers! 🎉 Celebrate with us...", likes: 5600, comments: 892, shares: 1200, reach: 85000, postedAt: "2024-12-06", status: "published" },
  { id: "4", platform: "linkedin", content: "We're hiring! Join our growing team of innovators...", likes: 340, comments: 45, shares: 78, reach: 12000, postedAt: "2024-12-09", status: "scheduled" }
];

const engagementData = [
  { date: '12/01', instagram: 4500, twitter: 2300, facebook: 6200, linkedin: 1200 },
  { date: '12/02', instagram: 5200, twitter: 2800, facebook: 5800, linkedin: 1400 },
  { date: '12/03', instagram: 4800, twitter: 3100, facebook: 6500, linkedin: 1100 },
  { date: '12/04', instagram: 6100, twitter: 2600, facebook: 7200, linkedin: 1600 },
  { date: '12/05', instagram: 5500, twitter: 3400, facebook: 6800, linkedin: 1300 },
  { date: '12/06', instagram: 7200, twitter: 4100, facebook: 8500, linkedin: 1800 },
  { date: '12/07', instagram: 6800, twitter: 3800, facebook: 7900, linkedin: 1500 }
];

export default function MarketingSocial() {
  const [posts] = useState<SocialPost[]>(samplePosts);

  const getPlatformIcon = (platform: string) => {
    const colors: Record<string, string> = {
      instagram: 'bg-pink-500/20 text-pink-400',
      twitter: 'bg-blue-500/20 text-blue-400',
      facebook: 'bg-indigo-500/20 text-indigo-400',
      linkedin: 'bg-cyan-500/20 text-cyan-400'
    };
    return colors[platform] || 'bg-gray-500/20 text-gray-400';
  };

  const totalFollowers = { instagram: 125000, twitter: 45000, facebook: 89000, linkedin: 32000 };

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Social Media</h1>
            <p className="text-muted-foreground">Manage your social media presence</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea 
                  placeholder="What's on your mind?" 
                  className="bg-white/5 border-white/10 min-h-32"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-white/10">
                    <Image className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
                <div className="flex gap-2 pt-2">
                  {['instagram', 'twitter', 'facebook', 'linkedin'].map(platform => (
                    <Button 
                      key={platform} 
                      variant="outline" 
                      size="sm" 
                      className={`border-white/10 capitalize ${getPlatformIcon(platform)}`}
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(totalFollowers).map(([platform, followers], index) => (
            <motion.div 
              key={platform}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${getPlatformIcon(platform)}`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">{platform}</p>
                  <p className="text-2xl font-bold text-white">{(followers / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +2.4% this week
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Engagement Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="instagram" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                <Area type="monotone" dataKey="twitter" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="facebook" stackId="3" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Area type="monotone" dataKey="linkedin" stackId="4" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getPlatformIcon(post.platform)}`}>
                    <span className="text-xs font-medium uppercase">{post.platform.slice(0, 2)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                        {post.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        {post.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4 text-green-400" />
                        {post.shares}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-purple-400" />
                        {(post.reach / 1000).toFixed(1)}K reach
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
