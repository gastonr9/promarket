"use client";

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

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
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onHide={onHide} />
      ))}
    </div>
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

  // Use ref to trigger CSS animation
  const toastRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const element = toastRef.current;
    if (!element) return;
    
    // Trigger enter animation
    requestAnimationFrame(() => {
      element.classList.add("toast-enter");
    });
    
    // Auto-hide after duration
    const timer = setTimeout(() => {
      element.classList.add("toast-exit");
      setTimeout(() => onHide(toast.id), 300);
    }, toast.duration);
    
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onHide]);

  return (
    <div
      ref={toastRef}
      className={cn(
        "flex items-start gap-3 p-4 rounded-[var(--radius)] shadow-brand",
        "min-w-[280px] max-w-[380px]",
        typeClasses[toast.type],
        "toast-item"
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
        onClick={() => {
          const element = toastRef.current;
          if (element) {
            element.classList.add("toast-exit");
            setTimeout(() => onHide(toast.id), 300);
          } else {
            onHide(toast.id);
          }
        }}
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

