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

// 65 Complete Products from Vertex Life International - https://myvertexbd.com/ecom/
const externalProductsFromAPI: Product[] = [
  { id: "ext-255", name: "Senega (সেনেগা)-৩০ ট্যাব", slug: "senega-সেনেগা-৩০-ট্যাব", category: "Health Items", categorySlug: "health_items", price: 850, rating: 4.5, reviews: 234, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Senega tablets from Vertex Life", inStock: true, stock: 156, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "pink", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-287", name: "Alovera Plus Box-100 gm", slug: "alovera-plus-box-100-gm", category: "Health Items", categorySlug: "health_items", price: 1050, originalPrice: 1450, rating: 4.9, reviews: 812, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Alovera Plus box from Vertex Life", inStock: true, stock: 89, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "purple", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-219", name: "Alovera Plus -120 gm", slug: "alovera-plus-120-gm", category: "Health Items", categorySlug: "health_items", price: 1280, originalPrice: 1599, rating: 4.8, reviews: 645, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Alovera Plus from Vertex Life", inStock: true, stock: 123, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "cyan", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-218", name: "Caterpillar Plus", slug: "caterpillar-plus", category: "Health Items", categorySlug: "health_items", price: 950, rating: 4.6, reviews: 389, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Caterpillar Plus from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "amber", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-257", name: "Morina Plus Box-100 gm", slug: "morina-plus-box-100-gm", category: "Health Items", categorySlug: "health_items", price: 1120, rating: 4.7, reviews: 523, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Morina Plus Box from Vertex Life", inStock: false, stock: 78, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "emerald", isBestseller: true, isNew: true, isFeatured: false },
  { id: "ext-258", name: "MoringaBeta Plus-100 gm", slug: "moringabeta-plus-100-gm", category: "Health Items", categorySlug: "health_items", price: 1380, rating: 4.8, reviews: 701, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium MoringaBeta Plus from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "red", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-266", name: "Spirulina Plus-100 gm", slug: "spirulina-plus-100-gm", category: "Health Items", categorySlug: "health_items", price: 1620, originalPrice: 1899, rating: 4.9, reviews: 912, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Spirulina Plus from Vertex Life", inStock: true, stock: 92, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "green", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-256", name: "Imune Plus Box-100 gm", slug: "imune-plus-box-100-gm", category: "Health Items", categorySlug: "health_items", price: 980, rating: 4.5, reviews: 267, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Imune Plus Box from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "yellow", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-221", name: "Soya Protein - 400 gm", slug: "soya-protein-400-gm", category: "Health Items", categorySlug: "health_items", price: 850, rating: 4.7, reviews: 624, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Soya Protein from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "pink", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-271", name: "Moringa Plus -100 gm", slug: "moringa-plus-100-gm", category: "Health Items", categorySlug: "health_items", price: 720, originalPrice: 950, rating: 4.6, reviews: 445, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Moringa Plus from Vertex Life", inStock: true, stock: 201, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "purple", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-220", name: "Katila Plus -120 gm", slug: "katila-plus-120-gm", category: "Health Items", categorySlug: "health_items", price: 1050, rating: 4.8, reviews: 756, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Katila Plus from Vertex Life", inStock: false, stock: 67, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "cyan", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-217", name: "Katila Plus -120 gm (Variant)", slug: "katila-plus-120-gm-variant", category: "Health Items", categorySlug: "health_items", price: 1100, rating: 4.7, reviews: 534, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Katila Plus variant from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "amber", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-286", name: "Alovera Plus -120 gm (Stock)", slug: "alovera-plus-120-gm-stock", category: "Health Items", categorySlug: "health_items", price: 1250, rating: 4.9, reviews: 823, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Alovera Plus stock from Vertex Life", inStock: true, stock: 156, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "emerald", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-265", name: "Olive Plus Box-100 gm", slug: "olive-plus-box-100-gm", category: "Health Items", categorySlug: "health_items", price: 890, rating: 4.5, reviews: 312, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Olive Plus Box from Vertex Life", inStock: true, stock: 89, vendorName: "Vertex Life", tags: ["health_items", "verified", "authentic"], badgeColor: "red", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-242", name: "Bin Brand Chocolate Biscuit", slug: "bin-brand-chocolate-biscuit", category: "Consumer Items", categorySlug: "consumer_items", price: 45, rating: 4.6, reviews: 489, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Bin Brand Chocolate Biscuit from Vertex Life", inStock: true, stock: 234, vendorName: "Vertex Life", tags: ["consumer_items", "verified", "authentic"], badgeColor: "green", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-237", name: "Bin Cheese Biscuit", slug: "bin-cheese-biscuit", category: "Consumer Items", categorySlug: "consumer_items", price: 40, originalPrice: 55, rating: 4.7, reviews: 567, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Bin Cheese Biscuit from Vertex Life", inStock: true, stock: 267, vendorName: "Vertex Life", tags: ["consumer_items", "verified", "authentic"], badgeColor: "yellow", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-240", name: "Bin Sweet Biscuit", slug: "bin-sweet-biscuit", category: "Consumer Items", categorySlug: "consumer_items", price: 50, rating: 4.5, reviews: 412, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Bin Sweet Biscuit from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["consumer_items", "verified", "authentic"], badgeColor: "pink", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-238", name: "Bin Cream Biscuit", slug: "bin-cream-biscuit", category: "Consumer Items", categorySlug: "consumer_items", price: 38, rating: 4.8, reviews: 634, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Bin Cream Biscuit from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["consumer_items", "verified", "authentic"], badgeColor: "purple", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-243", name: "Bin Cocktail Biscuit", slug: "bin-cocktail-biscuit", category: "Consumer Items", categorySlug: "consumer_items", price: 42, rating: 4.6, reviews: 523, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Bin Cocktail Biscuit from Vertex Life", inStock: false, stock: 92, vendorName: "Vertex Life", tags: ["consumer_items", "verified", "authentic"], badgeColor: "cyan", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-239", name: "Milk FaceWash-120 ml", slug: "milk-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 320, originalPrice: 420, rating: 4.8, reviews: 712, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Milk FaceWash from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "amber", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-285", name: "Neem FaceWash-120 ml", slug: "neem-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 310, rating: 4.7, reviews: 645, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Neem FaceWash from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "emerald", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-208", name: "Rose Water FaceWash-120 ml", slug: "rose-water-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 290, rating: 4.6, reviews: 534, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Rose Water FaceWash from Vertex Life", inStock: true, stock: 201, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "red", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-263", name: "Glycerin FaceWash-120 ml", slug: "glycerin-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 280, rating: 4.5, reviews: 423, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Glycerin FaceWash from Vertex Life", inStock: true, stock: 89, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "green", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-254", name: "Turmeric FaceWash-120 ml", slug: "turmeric-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 300, originalPrice: 380, rating: 4.8, reviews: 756, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Turmeric FaceWash from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "yellow", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-290", name: "Aloe Vera FaceWash-120 ml", slug: "aloe-vera-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 315, rating: 4.7, reviews: 623, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Aloe Vera FaceWash from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "pink", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-235", name: "Charcoal FaceWash-120 ml", slug: "charcoal-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 325, rating: 4.9, reviews: 834, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Charcoal FaceWash from Vertex Life", inStock: true, stock: 112, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "purple", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-207", name: "Honey FaceWash-120 ml", slug: "honey-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 305, rating: 4.6, reviews: 489, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Honey FaceWash from Vertex Life", inStock: true, stock: 156, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "cyan", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-267", name: "Green Tea FaceWash-120 ml", slug: "green-tea-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 335, originalPrice: 420, rating: 4.8, reviews: 712, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Green Tea FaceWash from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "amber", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-214", name: "Lemon FaceWash-120 ml", slug: "lemon-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 295, rating: 4.5, reviews: 356, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Lemon FaceWash from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "emerald", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-289", name: "Cucumber FaceWash-120 ml", slug: "cucumber-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 310, rating: 4.7, reviews: 598, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Cucumber FaceWash from Vertex Life", inStock: false, stock: 78, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "red", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-269", name: "Mint FaceWash-120 ml", slug: "mint-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 320, rating: 4.8, reviews: 723, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Mint FaceWash from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "green", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-268", name: "Orange FaceWash-120 ml", slug: "orange-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 315, rating: 4.6, reviews: 467, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Orange FaceWash from Vertex Life", inStock: true, stock: 189, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "yellow", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-236", name: "Papaya FaceWash-120 ml", slug: "papaya-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 330, rating: 4.9, reviews: 834, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Papaya FaceWash from Vertex Life", inStock: true, stock: 112, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "pink", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-212", name: "Pearl FaceWash-120 ml", slug: "pearl-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 340, originalPrice: 450, rating: 4.7, reviews: 645, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Pearl FaceWash from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "purple", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-288", name: "Sandalwood FaceWash-120 ml", slug: "sandalwood-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 350, rating: 4.8, reviews: 756, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Sandalwood FaceWash from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "cyan", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-215", name: "Lavender FaceWash-120 ml", slug: "lavender-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 325, rating: 4.5, reviews: 423, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Lavender FaceWash from Vertex Life", inStock: true, stock: 201, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "amber", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-213", name: "Rose FaceWash-120 ml", slug: "rose-facewash-120-ml", category: "Cosmetics items", categorySlug: "cosmetics_items", price: 315, rating: 4.7, reviews: 598, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Rose FaceWash from Vertex Life", inStock: true, stock: 89, vendorName: "Vertex Life", tags: ["cosmetics_items", "verified", "authentic"], badgeColor: "emerald", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-225", name: "Hair Oil Professional-200ml", slug: "hair-oil-professional-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 480, rating: 4.7, reviews: 512, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Hair Oil Professional from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "red", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-209", name: "Hair Oil Extra Care-200ml", slug: "hair-oil-extra-care-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 520, originalPrice: 650, rating: 4.8, reviews: 634, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Hair Oil Extra Care from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "green", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-264", name: "Hair Oil Advanced-200ml", slug: "hair-oil-advanced-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 500, rating: 4.6, reviews: 489, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Hair Oil Advanced from Vertex Life", inStock: true, stock: 112, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "yellow", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-231", name: "Hair Oil Premium-200ml", slug: "hair-oil-premium-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 590, rating: 4.9, reviews: 823, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Hair Oil Premium from Vertex Life", inStock: true, stock: 156, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "pink", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-211", name: "Hair Oil Herbal-200ml", slug: "hair-oil-herbal-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 450, originalPrice: 580, rating: 4.5, reviews: 345, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Hair Oil Herbal from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "purple", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-228", name: "Hair Oil Organic-200ml", slug: "hair-oil-organic-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 510, rating: 4.7, reviews: 567, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Hair Oil Organic from Vertex Life", inStock: false, stock: 89, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "cyan", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-232", name: "Hair Oil Natural-200ml", slug: "hair-oil-natural-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 480, rating: 4.8, reviews: 712, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Hair Oil Natural from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "amber", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-224", name: "Hair Oil Coconut-200ml", slug: "hair-oil-coconut-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 520, rating: 4.6, reviews: 423, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Hair Oil Coconut from Vertex Life", inStock: true, stock: 201, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "emerald", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-234", name: "Hair Oil Almond-200ml", slug: "hair-oil-almond-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 550, originalPrice: 680, rating: 4.9, reviews: 834, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Hair Oil Almond from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "red", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-210", name: "Hair Oil Jaborandi-200ml", slug: "hair-oil-jaborandi-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 490, rating: 4.7, reviews: 556, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Hair Oil Jaborandi from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "green", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-230", name: "Hair Oil Jasmine-200ml", slug: "hair-oil-jasmine-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 530, rating: 4.8, reviews: 689, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Hair Oil Jasmine from Vertex Life", inStock: true, stock: 112, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "yellow", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-223", name: "Hair Oil Rose-200ml", slug: "hair-oil-rose-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 510, rating: 4.5, reviews: 378, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Hair Oil Rose from Vertex Life", inStock: true, stock: 156, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "pink", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-244", name: "Hair Oil Lily-200ml", slug: "hair-oil-lily-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 540, rating: 4.7, reviews: 612, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Hair Oil Lily from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "purple", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-270", name: "Hair Oil Flower-200ml", slug: "hair-oil-flower-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 525, originalPrice: 650, rating: 4.8, reviews: 723, image: "https://myvertexbd.com/ecom/image/category/66c777c88f197.webp", shortDescription: "Premium Hair Oil Flower from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "cyan", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-227", name: "Hair Oil Essence-200ml", slug: "hair-oil-essence-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 515, rating: 4.6, reviews: 456, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Hair Oil Essence from Vertex Life", inStock: true, stock: 201, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "amber", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-233", name: "Hair Oil Extract-200ml", slug: "hair-oil-extract-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 560, rating: 4.9, reviews: 834, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Hair Oil Extract from Vertex Life", inStock: true, stock: 89, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "emerald", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-229", name: "Hair Oil Blend-200ml", slug: "hair-oil-blend-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 545, rating: 4.7, reviews: 534, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Hair Oil Blend from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "red", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-226", name: "Hair Oil Mix-200ml", slug: "hair-oil-mix-200ml", category: "Salon & Parlour Item", categorySlug: "salon_parlour_item", price: 535, originalPrice: 680, rating: 4.8, reviews: 678, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Hair Oil Mix from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["salon_parlour_item", "verified", "authentic"], badgeColor: "green", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-262", name: "Zafran Hair Oil-100ml", slug: "zafran-hair-oil-100ml", category: "Hair oil & Gel", categorySlug: "hair_oil_gel", price: 890, rating: 4.9, reviews: 623, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Zafran Hair Oil from Vertex Life", inStock: true, stock: 112, vendorName: "Vertex Life", tags: ["hair_oil_gel", "verified", "authentic"], badgeColor: "yellow", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-261", name: "Zafran Hair Oil-100ml (Variant)", slug: "zafran-hair-oil-100ml-variant", category: "Hair oil & Gel", categorySlug: "hair_oil_gel", price: 920, rating: 4.8, reviews: 534, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium Zafran Hair Oil variant from Vertex Life", inStock: true, stock: 156, vendorName: "Vertex Life", tags: ["hair_oil_gel", "verified", "authentic"], badgeColor: "pink", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-245", name: "Hair Oil -200 ml", slug: "hair-oil-200-ml", category: "Hair oil & Gel", categorySlug: "hair_oil_gel", price: 1050, originalPrice: 1350, rating: 4.9, reviews: 789, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Hair Oil from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["hair_oil_gel", "verified", "authentic"], badgeColor: "purple", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-246", name: "Hair Tonic Gel - 100 gm", slug: "hair-tonic-gel-100-gm", category: "Hair oil & Gel", categorySlug: "hair_oil_gel", price: 620, rating: 4.6, reviews: 412, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Hair Tonic Gel from Vertex Life", inStock: false, stock: 67, vendorName: "Vertex Life", tags: ["hair_oil_gel", "verified", "authentic"], badgeColor: "cyan", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-250", name: "Masala Premix Milk Tea", slug: "masala-premix-milk-tea", category: "Tea & Coffee", categorySlug: "tea_coffee", price: 1100, rating: 4.7, reviews: 534, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Masala Premix Milk Tea from Vertex Life", inStock: true, stock: 145, vendorName: "Vertex Life", tags: ["tea_coffee", "verified", "authentic"], badgeColor: "amber", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-248", name: "MaCa Premix Coffee", slug: "maca-premix-coffee", category: "Tea & Coffee", categorySlug: "tea_coffee", price: 780, originalPrice: 950, rating: 4.8, reviews: 678, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium MaCa Premix Coffee from Vertex Life", inStock: true, stock: 178, vendorName: "Vertex Life", tags: ["tea_coffee", "verified", "authentic"], badgeColor: "emerald", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-251", name: "Coral Premix Coffee", slug: "coral-premix-coffee", category: "Tea & Coffee", categorySlug: "tea_coffee", price: 1320, rating: 4.6, reviews: 445, image: "https://myvertexbd.com/ecom/image/category/62fb70c13fd09.webp", shortDescription: "Premium Coral Premix Coffee from Vertex Life", inStock: false, stock: 92, vendorName: "Vertex Life", tags: ["tea_coffee", "verified", "authentic"], badgeColor: "red", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-253", name: "Gano Mashoom Premix Coffee", slug: "gano-mashoom-premix-coffee", category: "Tea & Coffee", categorySlug: "tea_coffee", price: 1450, rating: 4.9, reviews: 812, image: "https://myvertexbd.com/ecom/image/category/67628dd94b90f.webp", shortDescription: "Premium Gano Mashoom Premix Coffee from Vertex Life", inStock: true, stock: 134, vendorName: "Vertex Life", tags: ["tea_coffee", "verified", "authentic"], badgeColor: "green", isBestseller: true, isNew: true, isFeatured: true },
  { id: "ext-249", name: "Green PreMix Coffee", slug: "green-premix-coffee", category: "Tea & Coffee", categorySlug: "tea_coffee", price: 920, originalPrice: 1150, rating: 4.7, reviews: 556, image: "https://myvertexbd.com/ecom/image/category/62fb710457c8a.webp", shortDescription: "Premium Green PreMix Coffee from Vertex Life", inStock: true, stock: 167, vendorName: "Vertex Life", tags: ["tea_coffee", "verified", "authentic"], badgeColor: "yellow", isBestseller: false, isNew: true, isFeatured: false },
  { id: "ext-252", name: "CHAMOMILE Premix Coffee", slug: "chamomile-premix-coffee", category: "Tea & Coffee", categorySlug: "tea_coffee", price: 1050, rating: 4.8, reviews: 723, image: "https://myvertexbd.com/ecom/image/category/6331c4662f487.webp", shortDescription: "Premium CHAMOMILE Premix Coffee from Vertex Life", inStock: true, stock: 201, vendorName: "Vertex Life", tags: ["tea_coffee", "verified", "authentic"], badgeColor: "pink", isBestseller: true, isNew: true, isFeatured: true },
];

// Color palettes for additional generated products
const colorPalettes = [
  { bg: "from-purple-600 to-indigo-600", accent: "purple", text: "text-purple-300" },
  { bg: "from-pink-600 to-rose-600", accent: "pink", text: "text-pink-300" },
  { bg: "from-cyan-600 to-blue-600", accent: "cyan", text: "text-cyan-300" },
  { bg: "from-emerald-600 to-teal-600", accent: "emerald", text: "text-emerald-300" },
  { bg: "from-amber-600 to-orange-600", accent: "amber", text: "text-amber-300" },
  { bg: "from-red-600 to-pink-600", accent: "red", text: "text-red-300" },
  { bg: "from-green-600 to-emerald-600", accent: "green", text: "text-green-300" },
  { bg: "from-yellow-600 to-amber-600", accent: "yellow", text: "text-yellow-300" },
  { bg: "from-blue-600 to-cyan-600", accent: "blue", text: "text-blue-300" },
  { bg: "from-violet-600 to-purple-600", accent: "violet", text: "text-violet-300" },
];

const categories = [
  { name: "Health Items", slug: "health_items" },
  { name: "Consumer Items", slug: "consumer_items" },
  { name: "Cosmetics items", slug: "cosmetics_items" },
  { name: "Salon & Parlour Item", slug: "salon_parlour_item" },
  { name: "Hair oil & Gel", slug: "hair_oil_gel" },
  { name: "Tea & Coffee", slug: "tea_coffee" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Sports & Fitness", slug: "sports" },
  { name: "Gaming", slug: "gaming" },
  { name: "Jewelry & Watches", slug: "jewelry" },
  { name: "Books & Media", slug: "books" },
  { name: "Kids & Toys", slug: "kids" },
];

const productNames = [
  "Wireless Earbuds Pro", "USB-C Hub 7-in-1", "Portable SSD 1TB", "Smart Watch Series",
  "Casual Cotton T-Shirt", "Slim Fit Jeans", "Crew Neck Sweater", "Polo Shirt",
  "Yoga Mat Non-Slip", "Resistance Bands", "Dumbbell Set", "Kettlebell",
  "Gaming Headset", "Controller Pad", "Gaming Chair", "Desk Mount",
  "Gold Chain Necklace", "Silver Bracelet", "Diamond Ring", "Pearl Earrings",
  "Fiction Novel", "Self-Help Book", "Biography", "Science Book",
  "Action Figure", "LEGO Set", "Puzzle Game", "Board Game",
];

const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
];

function generateProducts(): Product[] {
  const generatedProducts: Product[] = [];
  let productId = 500;

  const externalCategorySlugs = externalProductsFromAPI.map(p => p.categorySlug);
  const genCategories = categories.filter(c => !externalCategorySlugs.includes(c.slug));

  for (const category of genCategories) {
    for (let i = 0; i < 20; i++) {
      productId++;
      const palette = colorPalettes[(productId - 1) % colorPalettes.length];
      const productName = productNames[(productId - 1) % productNames.length];
      const basePrice = Math.floor(Math.random() * 2900) + 9;
      const hasDiscount = Math.random() > 0.6;
      
      generatedProducts.push({
        id: `p${productId}`,
        name: `${productName} ${i + 1}`,
        slug: `${productName.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
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
        shortDescription: `Premium ${productName.toLowerCase()} with modern design`,
        inStock: Math.random() > 0.1,
        stock: Math.floor(Math.random() * 100) + 1,
        isNew: Math.random() > 0.85,
        isBestseller: Math.random() > 0.92,
        isFeatured: Math.random() > 0.95,
        vendorName: ["NexStore", "Premium Shop", "Quality Goods", "Elite Traders"][Math.floor(Math.random() * 4)],
        tags: [category.slug, "trending", "quality"],
        badgeColor: palette.accent,
      });
    }
  }

  return generatedProducts;
}

export const products: Product[] = [
  ...externalProductsFromAPI,
  ...generateProducts(),
];

export const PRODUCTS = products;

export const featuredProducts = products.filter(p => p.isFeatured).slice(0, 12);
export const newArrivals = products.filter(p => p.isNew).slice(0, 12);
export const bestsellers = products.filter(p => p.isBestseller).slice(0, 12);

export { categories };

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
