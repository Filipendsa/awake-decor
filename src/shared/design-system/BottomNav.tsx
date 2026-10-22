"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Sparkles, ShoppingBag } from "lucide-react";
import styles from "./BottomNav.module.css";
import { useCartStore } from "@/cart/ui/cartStore";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const cartItemsCount = useCartStore((s) => s.totalItems);

  const navItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Catálogo", href: "/catalog", icon: LayoutGrid },
    { label: "Simulador", href: "/visualizer", icon: Sparkles },
    { label: "Sacola", href: "/cart", icon: ShoppingBag, badge: cartItemsCount },
  ];

  return (
    <nav className={styles.islandWrapper} aria-label="Navegação em Ilha">
      <div className={styles.islandPill}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navButton} ${isActive ? styles.active : ""}`}
              aria-label={item.label}
              title={item.label}
            >
              {isActive && <span className={styles.activeBubble} />}
              <div className={styles.iconWrapper}>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.0 : 1.5}
                  className={styles.icon}
                />
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </div>
              <span className={styles.labelText}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
