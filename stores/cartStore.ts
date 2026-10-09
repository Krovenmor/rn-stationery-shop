import { create } from 'zustand';
import { CartLine, Product } from '../types/product';
import { useShallow } from 'zustand/react/shallow';

interface CartState {
  lines: Record<string, CartLine>;

  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: {},

  add: (product, quantity = 1) =>
    set((state) => {
      const existing = state.lines[product.id];
      return {
        lines: {
          ...state.lines,
          [product.id]: existing
            ? { ...existing, quantity: existing.quantity + quantity }
            : { product, quantity },
        },
      };
    }),

  remove: (productId) =>
    set((state) => {
      const { [productId]: _removed, ...rest } = state.lines;
      return { lines: rest };
    }),

  increment: (productId) =>
    set((state) => {
      const line = state.lines[productId];
      if (!line) return state;
      return {
        lines: {
          ...state.lines,
          [productId]: { ...line, quantity: line.quantity + 1 },
        },
      };
    }),

  decrement: (productId) =>
    set((state) => {
      const line = state.lines[productId];
      if (!line) return state;
      // Если количество станет 0 — просто удаляем позицию
      if (line.quantity <= 1) {
        const { [productId]: _removed, ...rest } = state.lines;
        return { lines: rest };
      }
      return {
        lines: {
          ...state.lines,
          [productId]: { ...line, quantity: line.quantity - 1 },
        },
      };
    }),

  clear: () => set({ lines: {} }),
}));

// ---------- Селекторы ----------
export const selectCartCount = (s: CartState): number =>
  Object.values(s.lines).reduce((sum, line) => sum + line.quantity, 0);

export const selectCartTotal = (s: CartState): number =>
  Object.values(s.lines).reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

export const selectCartLines = (s: CartState): CartLine[] =>
  Object.values(s.lines);

// ---------- Хуки с shallow-сравнением ----------
export const useCartLines = () =>
  useCartStore(useShallow(selectCartLines));