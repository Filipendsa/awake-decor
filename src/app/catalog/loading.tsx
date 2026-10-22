import React from "react";
import { Skeleton } from "@/shared/design-system/Skeleton";
import styles from "./Catalog.module.css";

export default function CatalogLoading() {
  return (
    <div className="mobile-app-shell">
      <div style={{ height: "60px", padding: "12px 20px" }}>
        <Skeleton width="130px" height="32px" borderRadius="9999px" />
      </div>

      <main className="page-bottom-pad">
        <div style={{ padding: "16px 20px 8px", maxWidth: "1200px", margin: "0 auto" }}>
          <Skeleton height="48px" borderRadius="9999px" />
        </div>

        {/* Stories row skeleton */}
        <div style={{ display: "flex", gap: "16px", padding: "16px 20px", overflow: "hidden" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <Skeleton width="64px" height="64px" borderRadius="50%" />
              <Skeleton width="48px" height="12px" borderRadius="6px" />
            </div>
          ))}
        </div>

        {/* Carousel skeleton */}
        <div style={{ padding: "12px 20px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
            <Skeleton width="180px" height="24px" />
            <Skeleton width="60px" height="16px" />
          </div>
          <div style={{ display: "flex", gap: "16px", overflow: "hidden" }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width="280px" height="320px" borderRadius="24px" style={{ flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div style={{ padding: "8px 20px 32px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className={styles.productGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Skeleton height="200px" borderRadius="20px" />
                <Skeleton width="70%" height="18px" />
                <Skeleton width="40%" height="14px" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
