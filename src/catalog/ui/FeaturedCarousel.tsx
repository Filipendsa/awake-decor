"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedCarousel.module.css";
import { ArrowRight, Clock } from "lucide-react";

interface FeaturedItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: string;
  badge: string;
  delivery: string;
  image: string;
}

const featuredList: FeaturedItem[] = [
  {
    id: "f-1",
    name: "Lettering Salmo 23",
    slug: "salmo-23",
    subtitle: "O Senhor é o Meu Pastor; nada me faltará",
    price: "R$ 289",
    badge: "Mais Acessado",
    delivery: "Envio em 3–5 dias",
    image: "/products/salmo-23.png",
  },
  {
    id: "f-2",
    name: "Abstrato Curvo Infinito",
    slug: "abstrato-curvo",
    subtitle: "Escultura fluida de curvas arquitetônicas",
    price: "R$ 380",
    badge: "Design Exclusivo",
    delivery: "Envio em 4–6 dias",
    image: "/products/abstrato-curvo.png",
  },
  {
    id: "f-3",
    name: "Pequeno Príncipe & Raposa",
    slug: "pequeno-principe",
    subtitle: "Tu te tornas eternamente responsável por aquilo que cativas",
    price: "R$ 249",
    badge: "Mais Vendido",
    delivery: "Envio em 3–5 dias",
    image: "/products/pequeno-principe.png",
  },
  {
    id: "f-4",
    name: "Flores Orgânicas Botânica",
    slug: "flores",
    subtitle: "Delicadeza geométrica e sensação de leveza",
    price: "R$ 269",
    badge: "Tendência 2026",
    delivery: "Envio em 3–5 dias",
    image: "/products/flores.png",
  },
  {
    id: "f-5",
    name: "Lettering Filipenses 4:13",
    slug: "filipenses-413",
    subtitle: "Tudo posso Naquele que me fortalece",
    price: "R$ 279",
    badge: "Inspiração",
    delivery: "Envio em 3–5 dias",
    image: "/products/filipenses-413.png",
  },
];

export const FeaturedCarousel: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Destaques Awake">
      <div className={styles.header}>
        <div>
          <span className={styles.kicker}>Em Alta</span>
          <h2 className={styles.title}>Peças Mais Desejadas</h2>
        </div>
        <Link href="/catalog?category=todos" className={styles.seeAllLink}>
          <span>Ver todas</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className={styles.carouselTrack}>
        {featuredList.map((item) => (
          <Link
            key={item.id}
            href={`/catalog/${item.slug}`}
            className={styles.card}
          >
            <div className={styles.imageBox}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 290px, 340px"
                className={styles.image}
                priority
              />
              <div className={styles.imageGradient} />

              <span className={styles.badge}>{item.badge}</span>
              <span className={styles.pricePill}>{item.price}</span>

              <div className={styles.cardOverlayContent}>
                <span className={styles.deliveryTag}>
                  <Clock size={12} />
                  {item.delivery}
                </span>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardSubtitle}>{item.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
