import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HomeCategories } from "@/components/home-categories";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <HomeCategories />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
