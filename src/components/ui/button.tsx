"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-heading font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white border border-primary hover:bg-primary-hover shadow-sm",
        primary: "bg-primary text-white border border-primary hover:bg-primary-hover shadow-sm",
        secondary: "bg-white text-primary border border-primary hover:bg-primary-light",
        outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary-light",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
        destructive: "bg-destructive text-destructive-foreground border border-destructive hover:bg-red-700",
        light: "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 hover:border-primary hover:text-primary",
        link: "bg-transparent hover:bg-transparent text-primary hover:underline p-0 h-auto gap-0",
        whatsapp: "bg-accent text-white border-none hover:bg-primary shadow-sm gap-2",
      },
      size: {
        xs: "h-8 px-3 text-[10px] gap-1.5",
        sm: "h-9 px-4 text-xs gap-2",
        default: "h-11 px-5 text-xs gap-2",
        lg: "h-12 px-6 text-sm gap-2.5",
        xl: "h-14 px-8 text-base gap-3",
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

interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = ({
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { buttonVariants };