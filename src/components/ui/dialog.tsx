"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = open ? "hidden" : "";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange, isClient]);

  // Only render after mounted to avoid SSR mismatch
  if (!isClient) return null;
  
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
        aria-label="Cerrar diálogo"
        type="button"
      />
      <div
        ref={dialogRef}
        className={cn(
          "relative z-50 w-full max-w-2xl max-h-[86vh] rounded-none",
          "bg-white border-2 border-slate-200 shadow-industrial-3",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DialogClose({ className, children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={cn(
        "absolute right-4 top-4 z-10 w-8 h-8 rounded-none",
        "bg-slate-100 hover:bg-slate-200 border border-slate-200",
        "text-slate-700 transition-colors",
        "focus:outline-none focus:border-primary focus:ring-0",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
      }}
      {...props}
    >
      {children || (
        <>
          <X className="h-4 w-4 mx-auto" aria-hidden="true" />
          <span className="sr-only">Cerrar</span>
        </>
      )}
    </button>
  );
}

export function DialogHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-5 border-b border-slate-200", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("font-heading font-semibold text-lg text-slate-900 uppercase tracking-wide", className)} {...props}>
      {children}
    </h2>
  );
}

export function DialogDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("font-body text-sm text-slate-500", className)} {...props}>
      {children}
    </p>
  );
}

export function DialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props}>{children}</div>;
}

export function DialogFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-2",
        "border-t border-slate-200 pt-4 p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}