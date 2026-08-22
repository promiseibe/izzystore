import { ProductParams } from "@/shared.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStoreParams {
  items: ProductParams[];
  addItem: (item: ProductParams) => void;
   increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    clearCartStore: () => void;
}


export const cartStore = create<CartStoreParams>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);
                if (existingItem) {
                    return { items: state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }),
            increaseQty: (id) => set((state) => {
                return { items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) };
            }),
            decreaseQty: (id) => set((state) => {
                return { items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item)
            .filter((item) => item.quantity > 0) };
            }),
            clearCartStore: () => set({ items: [] })
        }),
        {name: "cart-storage"}
    )

)