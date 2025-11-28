import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CategoryRail } from "@/components/category-rail";
import { ProductGrid } from "@/components/product-grid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CategoryRail />
        <ProductGrid />
      </main>
      
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
             <img src="/attached_assets/logo.png" alt="NexCommerce" className="h-8 w-8 grayscale opacity-50" />
             <span className="font-heading font-bold text-xl tracking-wider text-white/50">NexCommerce</span>
          </div>
          <p>© 2024 NexCommerce. Designed by Readdy.</p>
        </div>
      </footer>
    </div>
  );
}
