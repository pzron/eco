export interface ComboProduct {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface Combo {
  id: number;
  name: string;
  description: string;
  category: string;
  products: ComboProduct[];
  originalPrice: number;
  comboPrice: number;
  savings: number;
  savingsPercent: number;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  isLimited?: boolean;
}

export const combos: Combo[] = [
  {
    id: 1,
    name: "Gaming Starter Pack",
    description: "Everything you need to start your gaming journey. Complete setup with keyboard, mouse, and headset.",
    category: "Gaming",
    products: [
      { id: 101, name: "Gaming Keyboard", image: "/attached_assets/products/keyboard.jpg", price: 5999 },
      { id: 102, name: "Gaming Mouse", image: "/attached_assets/products/mouse.jpg", price: 3999 },
      { id: 103, name: "Gaming Headset", image: "/attached_assets/products/headset.jpg", price: 4999 },
    ],
    originalPrice: 14997,
    comboPrice: 11999,
    savings: 2998,
    savingsPercent: 20,
    rating: 4.8,
    reviews: 256,
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    name: "Home Office Essential",
    description: "Create the perfect work-from-home setup with our premium office essentials bundle.",
    category: "Office",
    products: [
      { id: 201, name: "Monitor Stand", image: "/attached_assets/products/stand.jpg", price: 2999 },
      { id: 202, name: "Wireless Keyboard", image: "/attached_assets/products/wireless-kb.jpg", price: 4499 },
      { id: 203, name: "Webcam HD", image: "/attached_assets/products/webcam.jpg", price: 6999 },
      { id: 204, name: "Desk Organizer", image: "/attached_assets/products/organizer.jpg", price: 1499 },
    ],
    originalPrice: 15996,
    comboPrice: 12499,
    savings: 3497,
    savingsPercent: 22,
    rating: 4.6,
    reviews: 189,
    badge: "New",
    badgeColor: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Smart Home Starter",
    description: "Transform your home into a smart home with these essential connected devices.",
    category: "Smart Home",
    products: [
      { id: 301, name: "Smart Speaker", image: "/attached_assets/products/speaker.jpg", price: 7999 },
      { id: 302, name: "Smart Bulb Pack", image: "/attached_assets/products/bulbs.jpg", price: 2999 },
      { id: 303, name: "Smart Plug Set", image: "/attached_assets/products/plugs.jpg", price: 1999 },
    ],
    originalPrice: 12997,
    comboPrice: 9999,
    savings: 2998,
    savingsPercent: 23,
    rating: 4.7,
    reviews: 312,
    isLimited: true,
  },
  {
    id: 4,
    name: "Photography Pro Bundle",
    description: "Professional photography accessories for stunning shots every time.",
    category: "Photography",
    products: [
      { id: 401, name: "Camera Bag", image: "/attached_assets/products/camera-bag.jpg", price: 4999 },
      { id: 402, name: "Tripod Pro", image: "/attached_assets/products/tripod.jpg", price: 5999 },
      { id: 403, name: "Memory Card 128GB", image: "/attached_assets/products/sd-card.jpg", price: 2999 },
      { id: 404, name: "Lens Cleaning Kit", image: "/attached_assets/products/lens-kit.jpg", price: 999 },
    ],
    originalPrice: 14996,
    comboPrice: 10999,
    savings: 3997,
    savingsPercent: 27,
    rating: 4.9,
    reviews: 145,
    badge: "Top Rated",
    badgeColor: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    name: "Fitness Essentials",
    description: "Get fit with our complete fitness bundle. Everything for your workout needs.",
    category: "Fitness",
    products: [
      { id: 501, name: "Yoga Mat", image: "/attached_assets/products/yoga-mat.jpg", price: 1999 },
      { id: 502, name: "Resistance Bands", image: "/attached_assets/products/bands.jpg", price: 1499 },
      { id: 503, name: "Water Bottle", image: "/attached_assets/products/bottle.jpg", price: 799 },
      { id: 504, name: "Fitness Tracker", image: "/attached_assets/products/tracker.jpg", price: 5999 },
    ],
    originalPrice: 10296,
    comboPrice: 7999,
    savings: 2297,
    savingsPercent: 22,
    rating: 4.5,
    reviews: 423,
  },
  {
    id: 6,
    name: "Student Study Pack",
    description: "Essential tools for academic success. Perfect for students of all levels.",
    category: "Education",
    products: [
      { id: 601, name: "Notebook Set", image: "/attached_assets/products/notebooks.jpg", price: 999 },
      { id: 602, name: "Desk Lamp", image: "/attached_assets/products/lamp.jpg", price: 2499 },
      { id: 603, name: "Pencil Case", image: "/attached_assets/products/pencil-case.jpg", price: 599 },
      { id: 604, name: "Calculator", image: "/attached_assets/products/calculator.jpg", price: 1999 },
    ],
    originalPrice: 6096,
    comboPrice: 4499,
    savings: 1597,
    savingsPercent: 26,
    rating: 4.4,
    reviews: 287,
    badge: "Back to School",
    badgeColor: "from-green-500 to-emerald-500",
  },
  {
    id: 7,
    name: "Audio Enthusiast Set",
    description: "Premium audio experience with our carefully curated sound equipment bundle.",
    category: "Audio",
    products: [
      { id: 701, name: "Wireless Earbuds", image: "/attached_assets/products/earbuds.jpg", price: 8999 },
      { id: 702, name: "Bluetooth Speaker", image: "/attached_assets/products/bt-speaker.jpg", price: 5999 },
      { id: 703, name: "Audio Cable Set", image: "/attached_assets/products/cables.jpg", price: 1499 },
    ],
    originalPrice: 16497,
    comboPrice: 12999,
    savings: 3498,
    savingsPercent: 21,
    rating: 4.8,
    reviews: 198,
    isLimited: true,
    badge: "Premium",
    badgeColor: "from-rose-500 to-red-500",
  },
  {
    id: 8,
    name: "Travel Adventure Kit",
    description: "Essential travel accessories for your next adventure. Pack light, travel smart.",
    category: "Travel",
    products: [
      { id: 801, name: "Travel Backpack", image: "/attached_assets/products/backpack.jpg", price: 6999 },
      { id: 802, name: "Packing Cubes", image: "/attached_assets/products/cubes.jpg", price: 1999 },
      { id: 803, name: "Travel Pillow", image: "/attached_assets/products/pillow.jpg", price: 1499 },
      { id: 804, name: "Universal Adapter", image: "/attached_assets/products/adapter.jpg", price: 999 },
      { id: 805, name: "Luggage Tag Set", image: "/attached_assets/products/tags.jpg", price: 499 },
    ],
    originalPrice: 11995,
    comboPrice: 8999,
    savings: 2996,
    savingsPercent: 25,
    rating: 4.7,
    reviews: 356,
  },
];
