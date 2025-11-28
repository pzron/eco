import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, Share2, Wallet, TrendingUp, Target, 
  Gift, Copy, BarChart2 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AffiliateDashboard() {
  return (
    <DashboardLayout role="affiliate">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Affiliate Workspace</h1>
            <p className="text-muted-foreground">Track campaigns, earn rewards, and climb the leaderboard</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-black font-bold">
            <Trophy className="mr-2 w-4 h-4" /> View Leaderboard
          </Button>
        </div>

        {/* Gamified Status */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-purple-900/20 to-secondary/20 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Trophy className="w-32 h-32 text-yellow-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-[2px]">
                 <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">Lvl 5</span>
                 </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Gold Influencer</h2>
                <p className="text-sm text-muted-foreground">Next Tier: Platinum (82% complete)</p>
              </div>
            </div>
            <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 w-[82%]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Active Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { name: "Summer Tech Sale", commission: "15%", clicks: 1240, earnings: "$450" },
                 { name: "New iPhone Launch", commission: "10%", clicks: 892, earnings: "$890" },
                 { name: "Gaming Week", commission: "12%", clicks: 450, earnings: "$120" },
               ].map((camp, i) => (
                 <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">{camp.name}</h4>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/20">{camp.commission}</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{camp.clicks} clicks</span>
                      <span className="text-white font-medium">{camp.earnings} earned</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-white/10"><Copy className="w-3 h-3 mr-1"/> Copy Link</Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-white/10"><Share2 className="w-3 h-3 mr-1"/> Share</Button>
                    </div>
                 </div>
               ))}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                   <CardTitle className="text-white">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-4xl font-bold text-white mb-1">$12,450.00</div>
                   <div className="text-sm text-green-400 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +24% this month</div>
                   <div className="mt-6">
                      <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20">
                         <Wallet className="mr-2 w-4 h-4" /> Withdraw to Wallet
                      </Button>
                   </div>
                </CardContent>
             </Card>

             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                   <CardTitle className="text-white">AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                         <p className="text-sm text-blue-200">Promote "Sony Headphones" this weekend for 2x clicks.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                         <p className="text-sm text-purple-200">Your audience loves Tech. Try the new "VR Headset".</p>
                      </div>
                   </div>
                </CardContent>
             </Card>

             <Card className="md:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">Rewards & NFTs</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4 overflow-x-auto pb-2">
                   {[1, 2, 3].map((_, i) => (
                     <div key={i} className="min-w-[150px] aspect-square rounded-xl bg-black/40 border border-white/10 flex flex-col items-center justify-center p-4 text-center group hover:border-primary/50 transition-colors cursor-pointer">
                        <Gift className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-white">Top Seller NFT #{i+10}</span>
                        <span className="text-xs text-muted-foreground mt-1">Unlocked</span>
                     </div>
                   ))}
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
