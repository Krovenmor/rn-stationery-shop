import { create } from 'zustand';
import { useCartStore } from './cartStore';
import { getToken, removeToken, saveToken } from '../auth/authService';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  restoreSession: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoading: true,
  restoreSession: async () => {
    try {
      set({ token: await getToken() });
    } catch {
      set({ token: null });
    } finally {
      set({ isLoading: false });
    }
  },
  signIn: async (token) => {
    await saveToken(token);
    set({ token });
  },
  signOut: async () => {
    await removeToken();
    useCartStore.getState().clear();
    set({ token: null });
  },
}));
