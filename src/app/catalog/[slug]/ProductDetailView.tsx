"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDetailView.module.css";
import { Sparkles, ShieldCheck, Clock, Check, ShoppingBag, ArrowLeft, Ruler } from "lucide-react";
import { useCartStore } from "@/cart/ui/cartStore";
import { Money } from "@/shared/kernel/Money";
import { FinishType } from "@/catalog/domain/Product";

interface ProductDetailViewProps {
  product: {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    description: string;
    basePriceReais: number;
    dimensions: { widthCm: number; heightCm: number; depthMm?: number };
    deliveryDaysMin: number;
    deliveryDaysMax: number;
    mockupImage: string;
    propSvg: string;
    availableFinishes: Array<{
      id: FinishType;
      name: string;
      colorHex: string;
      priceModifierPercent: number;
    }>;
  };
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const [selectedFinish, setSelectedFinish] = useState<FinishType>(
    product.availableFinishes[0]?.id || "madeira_natural"
  );
  const [isAddedToast, setIsAddedToast] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const activeFinishObj = product.availableFinishes.find((f) => f.id === selectedFinish);
  const currentModifier = activeFinishObj?.priceModifierPercent || 0;
  const currentPriceReais = product.basePriceReais * (1 + currentModifier / 100);

  const handleAddToCart = () => {
    addItem({
      id: `cart-${product.id}-${selectedFinish}`,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      mockupImage: product.mockupImage,
      finishId: selectedFinish,
      finishName: activeFinishObj?.name || "Padrão",
      unitPrice: Money.fromReais(currentPriceReais),
      quantity: 1,
    });

    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <Link href="/catalog" className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>Voltar ao catálogo</span>
        </Link>
      </div>

      <div className={styles.imageStage}>
        <Image
          src={product.mockupImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 480px) 100vw, 480px"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />

        <Link
          href={`/visualizer?product=${product.slug}`}
          className={styles.visualizerPill}
          aria-label="Ver na minha parede com simulador"
        >
          <Sparkles size={16} />
          <span>Ver no meu espaço</span>
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.promiseBadge}>
          <Clock size={14} />
          <span>
            Diferencial Awake: Entrega em {product.deliveryDaysMin} a {product.deliveryDaysMax} dias úteis
          </span>
        </div>

        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.subtitle}>{product.subtitle}</p>

        <div className={styles.priceRow}>
          <div className={styles.priceCol}>
            <span className={styles.priceLabel}>Valor da composição</span>
            <span className={styles.price}>
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                currentPriceReais
              )}
            </span>
          </div>
          <span className={styles.pixDiscount}>5% de desconto via Pix</span>
        </div>

        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.blockTitle}>Selecione o Acabamento</span>
            <span className={styles.selectedFinishName}>{activeFinishObj?.name}</span>
          </div>
          <div className={styles.finishOptions}>
            {product.availableFinishes.map((f) => {
              const isSelected = f.id === selectedFinish;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinish(f.id)}
                  className={`${styles.finishBtn} ${isSelected ? styles.selectedFinish : ""}`}
                >
                  <span
                    className={styles.finishColorCircle}
                    style={{ backgroundColor: f.colorHex }}
                  />
                  <div className={styles.finishInfo}>
                    <span className={styles.finishTitle}>{f.name}</span>
                    {f.priceModifierPercent > 0 && (
                      <span className={styles.finishMod}>+{f.priceModifierPercent}%</span>
                    )}
                  </div>
                  {isSelected && <Check size={16} className={styles.finishCheck} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <span className={styles.blockTitle}>Dimensões & Fixação</span>
          <div className={styles.specBox}>
            <div className={styles.specItem}>
              <Ruler size={16} className={styles.specIcon} />
              <div>
                <span className={styles.specLabel}>Dimensões da Peça</span>
                <span className={styles.specValue}>
                  {product.dimensions.widthCm} cm de largura × {product.dimensions.heightCm} cm de altura
                  {product.dimensions.depthMm ? ` (${product.dimensions.depthMm} mm de espessura)` : ""}
                </span>
              </div>
            </div>
            <div className={styles.specItem}>
              <ShieldCheck size={16} className={styles.specIcon} />
              <div>
                <span className={styles.specLabel}>Garantia & Instalação Fácil</span>
                <span className={styles.specValue}>
                  Acompanha fita 3M extra forte e gabarito milimétrico para instalação limpa sem furos.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <span className={styles.blockTitle}>Sobre a Peça</span>
          <p className={styles.descriptionText}>{product.description}</p>
        </div>

        <div className={styles.actionBlock}>
          <button onClick={handleAddToCart} className={styles.addToCartBtn}>
            <ShoppingBag size={18} />
            <span>Adicionar à Sacola</span>
          </button>

          <Link href={`/visualizer?product=${product.slug}`} className={styles.simulateSecondaryBtn}>
            <Sparkles size={16} />
            <span>Testar na câmera antes de comprar</span>
          </Link>
        </div>
      </div>

      {isAddedToast && (
        <div className={styles.addedToast}>
          <Check size={16} />
          <span>Peça adicionada à sua sacola com sucesso!</span>
        </div>
      )}
    </div>
  );
};