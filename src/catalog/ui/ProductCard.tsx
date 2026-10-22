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
      <Link href={`/catalog/${product.slug.toString()}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.mockupImage}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 100vw, 400px"
            className={styles.image}
            priority={product.isFeatured}
          />
          <div className={styles.gradientOverlay} />

          {product.isFeatured && (
            <span className={styles.featuredBadge}>Destaque</span>
          )}

          <Link
            href={`/visualizer?product=${product.slug.toString()}`}
            className={styles.quickSimBtn}
            aria-label={`Ver ${product.name} no meu espaço`}
          >
            <Sparkles size={14} />
            <span>Ver no espaço</span>
          </Link>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.deliveryBadge}>
          <Clock size={12} />
          <span>Entrega expressa: {product.deliveryDaysMin} a {product.deliveryDaysMax} dias</span>
        </div>

        <Link href={`/catalog/${product.slug.toString()}`} className={styles.titleLink}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.subtitle}>{product.subtitle}</p>

        <div className={styles.footerRow}>
          <div className={styles.priceCol}>
            <span className={styles.priceLabel}>A partir de</span>
            <span className={styles.priceValue}>{product.basePrice.formatBRL()}</span>
          </div>

          <Link
            href={`/catalog/${product.slug.toString()}`}
            className={styles.detailBtn}
            aria-label={`Ver detalhes de ${product.name}`}
          >
            <span>Ver opções</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};
