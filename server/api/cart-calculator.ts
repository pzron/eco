// Real-time cart calculation engine with auto-calculations
import { Product, Order } from "@shared/schema";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface CartCalculation {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  taxRate: number;
  shippingRate: number;
  details: {
    itemCount: number;
    weight: number;
    discountPercentage: number;
  };
}

// Configuration
const TAX_RATE = 0.15; // 15% tax
const SHIPPING_RATES = {
  FREE_THRESHOLD: 5000, // Free shipping above ৳5000
  BASE_RATE: 150,
  WEIGHT_MULTIPLIER: 2, // ৳2 per unit weight
};

const DISCOUNT_RULES = {
  BULK_DISCOUNT: { minItems: 5, discountPercent: 5 },
  ORDER_VALUE_DISCOUNT: { minValue: 10000, discountPercent: 10 },
};

/**
 * Calculate real-time cart totals with auto-calculations
 */
export function calculateCartTotals(items: CartItem[]): CartCalculation {
  // Calculate item count and subtotal
  let subtotal = 0;
  let itemCount = 0;
  let weight = 0;

  items.forEach((item) => {
    subtotal += item.price * item.quantity;
    itemCount += item.quantity;
    weight += item.quantity; // Assume 1 unit weight per item
  });

  // Calculate discount
  let discountPercentage = 0;
  
  // Bulk discount
  if (itemCount >= DISCOUNT_RULES.BULK_DISCOUNT.minItems) {
    discountPercentage = DISCOUNT_RULES.BULK_DISCOUNT.discountPercent;
  }
  
  // Order value discount (takes precedence)
  if (subtotal >= DISCOUNT_RULES.ORDER_VALUE_DISCOUNT.minValue) {
    discountPercentage = DISCOUNT_RULES.ORDER_VALUE_DISCOUNT.discountPercent;
  }

  const discount = parseFloat((subtotal * (discountPercentage / 100)).toFixed(2));
  const subtotalAfterDiscount = subtotal - discount;

  // Calculate shipping (automatic)
  let shipping = 0;
  if (subtotalAfterDiscount >= SHIPPING_RATES.FREE_THRESHOLD) {
    shipping = 0; // Free shipping
  } else {
    shipping = SHIPPING_RATES.BASE_RATE + weight * SHIPPING_RATES.WEIGHT_MULTIPLIER;
  }

  // Calculate tax
  const tax = parseFloat((subtotalAfterDiscount * TAX_RATE).toFixed(2));

  // Calculate total
  const total = parseFloat((subtotalAfterDiscount + shipping + tax).toFixed(2));

  return {
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax,
    discount,
    total,
    taxRate: TAX_RATE,
    shippingRate: SHIPPING_RATES.BASE_RATE,
    details: {
      itemCount,
      weight,
      discountPercentage,
    },
  };
}

/**
 * Apply coupon discount to cart
 */
export function applyCoupon(
  calculation: CartCalculation,
  couponCode: string
): CartCalculation {
  // Coupon logic - can be extended
  const coupons: Record<string, number> = {
    WELCOME10: 0.1,
    SAVE20: 0.2,
    NEXSALE15: 0.15,
  };

  const discountPercent = coupons[couponCode.toUpperCase()] || 0;
  if (discountPercent === 0) {
    return calculation;
  }

  const additionalDiscount = parseFloat(
    (calculation.subtotal * discountPercent).toFixed(2)
  );
  const newDiscount = calculation.discount + additionalDiscount;
  const newSubtotal = calculation.subtotal - newDiscount;
  const newShipping =
    newSubtotal >= SHIPPING_RATES.FREE_THRESHOLD
      ? 0
      : SHIPPING_RATES.BASE_RATE;
  const newTax = parseFloat((newSubtotal * TAX_RATE).toFixed(2));
  const newTotal = parseFloat((newSubtotal + newShipping + newTax).toFixed(2));

  return {
    ...calculation,
    discount: newDiscount,
    shipping: newShipping,
    tax: newTax,
    total: newTotal,
  };
}

/**
 * Calculate affiliate commission
 */
export function calculateAffiliateCommission(
  orderTotal: number,
  commissionRate: number = 5
): number {
  return parseFloat((orderTotal * (commissionRate / 100)).toFixed(2));
}

/**
 * Calculate vendor payout (after commission)
 */
export function calculateVendorPayout(
  orderTotal: number,
  commissionRate: number = 10
): { vendorPayout: number; commission: number } {
  const commission = parseFloat((orderTotal * (commissionRate / 100)).toFixed(2));
  const vendorPayout = parseFloat((orderTotal - commission).toFixed(2));
  return { vendorPayout, commission };
}
