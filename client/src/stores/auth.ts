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
  authMethod?: 'email' | 'google' | 'web3';
  walletAddress?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  loginWithGoogle: (name: string, email: string, avatar: string) => void;
  loginWithWeb3: (walletAddress: string, name: string) => void;
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
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            role: 'customer',
            authMethod: 'email',
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
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            role: 'customer',
            authMethod: 'email',
          },
          isAuthenticated: true,
        });
      },
      loginWithGoogle: (name: string, email: string, avatar: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            avatar,
            role: 'customer',
            authMethod: 'google',
          },
          isAuthenticated: true,
        });
      },
      loginWithWeb3: (walletAddress: string, name: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email: `${walletAddress}@web3.local`,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${walletAddress}`,
            role: 'customer',
            authMethod: 'web3',
            walletAddress,
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
