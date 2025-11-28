import { Navbar } from "@/components/navbar";
import { ProductViewer } from "@/components/3d/product-viewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { 
  ShoppingCart, Heart, Share2, ShieldCheck, Truck, 
  RotateCcw, Zap, Box, Cuboid, ScanFace 
} from "lucide-react";
import { useRoute } from "wouter";
import { useState } from "react";

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const product = products.find(p => p.id === params?.id) || products[0];
  const [selectedColor, setSelectedColor] = useState("#D3C1E7");

  const colors = [
    { name: "Cyber Purple", value: "#D3C1E7" },
    { name: "Midnight Black", value: "#1A1222" },
    { name: "Neon Blue", value: "#3b82f6" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Breadcrumb-ish */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:text-primary cursor-pointer">{product.category}</span>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: 3D Viewer & Media */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[500px] lg:h-[600px] w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <ProductViewer color={selectedColor} />
              
              {/* AR/VR Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md" title="View in AR">
                  <Cuboid className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md" title="Try On">
                  <ScanFace className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
                   <img src={product.image} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details & Config */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                  AI Recommended Match
                </Badge>
                <div className="flex items-center gap-2 text-yellow-400">
                  <span className="font-bold text-white">{product.rating}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-sm">★</span>)}
                  </div>
                  <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through mb-1">${product.originalPrice.toLocaleString()}</span>
                )}
                <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/20">
                  Save ${(product.originalPrice! - product.price).toLocaleString()}
                </Badge>
              </div>
            </div>

            {/* Configurator */}
            <div className="space-y-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">Select Finish</label>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.value ? 'border-white scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-transparent opacity-80 hover:opacity-100'}`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                 <label className="text-sm font-medium text-muted-foreground mb-3 block">AI Suggested Bundle</label>
                 <div className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <Box className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">Protection Bundle</div>
                      <div className="text-xs text-muted-foreground">Add Case + Screen Protector</div>
                    </div>
                    <div className="text-sm font-bold text-white">+$45</div>
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="h-14 w-14 border-white/20 bg-white/5 hover:bg-white/10">
                  <Heart className="w-6 h-6" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 w-14 border-white/20 bg-white/5 hover:bg-white/10">
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>
              <Button size="lg" variant="secondary" className="w-full h-12 font-mono text-sm">
                <Zap className="mr-2 w-4 h-4" /> Buy Now with Crypto (Web3)
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">Free Global Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">Authenticity Verified</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">30-Day Smart Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none p-0 h-auto">
              <TabsTrigger value="features" className="px-8 py-4 rounded-t-lg data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">Features</TabsTrigger>
              <TabsTrigger value="specs" className="px-8 py-4 rounded-t-lg data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="px-8 py-4 rounded-t-lg data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">Reviews</TabsTrigger>
            </TabsList>
            <div className="p-8 bg-white/5 rounded-b-2xl border-x border-b border-white/10 min-h-[300px]">
              <TabsContent value="features" className="mt-0 space-y-4">
                <h3 className="text-2xl font-heading font-bold text-white">Next-Gen Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "AI-Enhanced Performance Optimization",
                    "Holographic Display Technology",
                    "Quantum-Encrypted Security Chip",
                    "Bio-Adaptive Materials",
                    "Zero-Latency Wireless Charging",
                    "Neural Network Processing Unit"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specs" className="mt-0">
                <div className="text-muted-foreground">Technical specifications matrix would go here...</div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-0">
                 <div className="text-muted-foreground">AI-Summarized user reviews would appear here...</div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
