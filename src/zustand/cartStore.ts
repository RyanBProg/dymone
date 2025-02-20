import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  image: {
    url: string;
    alt: string | null;
  };
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  expiry: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  incrementCartItem: (id: string) => void;
  decrementCartItem: (id: string) => void;
};

const CART_EXPIRY_TIME = 30 * 60 * 1000; // 30 mins

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      expiry: new Date().getTime() + CART_EXPIRY_TIME,
      addToCart: (item) => {
        const now = new Date().getTime();
        if (now > get().expiry) {
          set({ cart: [], expiry: now + CART_EXPIRY_TIME });
          return;
        }

        const existingItem = get().cart.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
            expiry: now + CART_EXPIRY_TIME,
          });
        } else {
          set({
            cart: [...get().cart, item],
            expiry: now + CART_EXPIRY_TIME,
          });
        }
      },
      removeFromCart: (id) => {
        const now = new Date().getTime();
        if (now > get().expiry) {
          set({ cart: [], expiry: now + CART_EXPIRY_TIME });
          return;
        }

        set({
          cart: get().cart.filter((i) => i.id !== id),
          expiry: now + CART_EXPIRY_TIME,
        });
      },
      clearCart: () =>
        set({ cart: [], expiry: new Date().getTime() + CART_EXPIRY_TIME }),
      incrementCartItem: (id) => {
        const now = new Date().getTime();
        if (now > get().expiry) {
          set({ cart: [], expiry: now + CART_EXPIRY_TIME });
          return;
        }

        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          expiry: now + CART_EXPIRY_TIME,
        });
      },
      decrementCartItem: (id) => {
        const now = new Date().getTime();
        if (now > get().expiry) {
          set({ cart: [], expiry: now + CART_EXPIRY_TIME });
          return;
        }

        set({
          cart: get()
            .cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
          expiry: now + CART_EXPIRY_TIME,
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
