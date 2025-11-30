import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    set({
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: 'https://github.com/shadcn.png',
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
      },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
