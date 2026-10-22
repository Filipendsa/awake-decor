"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShoppingBag, Compass, Home } from "lucide-react";
import styles from "./BottomNav.module.css";
import { useCartStore } from "@/cart/ui/cartStore";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const cartItemsCount = useCartStore((s) => s.totalItems);

  const navItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Catálogo", href: "/catalog", icon: Compass },
    { label: "Espaço 3D", href: "/visualizer", icon: Sparkles },
    { label: "Sacola", href: "/cart", icon: ShoppingBag, badge: cartItemsCount },
  ];

  return (
    <nav className={styles.navContainer} aria-label="Navegação Principal">
      <div className={styles.dockBar}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.dockItem} ${isActive ? styles.activeItem : ""}`}
            >
              <div className={styles.iconContainer}>
                <Icon size={18} strokeWidth={isActive ? 2.4 : 1.7} />
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </div>
              <span className={styles.label}>{item.label}</span>
              {isActive && <span className={styles.activeDot} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
