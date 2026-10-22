"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartItem, CartItemProps } from "@/cart/domain/Cart";
import { Money } from "@/shared/kernel/Money";

interface CartState {
  rawItems: CartItemProps[];
  totalItems: number;
  subtotalReais: number;
  addItem: (item: CartItemProps) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getDomainCart: () => Cart;
}

function extractReais(price: Money | { amountInCents?: number; reais?: number }): number {
  if (price instanceof Money) return price.reais;
  if (typeof price === "object" && price !== null) {
    if ("amountInCents" in price && typeof price.amountInCents === "number") {
      return price.amountInCents / 100;
    }
    if ("reais" in price && typeof price.reais === "number") {
      return price.reais;
    }
  }
  return 0;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      rawItems: [],
      totalItems: 0,
      subtotalReais: 0,

      addItem: (itemProps: CartItemProps) => {
        const domainItems = get().rawItems.map(p =>
          CartItem.create({ ...p, unitPrice: Money.fromReais(extractReais(p.unitPrice)) })
        );
        const newItem = CartItem.create({
          ...itemProps,
          unitPrice: Money.fromReais(extractReais(itemProps.unitPrice))
        });

        const currentCart = Cart.fromItems(domainItems);
        const updatedCart = currentCart.addItem(newItem);

        const newRaw = updatedCart.items.map(i => ({
          id: i.id,
          productId: i.productId,
          productName: i.productName,
          productSlug: i.productSlug,
          mockupImage: i.mockupImage,
          finishId: i.finishId,
          finishName: i.finishName,
          unitPrice: Money.fromReais(i.unitPrice.reais),
          quantity: i.quantity,
        }));

        set({
          rawItems: newRaw,
          totalItems: updatedCart.totalItems,
          subtotalReais: updatedCart.subtotal.reais,
        });
      },

      removeItem: (id: string) => {
        const domainItems = get().rawItems.map(p =>
          CartItem.create({ ...p, unitPrice: Money.fromReais(extractReais(p.unitPrice)) })
        );
        const updatedCart = Cart.fromItems(domainItems).removeItem(id);

        set({
          rawItems: updatedCart.items.map(i => ({
            id: i.id,
            productId: i.productId,
            productName: i.productName,
            productSlug: i.productSlug,
            mockupImage: i.mockupImage,
            finishId: i.finishId,
            finishName: i.finishName,
            unitPrice: Money.fromReais(i.unitPrice.reais),
            quantity: i.quantity,
          })),
          totalItems: updatedCart.totalItems,
          subtotalReais: updatedCart.subtotal.reais,
        });
      },

      updateQuantity: (id: string, qty: number) => {
        const domainItems = get().rawItems.map(p =>
          CartItem.create({ ...p, unitPrice: Money.fromReais(extractReais(p.unitPrice)) })
        );
        const updatedCart = Cart.fromItems(domainItems).updateQuantity(id, qty);

        set({
          rawItems: updatedCart.items.map(i => ({
            id: i.id,
            productId: i.productId,
            productName: i.productName,
            productSlug: i.productSlug,
            mockupImage: i.mockupImage,
            finishId: i.finishId,
            finishName: i.finishName,
            unitPrice: Money.fromReais(i.unitPrice.reais),
            quantity: i.quantity,
          })),
          totalItems: updatedCart.totalItems,
          subtotalReais: updatedCart.subtotal.reais,
        });
      },

      clearCart: () => set({ rawItems: [], totalItems: 0, subtotalReais: 0 }),

      getDomainCart: () => {
        const domainItems = get().rawItems.map(p =>
          CartItem.create({ ...p, unitPrice: Money.fromReais(extractReais(p.unitPrice)) })
        );
        return Cart.fromItems(domainItems);
      }
    }),
    {
      name: "awake-cart-storage",
    }
  )
);
