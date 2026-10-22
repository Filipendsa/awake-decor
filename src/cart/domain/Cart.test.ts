import { describe, it, expect } from "vitest";
import { Cart, CartItem } from "./Cart";
import { Money } from "@/shared/kernel/Money";
import { Order } from "@/checkout/domain/Order";

describe("Cart and Checkout Domains", () => {
  it("adds items, calculates total and handles quantity updates", () => {
    let cart = Cart.empty();
    const item1 = CartItem.create({
      id: "cart-1",
      productId: "prod-1",
      productName: "Salmo 23",
      productSlug: "salmo-23",
      mockupImage: "/products/salmo-23.png",
      finishId: "madeira_natural",
      finishName: "Madeira Natural",
      unitPrice: Money.fromReais(289),
      quantity: 1,
    });

    cart = cart.addItem(item1);
    expect(cart.totalItems).toBe(1);
    expect(cart.subtotal.reais).toBe(289);

    // Adding same product and finish increments quantity
    cart = cart.addItem(item1);
    expect(cart.totalItems).toBe(2);
    expect(cart.subtotal.reais).toBe(578);
  });

  it("creates order and generates WhatsApp formatted string", () => {
    const item = CartItem.create({
      id: "cart-1",
      productId: "prod-1",
      productName: "Salmo 23",
      productSlug: "salmo-23",
      mockupImage: "/products/salmo-23.png",
      finishId: "madeira_natural",
      finishName: "Madeira Natural",
      unitPrice: Money.fromReais(289),
      quantity: 1,
    });
    const cart = Cart.fromItems([item]);

    const order = Order.create({
      orderId: "AWK-1001",
      customer: {
        fullName: "Filipe Nogueira",
        phone: "(11) 99999-8888",
        cep: "01310-100",
        street: "Av. Paulista",
        number: "1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
      },
      cart,
      deliveryDaysMin: 3,
      deliveryDaysMax: 5,
      paymentMethod: "pix",
      shippingFee: Money.fromReais(25),
      createdAt: new Date(),
    });

    expect(order.total.reais).toBe(314);
    const msg = order.generateWhatsAppMessage();
    expect(decodeURIComponent(msg)).toContain("AWK-1001");
    expect(decodeURIComponent(msg)).toContain("Salmo 23");
    expect(decodeURIComponent(msg)).toContain("3 a 5 dias úteis");
  });
});
