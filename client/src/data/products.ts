export interface ProductColor {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  description?: string;
  shortDescription?: string;
  specifications?: Record<string, string>;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stock?: number;
  has3D?: boolean;
  model3dType?: "box" | "sphere" | "torus" | "cylinder";
  vendorName?: string;
  tags?: string[];
  badgeColor?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  iconName: string;
  gradient: string;
  image?: string;
}

// Updated 30+ Categories with logos and professional icons
export const categories: Category[] = [
  { name: "Health Items", slug: "health-items", icon: "💊", iconName: "Pill", gradient: "from-green-600 to-teal-500", image: "https://myvertexbd.com/image/category/62fb70c13fd09.webp" },
  { name: "Cosmetics Items", slug: "cosmetics-items", icon: "💄", iconName: "Sparkles", gradient: "from-pink-600 to-rose-500", image: "https://myvertexbd.com/image/category/6331c4662f487.webp" },
  { name: "Tea & Coffee", slug: "tea-coffee", icon: "☕", iconName: "Music", gradient: "from-amber-700 to-orange-600", image: "https://myvertexbd.com/image/category/67628dd94b90f.webp" },
  { name: "Hair Oil & Gel", slug: "hair-oil-gel", icon: "💆", iconName: "Wind", gradient: "from-yellow-600 to-amber-500", image: "https://myvertexbd.com/image/category/66c78c111bb2b.webp" },
  { name: "Consumer Items", slug: "consumer-items", icon: "🛒", iconName: "ShoppingCart", gradient: "from-blue-600 to-indigo-500", image: "https://myvertexbd.com/image/category/62fb710457c8a.webp" },
  { name: "Salon & Parlour", slug: "salon-parlour", icon: "✨", iconName: "Sparkles", gradient: "from-purple-600 to-pink-500", image: "https://myvertexbd.com/image/category/66c777c88f197.webp" },
  { name: "Electronics", slug: "electronics", icon: "⚡", iconName: "Zap", gradient: "from-blue-600 to-cyan-500" },
  { name: "Fashion", slug: "fashion", icon: "👔", iconName: "Shirt", gradient: "from-pink-600 to-rose-500" },
  { name: "Home & Living", slug: "home", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-500" },
  { name: "Sports & Fitness", slug: "sports", icon: "🏋️", iconName: "Dumbbell", gradient: "from-red-600 to-pink-500" },
  { name: "Gaming", slug: "gaming", icon: "🎮", iconName: "Gamepad2", gradient: "from-violet-600 to-purple-500" },
  { name: "Jewelry & Watches", slug: "jewelry", icon: "💎", iconName: "Watch", gradient: "from-yellow-600 to-amber-500" },
  { name: "Books & Media", slug: "books", icon: "📚", iconName: "BookOpen", gradient: "from-blue-600 to-indigo-500" },
  { name: "Kids & Toys", slug: "kids", icon: "🧸", iconName: "Puzzle", gradient: "from-green-500 to-emerald-400" },
  { name: "Automotive", slug: "automotive", icon: "🚗", iconName: "Car", gradient: "from-gray-600 to-slate-500" },
  { name: "Food & Grocery", slug: "food", icon: "🍔", iconName: "ChefHat", gradient: "from-orange-600 to-red-500" },
  { name: "Appliances", slug: "appliances", icon: "🔌", iconName: "Zap", gradient: "from-cyan-600 to-blue-500" },
  { name: "Furniture", slug: "furniture", icon: "🛋️", iconName: "Sofa", gradient: "from-amber-700 to-orange-600" },
  { name: "Outdoor & Garden", slug: "outdoor", icon: "🌿", iconName: "Leaf", gradient: "from-green-600 to-emerald-500" },
  { name: "Pet Supplies", slug: "pets", icon: "🐾", iconName: "PawPrint", gradient: "from-orange-600 to-pink-500" },
  { name: "Sports Equipment", slug: "sports-eq", icon: "⚽", iconName: "Trophy", gradient: "from-yellow-600 to-orange-500" },
  { name: "Musical Instruments", slug: "music", icon: "🎸", iconName: "Music", gradient: "from-purple-600 to-pink-500" },
  { name: "Art & Craft", slug: "art", icon: "🎨", iconName: "Palette", gradient: "from-rose-600 to-pink-500" },
  { name: "Tools & Hardware", slug: "tools", icon: "🔨", iconName: "Wrench", gradient: "from-gray-700 to-slate-600" },
  { name: "Office Supplies", slug: "office", icon: "📎", iconName: "Paperclip", gradient: "from-blue-600 to-indigo-500" },
  { name: "School Supplies", slug: "school", icon: "✏️", iconName: "PencilRuler", gradient: "from-yellow-600 to-amber-500" },
  { name: "Party & Events", slug: "party", icon: "🎉", iconName: "Sparkles", gradient: "from-pink-600 to-purple-500" },
  { name: "Camping & Hiking", slug: "camping", icon: "⛺", iconName: "Tent", gradient: "from-green-700 to-emerald-600" },
  { name: "Travel & Luggage", slug: "travel", icon: "✈️", iconName: "Plane", gradient: "from-blue-600 to-cyan-500" },
  { name: "Shoes & Footwear", slug: "shoes", icon: "👟", iconName: "Footprints", gradient: "from-red-600 to-pink-500" },
];

const colorPalettes = [
  { accent: "#8B5CF6", name: "purple" },
  { accent: "#EC4899", name: "pink" },
  { accent: "#06B6D4", name: "cyan" },
  { accent: "#10B981", name: "emerald" },
  { accent: "#F59E0B", name: "amber" },
  { accent: "#EF4444", name: "red" },
  { accent: "#22C55E", name: "green" },
  { accent: "#EAB308", name: "yellow" },
  { accent: "#3B82F6", name: "blue" },
  { accent: "#A78BFA", name: "violet" },
];

// Product images for diversity
const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1509941943102-1c69b8b9baed?w=400&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1500409456520-20f925da0ea7?w=400&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
];

