export const COMBO_CONFIG = {
  MIN_PRODUCTS: 2,
  MAX_PRODUCTS: 6,
  MIN_ORDER_VALUE: 1000,
  ALLOWED_CATEGORIES: [
    "Electronics",
    "Gaming",
    "Office",
    "Smart Home",
    "Photography",
    "Fitness",
    "Audio",
    "Travel",
    "Education",
    "Accessories"
  ],
  DISCOUNT_TIERS: [
    { minProducts: 2, maxProducts: 2, discountPercent: 5 },
    { minProducts: 3, maxProducts: 3, discountPercent: 10 },
    { minProducts: 4, maxProducts: 4, discountPercent: 15 },
    { minProducts: 5, maxProducts: 6, discountPercent: 20 },
  ]
};

export function calculateComboDiscount(totalPrice: number, productCount: number): number {
  const tier = COMBO_CONFIG.DISCOUNT_TIERS.find(
    t => productCount >= t.minProducts && productCount <= t.maxProducts
  );
  
  if (!tier) return 0;
  return Math.round(totalPrice * (tier.discountPercent / 100));
}

export function getComboSavingsPercentage(productCount: number): number {
  const tier = COMBO_CONFIG.DISCOUNT_TIERS.find(
    t => productCount >= t.minProducts && productCount <= t.maxProducts
  );
  
  return tier?.discountPercent || 0;
}

export function isValidCombo(
  totalPrice: number, 
  productCount: number, 
  categories: string[]
): { valid: boolean; message: string } {
  if (productCount < COMBO_CONFIG.MIN_PRODUCTS) {
    return { 
      valid: false, 
      message: `Add at least ${COMBO_CONFIG.MIN_PRODUCTS} products to create a combo` 
    };
  }
  
  if (productCount > COMBO_CONFIG.MAX_PRODUCTS) {
    return { 
      valid: false, 
      message: `Maximum ${COMBO_CONFIG.MAX_PRODUCTS} products allowed per combo` 
    };
  }
  
  if (totalPrice < COMBO_CONFIG.MIN_ORDER_VALUE) {
    return { 
      valid: false, 
      message: `Minimum order value is ৳${COMBO_CONFIG.MIN_ORDER_VALUE}` 
    };
  }
  
  const invalidCategories = categories.filter(
    c => !COMBO_CONFIG.ALLOWED_CATEGORIES.includes(c)
  );
  
  if (invalidCategories.length > 0) {
    return { 
      valid: false, 
      message: `Some products are not eligible for combo discounts` 
    };
  }
  
  return { valid: true, message: "Combo is valid!" };
}
