import React from "react";
import Image from "next/image";
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
          <div className={styles.poweredByBlock}>
            <span className={styles.poweredText}>
              Uma solução{" "}
              <a
                href="https://yesode.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.yesodeLink}
              >
                Yesode
              </a>
              {" "}em parceria com
            </span>
            <div className={styles.syncPartner}>
              <div className={styles.syncLogoWrapper}>
                <Image
                  src="/brand/sync-logo.png"
                  alt="Sync Marketing"
                  width={20}
                  height={20}
                  className={styles.syncLogo}
                />
              </div>
              <span className={styles.syncText}>Sync</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
