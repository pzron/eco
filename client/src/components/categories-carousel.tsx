import { categories } from "@/data/products";
import { motion } from "framer-motion";

export function CategoriesCarousel() {
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-purple-950/5 via-transparent to-pink-950/5">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-white mb-6">Shop by Category</h2>
        
        {/* Categories grid - 6-8 columns with icons */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3">
          {categories.map((category, idx) => (
            <motion.a
              key={category.slug}
              href={`/products?category=${category.slug}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-purple-500/50 hover:from-purple-500/20 transition-all cursor-pointer group"
            >
              <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <p className="text-xs md:text-sm text-white/80 group-hover:text-white text-center line-clamp-2 transition-colors">
                {category.name}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
