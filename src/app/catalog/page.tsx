import React from "react";
import Link from "next/link";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { Footer } from "@/shared/design-system/Footer";
import { InMemoryProductRepository } from "@/catalog/infrastructure/InMemoryProductRepository";
import { ListProductsUseCase } from "@/catalog/application/ProductUseCases";
import { ProductCard } from "@/catalog/ui/ProductCard";
import { StoriesRow } from "@/catalog/ui/StoriesRow";
import { FeaturedCarousel } from "@/catalog/ui/FeaturedCarousel";
import { PromoBanner } from "@/catalog/ui/PromoBanner";
import styles from "./Catalog.module.css";
import { Search } from "lucide-react";

export const metadata = {
  title: "Coleção de Decorações | Awake Home Decor",
  description: "Letterings em alto padrão, esculturas abstratas e composições de parede exclusivas.",
};

interface CatalogPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || "todos";
  const searchQuery = (resolvedParams.q || "").toLowerCase().trim();

  const repo = new InMemoryProductRepository();
  const listUseCase = new ListProductsUseCase(repo);
  let products = await listUseCase.execute(currentCategory);

  if (searchQuery) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.subtitle.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
    );
  }

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
        {/* Top Search Input Area (Pill search inspired by reference print 2) */}
        <section className={styles.topSearchSection}>
          <form method="GET" action="/catalog" className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              name="q"
              defaultValue={resolvedParams.q || ""}
              placeholder="Buscar por nome, versículo ou estilo..."
              className={styles.searchInput}
            />
            {currentCategory !== "todos" && (
              <input type="hidden" name="category" value={currentCategory} />
            )}
          </form>
        </section>

        {/* Stories / Highlights Bubbles (Instagram Style - 5 bubbles) */}
        <StoriesRow />

        {/* Top 5 Destaques (Tonight near you style carousel) */}
        <FeaturedCarousel />

        {/* Promoções Vigentes (Voucher 10% OFF Primeira Compra) */}
        <PromoBanner />

        {/* Category Filter Pills (Minimalist active dark / outline) */}
        <section className={styles.categoryFilterSection}>
          <div className={styles.categoryHeader}>
            <span className={styles.kicker}>Catálogo Completo</span>
            <h2 className={styles.sectionTitle}>Filtrar por Categoria</h2>
          </div>

          <div className={styles.filterScroll}>
            {categories.map((cat) => {
              const isActive = currentCategory === cat.id;
              const href =
                cat.id === "todos"
                  ? searchQuery ? `/catalog?q=${encodeURIComponent(searchQuery)}` : "/catalog"
                  : `/catalog?category=${cat.id}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`${styles.filterPill} ${isActive ? styles.activePill : ""}`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Product Grid (Responsive 2/3/4 cols with clean borders) */}
        <section className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <span className={styles.counter}>{products.length} {products.length === 1 ? "peça encontrada" : "peças encontradas"}</span>
          </div>

          {products.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nenhuma peça encontrada para esta busca.</p>
              <Link href="/catalog" className={styles.resetFilterBtn}>
                Limpar filtros
              </Link>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
