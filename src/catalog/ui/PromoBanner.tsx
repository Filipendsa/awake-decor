"use client";

import React, { useState } from "react";
import styles from "./PromoBanner.module.css";
import { Tag, Copy, Check, Sparkles } from "lucide-react";
import { useToast } from "@/shared/design-system/Toast";

export const PromoBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const couponCode = "PRIMEIRACOMPRA10";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    showToast(`Cupom ${couponCode} copiado com sucesso!`, "sparkle");
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.badgeRow}>
            <span className={styles.promoTag}>
              <Sparkles size={12} className={styles.iconSparkle} />
              <span>Promoção Exclusiva</span>
            </span>
            <span className={styles.discount}>10% OFF</span>
          </div>

          <h3 className={styles.title}>Boas-vindas à Awake Home Decor</h3>
          <p className={styles.subtitle}>
            Aproveite 10% de desconto em qualquer peça na sua primeira compra.
          </p>
        </div>

        <div className={styles.actionCol}>
          <button
            onClick={handleCopy}
            className={styles.couponBtn}
            title="Clique para copiar cupom"
            aria-label="Copiar cupom de desconto"
          >
            <Tag size={14} className={styles.tagIcon} />
            <span className={styles.codeText}>{couponCode}</span>
            {copied ? (
              <Check size={14} className={styles.checkIcon} />
            ) : (
              <Copy size={14} className={styles.copyIcon} />
            )}
          </button>
          <span className={styles.hintText}>{copied ? "Copiado!" : "Toque para copiar"}</span>
        </div>
      </div>
    </div>
  );
};
