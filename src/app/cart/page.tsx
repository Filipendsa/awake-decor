"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { useCartStore } from "@/cart/ui/cartStore";
import styles from "./Cart.module.css";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Clock } from "lucide-react";

export default function CartPage() {
  const { rawItems, totalItems, subtotalReais, updateQuantity, removeItem } = useCartStore();

  const formattedSubtotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(subtotalReais);

  return (
    <div className="mobile-app-shell">
      <Header theme="white" />

      <main className="page-bottom-pad">
        <div className={styles.header}>
          <span className={styles.kicker}>Seus Itens</span>
          <h1 className={styles.title}>Sacola de Compras ({totalItems})</h1>
        </div>

        {rawItems.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconCircle}>
              <ShoppingBag size={32} />
            </div>
            <h2 className={styles.emptyTitle}>Sua sacola está vazia</h2>
            <p className={styles.emptyDesc}>
              Descubra nossas peças exclusivas ou visualize-as na sua parede antes de decidir.
            </p>
            <div className={styles.emptyActions}>
              <Link href="/catalog" className={styles.exploreBtn}>
                Explorar Coleção
              </Link>
              <Link href="/visualizer" className={styles.simBtn}>
                Abrir Simulador 3D
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.cartBody}>
            {/* Delivery Promise Alert */}
            <div className={styles.promiseBanner}>
              <Clock size={16} />
              <span>Diferencial Awake: Fabricação expressa e envio em até 5 dias úteis.</span>
            </div>

            <div className={styles.itemsList}>
              {rawItems.map((item) => {
                const itemUnitPrice = (item.unitPrice as any).amountInCents
                  ? (item.unitPrice as any).amountInCents / 100
                  : item.unitPrice.reais || 0;

                const itemTotal = itemUnitPrice * item.quantity;

                return (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemThumb}>
                      <Image
                        src={item.mockupImage}
                        alt={item.productName}
                        fill
                        sizes="90px"
                        className={styles.thumbImg}
                      />
                    </div>

                    <div className={styles.itemDetails}>
                      <div className={styles.itemTopRow}>
                        <Link href={`/catalog/${item.productSlug}`} className={styles.itemTitle}>
                          {item.productName}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={styles.removeBtn}
                          aria-label="Remover item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <span className={styles.finishTag}>{item.finishName}</span>

                      <div className={styles.itemBottomRow}>
                        <div className={styles.quantityPicker}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={styles.qtyBtn}
                            aria-label="Diminuir"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={styles.qtyValue}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={styles.qtyBtn}
                            aria-label="Aumentar"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span className={styles.itemPrice}>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary & Checkout CTA */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formattedSubtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Envio Express</span>
                <span className={styles.freeShipping}>Grátis</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Estimado</span>
                <span className={styles.totalValue}>{formattedSubtotal}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                <span>Avançar para Finalização</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
