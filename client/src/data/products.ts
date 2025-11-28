export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "e1",
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    price: 45999,
    originalPrice: 49999,
    rating: 4.9,
    reviews: 2847,
    image: "https://public.readdy.ai/ai/img_res/3ecb9515515c5565557f3118f811827c.jpg",
    isNew: true,
    inStock: true
  },
  {
    id: "e2",
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    price: 52999,
    originalPrice: 56999,
    rating: 4.8,
    reviews: 1923,
    image: "https://readdy.ai/api/search-image?query=elegant%20Samsung%20Galaxy%20S24%20Ultra%20smartphone%20with%20S%20Pen%20stylus%20quad%20camera%20array%20on%20pristine%20white%20background%20studio%20lighting%20premium%20product%20shot&width=400&height=400&seq=e2&orientation=squarish",
    inStock: true
  },
  {
    id: "e3",
    name: 'MacBook Pro 16" M3',
    category: "Electronics",
    price: 125999,
    originalPrice: 139999,
    rating: 4.9,
    reviews: 1456,
    image: "https://readdy.ai/api/search-image?query=sleek%20silver%20MacBook%20Pro%2016%20inch%20laptop%20open%20display%20showing%20screen%20on%20clean%20white%20surface%20minimal%20background%20professional%20tech%20photography&width=400&height=400&seq=e3&orientation=squarish",
    isBestseller: true,
    inStock: true
  },
  {
    id: "e4",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    price: 15999,
    originalPrice: 18999,
    rating: 4.7,
    reviews: 3421,
    image: "https://readdy.ai/api/search-image?query=premium%20black%20Sony%20noise%20cancelling%20over%20ear%20headphones%20floating%20on%20pure%20white%20background%20soft%20shadows%20product%20photography%20style&width=400&height=400&seq=e4&orientation=squarish",
    inStock: true
  },
  {
    id: "f1",
    name: "Premium Leather Jacket",
    category: "Fashion",
    price: 8999,
    originalPrice: 11999,
    rating: 4.6,
    reviews: 543,
    image: "https://readdy.ai/api/search-image?query=luxury%20black%20leather%20jacket%20hanging%20on%20white%20background%20fashion%20product%20photography%20studio%20lighting&width=400&height=400&seq=f1&orientation=squarish",
    inStock: true
  },
  {
    id: "s1",
    name: "Professional Yoga Mat",
    category: "Sports",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 1567,
    image: "https://readdy.ai/api/search-image?query=premium%20yoga%20mat%20rolled%20up%20on%20white%20background%20fitness%20equipment%20product%20photography&width=400&height=400&seq=s1&orientation=squarish",
    inStock: true
  },
  {
    id: "h1",
    name: "Smart LED Bulbs 4-Pack",
    category: "Home",
    price: 1999,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 1876,
    image: "https://readdy.ai/api/search-image?query=smart%20LED%20light%20bulbs%20arranged%20on%20white%20background%20home%20automation%20product&width=400&height=400&seq=h1&orientation=squarish",
    inStock: true
  }
];

export const categories = [
  { id: "electronics", name: "Electronics", icon: "Smartphone" },
  { id: "fashion", name: "Fashion", icon: "Shirt" },
  { id: "beauty", name: "Beauty", icon: "Sparkles" },
  { id: "food", name: "Food & Beverage", icon: "Coffee" },
  { id: "sports", name: "Sports & Fitness", icon: "Dumbbell" },
  { id: "home", name: "Home & Living", icon: "Home" },
  { id: "appliances", name: "Appliances", icon: "Refrigerator" },
  { id: "wellness", name: "Health & Wellness", icon: "Heart" },
  { id: "books", name: "Books & Media", icon: "Book" },
  { id: "toys", name: "Toys & Games", icon: "Gamepad2" },
  { id: "auto", name: "Automotive", icon: "Car" },
  { id: "jewelry", name: "Jewelry & Watches", icon: "Watch" },
  { id: "pets", name: "Pet Supplies", icon: "Dog" },
];
