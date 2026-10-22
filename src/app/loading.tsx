import React from "react";
import { Skeleton } from "@/shared/design-system/Skeleton";

export default function AppLoading() {
  return (
    <div className="mobile-app-shell">
      <div style={{ height: "64px", padding: "14px 20px" }}>
        <Skeleton width="120px" height="34px" borderRadius="9999px" />
      </div>

      <main className="page-bottom-pad" style={{ padding: "0 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          <Skeleton height="380px" borderRadius="32px" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height="280px" borderRadius="24px" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
