import { products } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";

export function ProductGrid() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Premium Collection</h2>
          <p className="text-muted-foreground">Discover 350+ products with stunning 3D design</p>
        </div>
        <Button variant="outline" className="hidden md:flex border-white/20 hover:bg-white/10">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-0 relative">
              {product.isNew && (
                <Badge className="absolute top-3 left-3 bg-secondary text-white border-none z-10">New</Badge>
              )}
              {product.isBestseller && (
                <Badge className="absolute top-3 left-3 bg-primary text-white border-none z-10">Bestseller</Badge>
              )}
              
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <div className="aspect-square overflow-hidden bg-white p-4 flex items-center justify-center relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay for hover effect */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="rounded-full bg-white text-black hover:bg-white/90 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-5 flex flex-col items-start gap-3">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-medium text-white">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
              </div>
              
              <h3 className="font-heading font-bold text-white text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between w-full mt-auto">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through decoration-red-500/50">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
