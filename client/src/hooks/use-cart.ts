import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  sessionId: string;
  
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substring(2, 15);
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      sessionId: generateSessionId(),
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => 
              item.product.id === product.id && 
              item.product.selectedColor === product.selectedColor &&
              item.product.selectedSize === product.selectedSize
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.product.selectedColor === product.selectedColor &&
                item.product.selectedSize === product.selectedSize
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }
          
          return {
            items: [...state.items, { product, quantity }],
            isOpen: true,
          };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      
      getTax: () => {
        return get().getSubtotal() * 0.08;
      },
      
      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= 100) return 0;
        return 9.99;
      },
      
      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },
      
      setIsOpen: (isOpen) => {
        set({ isOpen });
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: 'nexcommerce-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        items: state.items,
        sessionId: state.sessionId
      }),
    }
  )
);
