
import React from "react";
import Link from "next/link";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { InMemoryProductRepository } from "@/catalog/infrastructure/InMemoryProductRepository";
import { ListProductsUseCase } from "@/catalog/application/ProductUseCases";
import { ProductCard } from "@/catalog/ui/ProductCard";
import styles from "./Catalog.module.css";

export const metadata = {
  title: "Coleção de Decorações | Awake Home Decor",
  description: "Letterings em alto padrão, esculturas abstratas e composições de parede exclusivas.",
};

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || "todos";

  const repo = new InMemoryProductRepository();
  const listUseCase = new ListProductsUseCase(repo);
  const products = await listUseCase.execute(currentCategory);

  const categories = [
    { id: "todos", label: "Todos (11)" },
    { id: "fe", label: "Fé & Devoção" },
    { id: "abstrato", label: "Abstratos" },
    { id: "natureza", label: "Natureza & Aves" },
    { id: "familia", label: "Família & Lar" },
    { id: "infantil", label: "Infantil" },
    { id: "frases", label: "Frases" },
  ];

  return (
    <div className="mobile-app-shell">
      <Header theme="white" />

      <main className="page-bottom-pad">
        <div className={styles.headerArea}>
          <span className={styles.kicker}>Catálogo Oficial</span>
          <h1 className={styles.title}>Decorações de Parede</h1>
          <p className={styles.subtitle}>
            Peças cortadas a laser milimétrico em MDF naval e acrílico com garantia de entrega expressa.
          </p>

          {/* Category Filter Pills */}
          <div className={styles.filterScroll}>
            {categories.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <Link
                  key={cat.id}
                  href={cat.id === "todos" ? "/catalog" : `/catalog?category=${cat.id}`}
                  className={`${styles.filterPill} ${isActive ? styles.activePill : ""}`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>

        <section className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <span className={styles.counter}>{products.length} peças encontradas</span>
          </div>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
