"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./StoriesRow.module.css";

interface StoryItem {
  id: string;
  label: string;
  tag: string;
  href: string;
  image: string;
}

const stories: StoryItem[] = [
  {
    id: "story-1",
    label: "Salmo 23",
    tag: "Fé",
    href: "/catalog/salmo-23",
    image: "/products/salmo-23.png",
  },
  {
    id: "story-2",
    label: "Abstrato",
    tag: "Design",
    href: "/catalog/abstrato-curvo",
    image: "/products/abstrato-curvo.png",
  },
  {
    id: "story-3",
    label: "Príncipe",
    tag: "Infantil",
    href: "/catalog/pequeno-principe",
    image: "/products/pequeno-principe.png",
  },
  {
    id: "story-4",
    label: "Flores",
    tag: "Botânica",
    href: "/catalog/flores",
    image: "/products/flores.png",
  },
  {
    id: "story-5",
    label: "Planejados",
    tag: "Sob Medida",
    href: "/planned-furniture",
    image: "/marketing/2.jpeg",
  },
];

export const StoriesRow: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Coleções em Destaque">
      <div className={styles.scrollContainer}>
        {stories.map((story) => (
          <Link key={story.id} href={story.href} className={styles.storyCard}>
            <div className={styles.bubbleRing}>
              <div className={styles.bubbleInner}>
                <Image
                  src={story.image}
                  alt={story.label}
                  fill
                  sizes="64px"
                  className={styles.image}
                />
              </div>
            </div>
            <span className={styles.label}>{story.label}</span>
            <span className={styles.tag}>{story.tag}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
