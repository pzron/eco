import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  phone: text("phone"),
  password: text("password").notNull(),
  role: text("role").default("customer").notNull(),
  avatarUrl: text("avatar_url"),
  fullName: text("full_name"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  postalCode: text("postal_code"),
  walletAddress: text("wallet_address"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  cartItems: many(cartItems),
  orders: many(orders),
  wishlistItems: many(wishlistItems),
  reviews: many(reviews),
}));

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  imageUrl: text("image_url"),
  parentId: varchar("parent_id"),
  sortOrder: integer("sort_order").default(0),
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  products: many(products),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
}));

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  categoryId: varchar("category_id").references(() => categories.id),
  vendorId: varchar("vendor_id").references(() => vendors.id),
  images: text("images").array(),
  model3dUrl: text("model_3d_url"),
  colors: jsonb("colors").$type<{name: string, value: string}[]>(),
  sizes: text("sizes").array(),
  materials: text("materials").array(),
  stock: integer("stock").default(0),
  sku: text("sku"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isNew: boolean("is_new").default(false),
  isBestseller: boolean("is_bestseller").default(false),
  isFeatured: boolean("is_featured").default(false),
  isActive: boolean("is_active").default(true),
  tags: text("tags").array(),
  specifications: jsonb("specifications").$type<Record<string, string>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  vendor: one(vendors, {
    fields: [products.vendorId],
    references: [vendors.id],
  }),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
  wishlistItems: many(wishlistItems),
  reviews: many(reviews),
}));

export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  storeName: text("store_name").notNull(),
  storeSlug: text("store_slug").notNull().unique(),
  description: text("description"),
  logoUrl: text("logo_url"),
  bannerUrl: text("banner_url"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  address: text("address"),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("10"),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  totalSales: integer("total_sales").default(0),
  walletAddress: text("wallet_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  user: one(users, {
    fields: [vendors.userId],
    references: [users.id],
  }),
  products: many(products),
}));

export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  affiliateCode: text("affiliate_code").notNull().unique(),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("5"),
  tier: text("tier").default("bronze"),
  totalEarnings: decimal("total_earnings", { precision: 12, scale: 2 }).default("0"),
  pendingEarnings: decimal("pending_earnings", { precision: 12, scale: 2 }).default("0"),
  totalClicks: integer("total_clicks").default(0),
  totalConversions: integer("total_conversions").default(0),
  isActive: boolean("is_active").default(true),
  payoutMethod: text("payout_method").default("bank"),
  walletAddress: text("wallet_address"),
  badges: text("badges").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const affiliatesRelations = relations(affiliates, ({ one, many }) => ({
  user: one(users, {
    fields: [affiliates.userId],
    references: [users.id],
  }),
  campaigns: many(affiliateCampaigns),
  transactions: many(affiliateTransactions),
}));

export const affiliateCampaigns = pgTable("affiliate_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").references(() => affiliates.id),
  name: text("name").notNull(),
  productId: varchar("product_id").references(() => products.id),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  earnings: decimal("earnings", { precision: 12, scale: 2 }).default("0"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const affiliateCampaignsRelations = relations(affiliateCampaigns, ({ one }) => ({
  affiliate: one(affiliates, {
    fields: [affiliateCampaigns.affiliateId],
    references: [affiliates.id],
  }),
  product: one(products, {
    fields: [affiliateCampaigns.productId],
    references: [products.id],
  }),
}));

export const affiliateTransactions = pgTable("affiliate_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").references(() => affiliates.id),
  orderId: varchar("order_id").references(() => orders.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  status: text("status").default("pending"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const affiliateTransactionsRelations = relations(affiliateTransactions, ({ one }) => ({
  affiliate: one(affiliates, {
    fields: [affiliateTransactions.affiliateId],
    references: [affiliates.id],
  }),
  order: one(orders, {
    fields: [affiliateTransactions.orderId],
    references: [orders.id],
  }),
}));

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  sessionId: varchar("session_id"),
  productId: varchar("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  selectedColor: text("selected_color"),
  selectedSize: text("selected_size"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  userId: varchar("user_id").references(() => users.id),
  status: text("status").default("pending").notNull(),
  paymentStatus: text("payment_status").default("pending"),
  paymentMethod: text("payment_method"),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0"),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  couponCode: text("coupon_code"),
  affiliateCode: text("affiliate_code"),
  shippingAddress: jsonb("shipping_address").$type<{
    fullName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }>(),
  billingAddress: jsonb("billing_address"),
  trackingNumber: text("tracking_number"),
  carrier: text("carrier"),
  estimatedDelivery: timestamp("estimated_delivery"),
  deliveredAt: timestamp("delivered_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id).notNull(),
  productId: varchar("product_id").references(() => products.id).notNull(),
  vendorId: varchar("vendor_id").references(() => vendors.id),
  productName: text("product_name").notNull(),
  productImage: text("product_image"),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  selectedColor: text("selected_color"),
  selectedSize: text("selected_size"),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  vendor: one(vendors, {
    fields: [orderItems.vendorId],
    references: [vendors.id],
  }),
}));

export const wishlistItems = pgTable("wishlist_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  productId: varchar("product_id").references(() => products.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  user: one(users, {
    fields: [wishlistItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [wishlistItems.productId],
    references: [products.id],
  }),
}));

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  productId: varchar("product_id").references(() => products.id).notNull(),
  rating: integer("rating").notNull(),
  title: text("title"),
  content: text("content"),
  images: text("images").array(),
  isVerifiedPurchase: boolean("is_verified_purchase").default(false),
  helpfulCount: integer("helpful_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const coupons = pgTable("coupons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  type: text("type").default("percentage"),
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  minPurchase: decimal("min_purchase", { precision: 10, scale: 2 }),
  maxDiscount: decimal("max_discount", { precision: 10, scale: 2 }),
  usageLimit: integer("usage_limit"),
  usedCount: integer("used_count").default(0),
  isActive: boolean("is_active").default(true),
  startsAt: timestamp("starts_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value"),
  category: text("category").default("general"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  phone: true,
  password: true,
  role: true,
  fullName: true,
  address: true,
  city: true,
  country: true,
  postalCode: true,
  walletAddress: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  createdAt: true,
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertCouponSchema = createInsertSchema(coupons).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliates.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertCoupon = z.infer<typeof insertCouponSchema>;
export type Coupon = typeof coupons.$inferSelect;
export type WishlistItem = typeof wishlistItems.$inferSelect;
export type AffiliateCampaign = typeof affiliateCampaigns.$inferSelect;
export type AffiliateTransaction = typeof affiliateTransactions.$inferSelect;
export type Setting = typeof settings.$inferSelect;
