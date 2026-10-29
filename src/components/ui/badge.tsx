"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "tag";
  size?: "sm" | "default" | "lg";
}

export function Badge({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-semibold rounded-[var(--radius)] transition-colors";

  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border-2 border-border bg-transparent text-foreground",
    accent: "bg-accent text-accent-foreground",
    tag: "bg-[var(--lime)] text-[var(--ink)] font-extrabold uppercase tracking-wider",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",
    default: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
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