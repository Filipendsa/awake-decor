"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import styles from "./Toast.module.css";
import { CheckCircle2, Info, Sparkles } from "lucide-react";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info" | "sparkle") => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "sparkle" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "info" | "sparkle" = "success") => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <aside className={styles.toastContainer} aria-live="polite">
          <div className={styles.toastPill}>
            {toast.type === "sparkle" && <Sparkles size={16} className={styles.iconSparkle} />}
            {toast.type === "success" && <CheckCircle2 size={16} className={styles.iconSuccess} />}
            {toast.type === "info" && <Info size={16} className={styles.iconInfo} />}
            <span className={styles.toastMessage}>{toast.message}</span>
          </div>
        </aside>
      )}
    </ToastContext.Provider>
  );
};
