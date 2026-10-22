import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  theme?: "blue" | "white";
  showSimulatorBadge?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ theme = "white", showSimulatorBadge = true }) => {
  const isBlue = theme === "blue";

  return (
    <header className={`${styles.header} ${isBlue ? styles.blue : styles.white}`}>
      <Link href="/" className={styles.logoLink} aria-label="Awake Home Decor Início">
        <Image
          src={isBlue ? "/brand/logo-full-white.svg" : "/brand/logo-full.svg"}
          alt="awake. home decor"
          width={150}
          height={38}
          priority
        />
      </Link>

      {showSimulatorBadge && (
        <Link href="/visualizer" className={styles.simBadge} aria-label="Testar decor no seu espaço">
          <Sparkles size={14} className={styles.sparkleIcon} />
          <span>Ver no Espaço</span>
        </Link>
      )}
    </header>
  );
};
