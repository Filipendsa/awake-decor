import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/catalog/domain/Product";
import styles from "./ProductCard.module.css";
import { Sparkles, ArrowRight, Clock } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Link href={`/catalog/${product.slug.toString()}`} className={styles.imageLink} aria-label={product.name}>
          <Image
            src={product.mockupImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
            priority={product.isFeatured}
          />
          <div className={styles.imageShade} />
        </Link>

        {/* Minimal Price Badge no canto */}
        <div className={styles.priceTag}>
          <span>{product.basePrice.formatBRL()}</span>
        </div>

        {/* Quick Simulator Shortcut */}
        <Link
          href={`/visualizer?product=${product.slug.toString()}`}
          className={styles.simPill}
          title="Ver no meu espaço"
          aria-label={`Ver ${product.name} no simulador`}
        >
          <Sparkles size={13} className={styles.simIcon} />
          <span>Simular 3D</span>
        </Link>
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <span className={styles.categoryName}>{formatCategory(product.category)}</span>
          <span className={styles.deliveryTime}>
            <Clock size={11} />
            {product.deliveryDaysMin}–{product.deliveryDaysMax} dias
          </span>
        </div>

        <Link href={`/catalog/${product.slug.toString()}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <p className={styles.subtitle}>{product.subtitle}</p>

        <div className={styles.actionRow}>
          <Link
            href={`/catalog/${product.slug.toString()}`}
            className={styles.outlineBtn}
          >
            <span>Ver opções</span>
            <ArrowRight size={14} className={styles.arrowIcon} />
          </Link>
        </div>
      </div>
    </article>
  );
};

function formatCategory(cat: string): string {
  const map: Record<string, string> = {
    fe: "Fé & Devoção",
    abstrato: "Escultura Abstrata",
    natureza: "Natureza & Aves",
    familia: "Família & Lar",
    infantil: "Linha Infantil",
    frases: "Tipografia & Frases",
  };
  return map[cat] || "Decoração";
}
