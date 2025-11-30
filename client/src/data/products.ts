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

// Comprehensive products from external source - Vertex Life International
const externalProductsFromAPI: Product[] = [
  // Health & Wellness - Proteins & Supplements
  {
    id: "ext-1",
    name: "Soya Protein - 400 gm",
    slug: "soya-protein-400gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 850,
    originalPrice: 999,
    rating: 4.7,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "protein", "supplement", "bestseller"],
    badgeColor: "red",
    inStock: true,
    stock: 89,
    isBestseller: true,
  },
  {
    id: "ext-2",
    name: "Moringa Plus - 100 gm",
    slug: "moringa-plus-100gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 450,
    originalPrice: 599,
    rating: 4.8,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "moringa", "supplement", "organic"],
    badgeColor: "green",
    inStock: true,
    stock: 156,
    isBestseller: true,
  },
  {
    id: "ext-3",
    name: "Aloveera Plus - 120 gm",
    slug: "aloveera-plus-120gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 550,
    rating: 4.6,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "aloveera", "supplement"],
    badgeColor: "emerald",
    inStock: true,
    stock: 112,
  },
  {
    id: "ext-4",
    name: "Katila Plus - 120 gm",
    slug: "katila-plus-120gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 650,
    originalPrice: 799,
    rating: 4.7,
    reviews: 398,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "katila", "supplement"],
    badgeColor: "blue",
    inStock: true,
    stock: 94,
  },
  {
    id: "ext-5",
    name: "Multi-Purpose Liquid Detergent - 1 Litre",
    slug: "multipurpose-liquid-detergent-1l",
    category: "Home Care",
    categorySlug: "home_care",
    price: 350,
    rating: 4.5,
    reviews: 721,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["home", "detergent", "cleaning"],
    badgeColor: "cyan",
    inStock: true,
    stock: 234,
    isBestseller: true,
  },
  {
    id: "ext-6",
    name: "Orange & Turmeric Soap - 100 gm",
    slug: "orange-turmeric-soap-100gm",
    category: "Beauty & Personal Care",
    categorySlug: "beauty",
    price: 250,
    originalPrice: 350,
    rating: 4.8,
    reviews: 648,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    vendorName: "Vertex Life",
    tags: ["beauty", "soap", "personal care", "organic"],
    badgeColor: "amber",
    inStock: true,
    stock: 145,
    isNew: true,
  },
  
  // Additional Health & Wellness Products
  {
    id: "ext-7",
    name: "Turmeric Powder - 250 gm",
    slug: "turmeric-powder-250gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 280,
    originalPrice: 350,
    rating: 4.6,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "spice", "turmeric", "organic"],
    badgeColor: "yellow",
    inStock: true,
    stock: 178,
  },
  {
    id: "ext-8",
    name: "Ginger Extract - 100 ml",
    slug: "ginger-extract-100ml",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 420,
    rating: 4.7,
    reviews: 356,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "ginger", "extract", "supplement"],
    badgeColor: "orange",
    inStock: true,
    stock: 87,
  },
  {
    id: "ext-9",
    name: "Honey Pure Organic - 500 gm",
    slug: "honey-pure-organic-500gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 680,
    originalPrice: 850,
    rating: 4.9,
    reviews: 891,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "honey", "organic", "bestseller"],
    badgeColor: "amber",
    inStock: true,
    stock: 124,
    isBestseller: true,
  },
  {
    id: "ext-10",
    name: "Black Seed Oil - 250 ml",
    slug: "black-seed-oil-250ml",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 550,
    originalPrice: 699,
    rating: 4.8,
    reviews: 623,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "oil", "supplement", "organic"],
    badgeColor: "purple",
    inStock: true,
    stock: 95,
  },

  // Beauty & Personal Care
  {
    id: "ext-11",
    name: "Neem Face Wash - 200 ml",
    slug: "neem-face-wash-200ml",
    category: "Beauty & Personal Care",
    categorySlug: "beauty",
    price: 320,
    rating: 4.6,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    vendorName: "Vertex Life",
    tags: ["beauty", "face wash", "skincare"],
    badgeColor: "green",
    inStock: true,
    stock: 112,
  },
  {
    id: "ext-12",
    name: "Aloe Vera Gel Pure - 200 ml",
    slug: "aloe-vera-gel-pure-200ml",
    category: "Beauty & Personal Care",
    categorySlug: "beauty",
    price: 280,
    originalPrice: 380,
    rating: 4.7,
    reviews: 687,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    vendorName: "Vertex Life",
    tags: ["beauty", "aloe vera", "skincare"],
    badgeColor: "green",
    inStock: true,
    stock: 156,
  },
  {
    id: "ext-13",
    name: "Charcoal Face Mask - 100 gm",
    slug: "charcoal-face-mask-100gm",
    category: "Beauty & Personal Care",
    categorySlug: "beauty",
    price: 380,
    rating: 4.5,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    vendorName: "Vertex Life",
    tags: ["beauty", "face mask", "skincare"],
    badgeColor: "gray",
    inStock: true,
    stock: 78,
  },
  {
    id: "ext-14",
    name: "Coconut Oil Virgin - 500 ml",
    slug: "coconut-oil-virgin-500ml",
    category: "Beauty & Personal Care",
    categorySlug: "beauty",
    price: 450,
    originalPrice: 599,
    rating: 4.8,
    reviews: 912,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    vendorName: "Vertex Life",
    tags: ["beauty", "oil", "hair care", "organic"],
    badgeColor: "yellow",
    inStock: true,
    stock: 134,
    isBestseller: true,
  },
  {
    id: "ext-15",
    name: "Shea Butter Raw - 150 gm",
    slug: "shea-butter-raw-150gm",
    category: "Beauty & Personal Care",
    categorySlug: "beauty",
    price: 320,
    rating: 4.6,
    reviews: 356,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    vendorName: "Vertex Life",
    tags: ["beauty", "butter", "skincare"],
    badgeColor: "amber",
    inStock: true,
    stock: 89,
  },

  // Home Care Products
  {
    id: "ext-16",
    name: "Herbal Floor Cleaner - 1 Litre",
    slug: "herbal-floor-cleaner-1l",
    category: "Home Care",
    categorySlug: "home_care",
    price: 280,
    rating: 4.4,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["home", "cleaner", "floor"],
    badgeColor: "green",
    inStock: true,
    stock: 167,
  },
  {
    id: "ext-17",
    name: "Organic Dish Soap - 500 ml",
    slug: "organic-dish-soap-500ml",
    category: "Home Care",
    categorySlug: "home_care",
    price: 220,
    originalPrice: 299,
    rating: 4.5,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["home", "soap", "dish"],
    badgeColor: "blue",
    inStock: true,
    stock: 201,
  },
  {
    id: "ext-18",
    name: "Laundry Detergent Powder - 1 kg",
    slug: "laundry-detergent-powder-1kg",
    category: "Home Care",
    categorySlug: "home_care",
    price: 380,
    rating: 4.6,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["home", "detergent", "laundry"],
    badgeColor: "purple",
    inStock: true,
    stock: 145,
  },
  {
    id: "ext-19",
    name: "Air Freshener Natural - 250 ml",
    slug: "air-freshener-natural-250ml",
    category: "Home Care",
    categorySlug: "home_care",
    price: 190,
    rating: 4.3,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["home", "freshener", "air"],
    badgeColor: "pink",
    inStock: true,
    stock: 123,
  },
  {
    id: "ext-20",
    name: "Glass & Window Cleaner - 500 ml",
    slug: "glass-window-cleaner-500ml",
    category: "Home Care",
    categorySlug: "home_care",
    price: 210,
    rating: 4.4,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["home", "cleaner", "glass"],
    badgeColor: "cyan",
    inStock: true,
    stock: 98,
  },

  // Food & Nutrition
  {
    id: "ext-21",
    name: "Organic Rice - 5 kg",
    slug: "organic-rice-5kg",
    category: "Food & Nutrition",
    categorySlug: "food",
    price: 850,
    originalPrice: 999,
    rating: 4.7,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["food", "rice", "organic"],
    badgeColor: "yellow",
    inStock: true,
    stock: 267,
    isBestseller: true,
  },
  {
    id: "ext-22",
    name: "Mustard Oil Pure - 1 Litre",
    slug: "mustard-oil-pure-1l",
    category: "Food & Nutrition",
    categorySlug: "food",
    price: 680,
    rating: 4.6,
    reviews: 532,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["food", "oil", "cooking"],
    badgeColor: "amber",
    inStock: true,
    stock: 145,
  },
  {
    id: "ext-23",
    name: "Lentil Mix - 1 kg",
    slug: "lentil-mix-1kg",
    category: "Food & Nutrition",
    categorySlug: "food",
    price: 420,
    originalPrice: 520,
    rating: 4.5,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["food", "lentil", "organic"],
    badgeColor: "red",
    inStock: true,
    stock: 189,
  },
  {
    id: "ext-24",
    name: "Chickpea Flour - 500 gm",
    slug: "chickpea-flour-500gm",
    category: "Food & Nutrition",
    categorySlug: "food",
    price: 280,
    rating: 4.4,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["food", "flour", "chickpea"],
    badgeColor: "yellow",
    inStock: true,
    stock: 112,
  },
  {
    id: "ext-25",
    name: "Dates Premium - 500 gm",
    slug: "dates-premium-500gm",
    category: "Food & Nutrition",
    categorySlug: "food",
    price: 650,
    originalPrice: 799,
    rating: 4.8,
    reviews: 745,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["food", "dates", "premium"],
    badgeColor: "red",
    inStock: true,
    stock: 78,
    isNew: true,
  },

  // Additional Wellness Products
  {
    id: "ext-26",
    name: "Spirulina Powder - 100 gm",
    slug: "spirulina-powder-100gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 480,
    originalPrice: 599,
    rating: 4.7,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "spirulina", "supplement"],
    badgeColor: "blue",
    inStock: true,
    stock: 67,
  },
  {
    id: "ext-27",
    name: "Apple Cider Vinegar - 500 ml",
    slug: "apple-cider-vinegar-500ml",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 320,
    rating: 4.6,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "vinegar", "organic"],
    badgeColor: "brown",
    inStock: true,
    stock: 134,
  },
  {
    id: "ext-28",
    name: "Fenugreek Powder - 200 gm",
    slug: "fenugreek-powder-200gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 240,
    rating: 4.5,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "fenugreek", "spice"],
    badgeColor: "yellow",
    inStock: true,
    stock: 156,
  },
  {
    id: "ext-29",
    name: "Ashwagandha Root - 100 gm",
    slug: "ashwagandha-root-100gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 420,
    originalPrice: 550,
    rating: 4.8,
    reviews: 612,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "ashwagandha", "supplement"],
    badgeColor: "purple",
    inStock: true,
    stock: 92,
    isBestseller: true,
  },
  {
    id: "ext-30",
    name: "Amla Powder Organic - 200 gm",
    slug: "amla-powder-organic-200gm",
    category: "Health & Wellness",
    categorySlug: "health",
    price: 280,
    rating: 4.7,
    reviews: 478,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33feq?w=400",
    vendorName: "Vertex Life",
    tags: ["health", "amla", "vitamin c"],
    badgeColor: "green",
    inStock: true,
    stock: 145,
  },
];

