import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Sparkles, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandRow}>
          <div className={styles.brandInfo}>
            <span className={styles.logoText}>awake.</span>
            <span className={styles.tagline}>Móveis Planejados & Decorações de Luxo</span>
          </div>

          <div className={styles.quickLinks}>
            <Link href="/" className={styles.link}>Início</Link>
            <Link href="/catalog" className={styles.link}>Catálogo</Link>
            <Link href="/visualizer" className={styles.link}>Simulador 3D</Link>
            <Link href="/planned-furniture" className={styles.link}>Planejados</Link>
          </div>
        </div>

        <div className={styles.badgesRow}>
          <div className={styles.badgeItem}>
            <ShieldCheck size={14} className={styles.badgeIcon} />
            <span>Fabricação própria de precisão</span>
          </div>
          <div className={styles.badgeItem}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>Acabamento premium milimétrico</span>
          </div>
        </div>

        <div className={styles.copyrightRow}>
          <p className={styles.copyText}>
            © {new Date().getFullYear()} Awake Home Decor. Todos os direitos reservados.
          </p>
          <p className={styles.poweredBy}>
            Powered by{" "}
            <a
              href="https://yesode.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.yesodeLink}
            >
              Yesode
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