const productNames = [
  "Premium Product", "Deluxe Item", "Classic Model", "Elite Edition", "Pro Series",
  "Standard Pack", "Essential Bundle", "Ultra Pack", "Master Collection", "Royal Edition",
];

// Import actual products from API
const apiProducts = [
  { id: "p1", name: "Milk FaceWash-120 ml", categorySlug: "cosmetics-items", price: 290, image: "https://myvertexbd.com/image/thumb/68d6d3bd6bf3a.webp" },
  { id: "p2", name: "Soya Protein - 400 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d4cb6df63.webp" },
  { id: "p3", name: "Moringo Plus -100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d4ea36806.webp" },
  { id: "p4", name: "Alovera Plus -120 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/66c4ade538f4c.webp" },
  { id: "p5", name: "Katila Plus -120 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d56259e99.webp" },
  { id: "p6", name: "Multi-Purpose Liquid Detergent -1 Ltr", categorySlug: "consumer-items", price: 350, image: "https://myvertexbd.com/image/thumb/68d6d77169f44.webp" },
  { id: "p7", name: "Orange & Turmeric Soap - 100 gm", categorySlug: "cosmetics-items", price: 250, image: "https://myvertexbd.com/image/thumb/68d6d7da83eda.webp" },
  { id: "p8", name: "Coral Premix Coffee", categorySlug: "tea-coffee", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d9193c50c.webp" },
  { id: "p9", name: "Bcare Toothpaste", categorySlug: "cosmetics-items", price: 210, image: "https://myvertexbd.com/image/thumb/690a66b9db934.webp" },
  { id: "p10", name: "Senega -30 ট্যাব", categorySlug: "health-items", price: 400, image: "https://myvertexbd.com/image/thumb/68d6d995e21b6.webp" },
  { id: "p11", name: "Tulsi Sia Drinks", categorySlug: "health-items", price: 450, image: "https://myvertexbd.com/image/thumb/68d6d9cabed35.webp" },
  { id: "p12", name: "Apple Ginger Drinks -100 gm", categorySlug: "health-items", price: 1350, image: "https://myvertexbd.com/image/thumb/680c8b6a2429d.webp" },
  { id: "p13", name: "Balance Booster  Box -100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/6879655a73853.webp" },
  { id: "p14", name: "Harbal Tea-100 gm", categorySlug: "tea-coffee", price: 450, image: "https://myvertexbd.com/image/thumb/68d6d1536d28b.webp" },
  { id: "p15", name: "Alovera Plus Box-100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/6879668c391e8.webp" },
  { id: "p16", name: "Green Moringa-100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d831c7640.webp" },
  { id: "p17", name: "Zira Drinks-100 gm(20 pack)", categorySlug: "health-items", price: 450, image: "https://myvertexbd.com/image/thumb/68d6d9e35e446.webp" },
  { id: "p18", name: "Natrum Mur-30 tab", categorySlug: "health-items", price: 400, image: "https://myvertexbd.com/image/thumb/690a6bcdb017f.webp" },
  { id: "p19", name: "Acne Cleanser- 10 gm", categorySlug: "cosmetics-items", price: 380, image: "https://myvertexbd.com/image/thumb/68d6d4afe0d42.webp" },
  { id: "p20", name: "Tea Tree Hair wash-100 ml", categorySlug: "cosmetics-items", price: 450, image: "https://myvertexbd.com/image/thumb/690a6bb54dd78.webp" },
];

function generateExtendedProducts() {
  const generatedProducts: Product[] = [];
  let productId = apiProducts.length;

  // First, add all API products
  for (const apiProd of apiProducts) {
    const categorySlug = apiProd.categorySlug;
    const category = categories.find(c => c.slug === categorySlug);
    const palette = colorPalettes[(productId - 1) % colorPalettes.length];
    const basePrice = apiProd.price;
    const hasDiscount = Math.random() > 0.7;

    generatedProducts.push({
      id: apiProd.id,
      name: apiProd.name,
      slug: apiProd.name.toLowerCase().replace(/\s+/g, "-"),
      category: category?.name || "Products",
      categorySlug: categorySlug,
      price: basePrice,
      originalPrice: hasDiscount ? basePrice + Math.floor(Math.random() * 200) + 50 : undefined,
      rating: Number((Math.random() * 2 + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 3000) + 50,
      image: apiProd.image,
      colors: [
        { name: "Standard", value: palette.accent },
        { name: "Dark", value: "#1a1a2e" },
        { name: "Light", value: "#e8e8f0" },
      ],
      sizes: ["S", "M", "L", "XL"],
      shortDescription: `${apiProd.name} - Premium Quality`,
      inStock: Math.random() > 0.1,
      stock: Math.floor(Math.random() * 100) + 1,
      isNew: Math.random() > 0.85,
      isBestseller: Math.random() > 0.92,
      isFeatured: Math.random() > 0.95,
      vendorName: ["Premium Shop", "Quality Store", "Elite Traders", "Express Market"][Math.floor(Math.random() * 4)],
      tags: [categorySlug, "trending", "quality"],
      badgeColor: palette.name,
    });
  }

  // Add 330+ more generated products across all categories
  for (const category of categories) {
    for (let i = 0; i < 11; i++) {
      productId++;
      const palette = colorPalettes[(productId - 1) % colorPalettes.length];
      const productName = productNames[(productId - 1) % productNames.length];
      const basePrice = Math.floor(Math.random() * 2900) + 99;
      const hasDiscount = Math.random() > 0.6;

      generatedProducts.push({
        id: `p${productId}`,
        name: `${productName} - ${category.name} ${i + 1}`,
        slug: `${productName.toLowerCase().replace(/\s+/g, "-")}-${category.slug}-${i + 1}`,
        category: category.name,
        categorySlug: category.slug,
        price: basePrice,
        originalPrice: hasDiscount ? basePrice + Math.floor(Math.random() * 300) + 50 : undefined,
        rating: Number((Math.random() * 2 + 3.5).toFixed(1)),
        reviews: Math.floor(Math.random() * 5000) + 10,
        image: images[productId % images.length],
        colors: [
          { name: "Standard", value: palette.accent },
          { name: "Dark", value: "#1a1a2e" },
          { name: "Light", value: "#e8e8f0" },
        ],
        sizes: ["S", "M", "L", "XL"],
        shortDescription: `Premium ${productName.toLowerCase()} from ${category.name}`,
        inStock: Math.random() > 0.1,
        stock: Math.floor(Math.random() * 100) + 1,
        isNew: Math.random() > 0.85,
        isBestseller: Math.random() > 0.92,
        isFeatured: Math.random() > 0.95,
        vendorName: ["Premium Shop", "Quality Store", "Elite Traders", "Express Market"][Math.floor(Math.random() * 4)],
        tags: [category.slug, "trending", "quality"],
        badgeColor: palette.name,
      });
    }
  }

  return generatedProducts;
}

export const products: Product[] = generateExtendedProducts();

export const PRODUCTS = products;

export const featuredProducts = products.filter(p => p.isFeatured).slice(0, 12);
export const newArrivals = products.filter(p => p.isNew).slice(0, 12);
export const bestsellers = products.filter(p => p.isBestseller).slice(0, 12);

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );
}
