"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { Sparkles, Search, ShoppingBag, Home, LayoutGrid, Ruler } from "lucide-react";
import { useCartStore } from "@/cart/ui/cartStore";

interface HeaderProps {
  theme?: "blue" | "white";
  showSimulatorBadge?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ theme = "white", showSimulatorBadge = true }) => {
  const pathname = usePathname();
  const cartItemsCount = useCartStore((s) => s.totalItems);
  const isBlue = theme === "blue";

  const desktopNavItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Catálogo", href: "/catalog", icon: LayoutGrid },
    { label: "Simulador 3D", href: "/visualizer", icon: Sparkles },
    { label: "Móveis Planejados", href: "/planned-furniture", icon: Ruler },
  ];

  return (
    <header className={`${styles.header} ${isBlue ? styles.blue : styles.white}`}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
          <Link href="/" className={styles.logoLink} aria-label="Awake Home Decor Início">
            <Image
              src={isBlue ? "/brand/logo-full-white.svg" : "/brand/logo-full.svg"}
              alt="awake. home decor"
              width={140}
              height={36}
              priority
              className={styles.logoImg}
            />
          </Link>
        </div>

        {/* Desktop Top Menu (Aparece no topo no desktop >= 1024px) */}
        <nav className={styles.desktopNav} aria-label="Navegação Principal Desktop">
          {desktopNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.desktopNavLink} ${isActive ? styles.activeNavLink : ""}`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.7} />
                <span>{item.label}</span>
                {isActive && <span className={styles.activeLine} />}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Busca, Sacola no Desktop e Badge de Simulador */}
        <div className={styles.rightActions}>
          <Link href="/catalog" className={styles.searchShortcut} aria-label="Buscar produtos">
            <Search size={16} />
            <span className={styles.searchPrompt}>Buscar peças...</span>
          </Link>

          {/* Desktop Cart Button */}
          <Link href="/cart" className={styles.desktopCartBtn} aria-label="Sacola de Compras">
            <ShoppingBag size={18} strokeWidth={1.8} />
            <span className={styles.cartText}>Sacola</span>
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </Link>

          {showSimulatorBadge && (
            <Link href="/visualizer" className={styles.simBadge} aria-label="Testar decor no seu espaço">
              <Sparkles size={13} className={styles.sparkleIcon} />
              <span>Simulador 3D</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
