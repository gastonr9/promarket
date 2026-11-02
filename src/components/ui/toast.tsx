"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "default" | "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => string;
  hideToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "default", duration = 4200) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, onHide }: { toasts: Toast[]; onHide: (id: string) => void }) {
  return (
    <AnimatePresence>
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={onHide} />
        ))}
      </div>
    </AnimatePresence>
  );
}

function ToastItem({ toast, onHide }: { toast: Toast; onHide: (id: string) => void }) {
  const icons = {
    default: Info,
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[toast.type];

  const typeClasses = {
    default: "bg-[var(--ink)] text-white",
    success: "bg-[var(--blue)] text-white",
    error: "bg-[var(--coral)] text-white",
    info: "bg-[var(--blue)] text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-[var(--radius)] shadow-brand",
        "min-w-[280px] max-w-[380px]",
        typeClasses[toast.type]
      )}
      role="alert"
      style={{ pointerEvents: "auto" }}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm flex-1">{toast.message}</p>
      <Button
        variant="ghost"
        size="icon"
        className="text-white/70 hover:text-white"
        onClick={() => onHide(toast.id)}
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </Button>
    </motion.div>
  );
}

