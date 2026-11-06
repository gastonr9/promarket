"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "tag" | "promo" | "volume";
  size?: "sm" | "default" | "lg";
}

export function Badge({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-heading font-bold uppercase tracking-wider rounded-md transition-colors";

  const variants = {
    default: "bg-slate-900 text-white",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "border border-slate-300 bg-transparent text-slate-700",
    accent: "bg-primary-light text-primary",
    tag: "bg-primary text-white",
    promo: "bg-accent text-white",
    volume: "bg-primary text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    default: "px-2.5 py-0.5 text-xs gap-1.5",
    lg: "px-3 py-1 text-sm gap-2",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}