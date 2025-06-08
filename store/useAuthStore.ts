import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      
      login: async (email: string, password: string) => {
        // In a real app, this would be an API call
        // For demo purposes, we'll just check if the email and password match
        if (email && password.length >= 6) {
          set({
            user: {
              id: '1',
              name: email.split('@')[0],
              email,
              isAdmin: false,
            },
            isAuthenticated: true,
            isAdmin: false,
          });
          return true;
        }
        return false;
      },
      
      adminLogin: async (email: string, password: string) => {
        // In a real app, this would be an API call with proper authentication
        // For demo purposes, we'll just check if the email contains "admin"
        if (email.includes('admin') && password === 'admin123') {
          set({
            user: {
              id: 'admin1',
              name: 'Администратор',
              email,
              isAdmin: true,
            },
            isAuthenticated: true,
            isAdmin: true,
          });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);