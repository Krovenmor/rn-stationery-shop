import { create } from 'zustand';
import { CartLineDrug, Drug } from '../types/drugs';
import { useShallow } from 'zustand/react/shallow';

interface CartState {
  lines: Record<string, CartLineDrug>;

  add: (drug: Drug, quantity?: number) => void;
  remove: (drugId: string) => void;
  increment: (drugId: string) => void;
  decrement: (drugId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: {},

  add: (drug, quantity = 1) =>
    set((state) => {
      const existing = state.lines[drug.id];
      return {
        lines: {
          ...state.lines,
          [drug.id]: existing
            ? { ...existing, quantity: existing.quantity + quantity }
            : { drug, quantity },
        },
      };
    }),

  remove: (drugId) =>
    set((state) => {
      const { [drugId]: _removed, ...rest } = state.lines;
      return { lines: rest };
    }),

  increment: (drugId) =>
    set((state) => {
      const line = state.lines[drugId];
      if (!line) return state;
      return {
        lines: {
          ...state.lines,
          [drugId]: { ...line, quantity: line.quantity + 1 },
        },
      };
    }),

  decrement: (drugId) =>
    set((state) => {
      const line = state.lines[drugId];
      if (!line) return state;
      // Если количество станет 0 — просто удаляем позицию
      if (line.quantity <= 1) {
        const { [drugId]: _removed, ...rest } = state.lines;
        return { lines: rest };
      }
      return {
        lines: {
          ...state.lines,
          [drugId]: { ...line, quantity: line.quantity - 1 },
        },
      };
    }),

  clear: () => set({ lines: {} }),
}));

// ---------- Селекторы ----------
export const selectCartCount = (s: CartState): number =>
  Object.values(s.lines).reduce((sum, line) => sum + line.quantity, 0);

export const selectCartUniqueCount = (s: CartState): number =>
  Object.keys(s.lines).length;

export const selectCartLineDrugs = (s: CartState): CartLineDrug[] =>
  Object.values(s.lines);

// ---------- Хуки с shallow-сравнением ----------
export const useCartLineDrugs = () =>
  useCartStore(useShallow(selectCartLineDrugs));