"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-all duration-180 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[var(--ink-dark)] shadow-brand",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "bg-transparent hover:bg-muted text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        light: "bg-white text-foreground border-2 border-border hover:bg-[var(--lime)]/10 hover:text-[var(--lime-dark)]",
          link: "bg-transparent hover:bg-transparent text-primary hover:underline p-0 h-auto gap-0",
        },
      size: {
        xs: "h-8 px-3 text-xs gap-1.5",
        sm: "h-10 px-4 text-sm gap-2",
        default: "h-11 px-5 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
        xl: "h-14 px-8 text-lg gap-3",
        icon: "h-11 w-11",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive>, VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

export { buttonVariants };