import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { Sparkles, Search } from "lucide-react";

interface HeaderProps {
  theme?: "blue" | "white";
  showSimulatorBadge?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ theme = "white", showSimulatorBadge = true }) => {
  const isBlue = theme === "blue";

  return (
    <header className={`${styles.header} ${isBlue ? styles.blue : styles.white}`}>
      <div className={styles.inner}>
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

        <div className={styles.rightActions}>
          <Link href="/catalog" className={styles.searchShortcut} aria-label="Buscar produtos">
            <Search size={16} />
            <span className={styles.searchPrompt}>Buscar peças...</span>
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
