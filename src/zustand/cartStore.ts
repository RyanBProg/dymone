import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existingItem = get().cart.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((i) => i.id !== id) }),
    }),
    { name: "cart-storage" } // Saves to localStorage
  )
);
