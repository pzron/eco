import { Link } from "wouter";
import { categories } from "@/data/products";
import * as Icons from "lucide-react";

const categoryColors = [
  "from-purple-500/30 to-purple-500/10 border-purple-500/30 text-purple-400",
  "from-pink-500/30 to-pink-500/10 border-pink-500/30 text-pink-400",
  "from-cyan-500/30 to-cyan-500/10 border-cyan-500/30 text-cyan-400",
  "from-amber-500/30 to-amber-500/10 border-amber-500/30 text-amber-400",
  "from-green-500/30 to-green-500/10 border-green-500/30 text-green-400",
  "from-blue-500/30 to-blue-500/10 border-blue-500/30 text-blue-400",
  "from-rose-500/30 to-rose-500/10 border-rose-500/30 text-rose-400",
  "from-indigo-500/30 to-indigo-500/10 border-indigo-500/30 text-indigo-400",
  "from-teal-500/30 to-teal-500/10 border-teal-500/30 text-teal-400",
  "from-orange-500/30 to-orange-500/10 border-orange-500/30 text-orange-400",
  "from-violet-500/30 to-violet-500/10 border-violet-500/30 text-violet-400",
  "from-fuchsia-500/30 to-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400",
];

export function CategoryRail() {
  return (
    <div className="w-full py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-scroll gap-4 md:gap-8 min-w-max px-4">
        {[...categories, ...categories].map((cat, idx) => {
          const Icon = (Icons as any)[cat.icon] || Icons.Box;
          const colorClass = categoryColors[idx % categoryColors.length];
          return (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/products?category=${cat.slug}`}
              className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/40`}>
                <Icon className={`w-8 h-8 transition-colors`} style={{color: 'currentColor'}} />
              </div>
              <span className="text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors text-center max-w-[100px]">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