// Color palettes for diverse styling
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
  { name: "Health & Wellness", slug: "health" },
  { name: "Beauty & Personal Care", slug: "beauty" },
  { name: "Home Care", slug: "home_care" },
  { name: "Food & Nutrition", slug: "food" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Sports & Fitness", slug: "sports" },
  { name: "Gaming", slug: "gaming" },
  { name: "Jewelry & Watches", slug: "jewelry" },
  { name: "Books & Media", slug: "books" },
  { name: "Kids & Toys", slug: "kids" },
];

const productNames = [
  // Electronics
  "Wireless Earbuds Pro", "USB-C Hub 7-in-1", "Portable SSD 1TB", "Smart Watch Series",
  "Bluetooth Speaker", "4K Webcam", "Mechanical Keyboard", "Gaming Mouse",
  
  // Fashion
  "Casual Cotton T-Shirt", "Slim Fit Jeans", "Crew Neck Sweater", "Polo Shirt",
  "Denim Jacket", "Chino Pants", "Hoodie Sweatshirt", "V-Neck Cardigan",
  
  // Sports & Fitness
  "Yoga Mat Non-Slip", "Resistance Bands", "Dumbbell Set", "Kettlebell",
  "Pull-up Bar", "Ab Wheel", "Foam Roller", "Jump Rope",
  
  // Gaming
  "Gaming Headset", "Controller Pad", "Gaming Chair", "Desk Mount",
  "Mousepad Large", "Game Console", "Graphics Card", "SSD NVMe",
  
  // Jewelry & Watches
  "Gold Chain Necklace", "Silver Bracelet", "Diamond Ring", "Pearl Earrings",
  "Analog Watch", "Smart Watch", "Leather Strap", "Beaded Bracelet",
  
  // Books & Media
  "Fiction Novel", "Self-Help Book", "Biography", "Science Book",
  "Comic Book Series", "Travel Guide", "Cookbook", "Art Book",
  
  // Kids & Toys
  "Action Figure", "LEGO Set", "Puzzle Game", "Board Game",
  "Plush Toy", "Building Blocks", "Toy Car", "Doll",
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
  let productId = 0;

  // Filter out categories that are populated from external API
  const genCategories = categories.filter(c => !["health", "beauty", "home_care", "food"].includes(c.slug));

  for (const category of genCategories) {
    for (let i = 0; i < 25; i++) {
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

// Combine all products: External API products + Generated products
export const products: Product[] = [
  ...externalProductsFromAPI,
  ...generateProducts(),
];

// Export as both lowercase and uppercase for compatibility
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
