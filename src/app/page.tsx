import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { InMemoryProductRepository } from "@/catalog/infrastructure/InMemoryProductRepository";
import { ProductCard } from "@/catalog/ui/ProductCard";
import styles from "./Home.module.css";
import { Sparkles, Clock, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Awake Home Decor | Móveis Planejados e Decorações de Luxo",
  description: "Peças decorativas em corte de precisão e móveis planejados de alto padrão. Experimente o simulador em tempo real no seu espaço.",
};

export default async function HomePage() {
  const repo = new InMemoryProductRepository();
  const featuredProducts = await repo.findFeatured();

  return (
    <div className="mobile-app-shell">
      <Header theme="white" />

      <main className="page-bottom-pad">
        {/* Hero Section com Marketing Real */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/marketing/11.jpeg"
              alt="Awake Home Decor Sofisticação"
              fill
              priority
              className={styles.heroImage}
            />
            <div className={styles.heroGradient} />
          </div>

          <div className={styles.heroOverlayContent}>
            <span className={styles.heroKicker}>Design & Precisão</span>
            <h1 className={styles.heroTitle}>
              Uma composição que traduz o verdadeiro significado de <span className={styles.highlightPink}>sofisticação</span>.
            </h1>
            <p className={styles.heroSubtitle}>
              Peças de parede contemporâneas e móveis sob medida com acabamento impecável e entrega ágil garantida.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/visualizer" className={styles.primaryCta}>
                <Sparkles size={18} />
                <span>Ver no meu espaço</span>
              </Link>
              <Link href="/catalog" className={styles.secondaryCta}>
                <span>Explorar coleção</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition Banners: Prazo e Qualidade (Diferenciais) */}
        <section className={styles.valuePropsSection}>
          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <Clock size={20} className={styles.propIcon} />
            </div>
            <div>
              <h3 className={styles.propTitle}>Prazo Rigoroso</h3>
              <p className={styles.propDesc}>Fabricação e envio express em 3 a 5 dias úteis com rastreamento.</p>
            </div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <Award size={20} className={styles.propIcon} />
            </div>
            <div>
              <h3 className={styles.propTitle}>Acabamento de Luxo</h3>
              <p className={styles.propDesc}>Corte a laser milimétrico, MDF naval prime e acrílico de alta densidade.</p>
            </div>
          </div>
        </section>

        {/* Feature Teaser do Simulador */}
        <section className={styles.simulatorTeaser}>
          <div className={styles.teaserCard}>
            <div className={styles.teaserBadge}>
              <Sparkles size={14} />
              <span>Diferencial Exclusivo</span>
            </div>
            <h2 className={styles.teaserTitle}>Veja exatamente como fica na sua parede antes de comprar</h2>
            <p className={styles.teaserDesc}>
              Tire uma foto ou use a câmera ao vivo do celular para posicionar a peça em tamanho real e perspectiva 3D.
            </p>
            <Link href="/visualizer" className={styles.teaserBtn}>
              <span>Abrir Simulador Interativo</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Coleções em Destaque */}
        <section className={styles.collectionSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>Curadoria Especial</span>
              <h2 className={styles.sectionTitle}>Peças em Destaque</h2>
            </div>
            <Link href="/catalog" className={styles.viewAllLink}>
              Ver todas ({featuredProducts.length})
            </Link>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Móveis Planejados Promo Banner */}
        <section className={styles.furnitureBanner}>
          <div className={styles.furnitureImageWrapper}>
            <Image
              src="/marketing/2.jpeg"
              alt="Móveis Planejados Awake"
              fill
              className={styles.furnitureBg}
            />
            <div className={styles.furnitureGradient} />
          </div>
          <div className={styles.furnitureContent}>
            <span className={styles.furnitureKicker}>Sob Medida</span>
            <h2 className={styles.furnitureTitle}>Móveis Planejados com entrega no prazo</h2>
            <p className={styles.furnitureText}>
              Cozinhas, livings e dormitórios desenhados para otimizar seu espaço com padrão de marcenaria de luxo.
            </p>
            <Link href="/planned-furniture" className={styles.furnitureBtn}>
              <span>Solicitar Orçamento 3D</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
