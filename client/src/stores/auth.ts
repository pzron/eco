import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  role: 'customer' | 'affiliate' | 'vendor' | 'admin';
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  bankAccount?: string;
  taxId?: string;
  affiliateApplied?: boolean;
  affiliateApprovedAt?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  submitAffiliateApplication: (formData: any) => void;
  approveAffiliateApplication: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        set({
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: 'https://github.com/shadcn.png',
            role: 'customer',
          },
          isAuthenticated: true,
        });
      },
      signup: (email: string, password: string, name: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            avatar: 'https://github.com/shadcn.png',
            role: 'customer',
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
      submitAffiliateApplication: (formData: any) => {
        set((state) => ({
          user: state.user ? { 
            ...state.user, 
            affiliateApplied: true,
            phone: formData.phone || state.user.phone,
            address: formData.address || state.user.address,
            city: formData.city || state.user.city,
            country: formData.country || state.user.country,
            postalCode: formData.postalCode || state.user.postalCode,
            bankAccount: formData.bankAccount,
            taxId: formData.taxId,
          } : null,
        }));
      },
      approveAffiliateApplication: () => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            role: 'affiliate',
            affiliateApprovedAt: new Date().toISOString(),
          } : null,
        }));
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
