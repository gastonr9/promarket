"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Hook to detect when element enters viewport
 * Respects prefers-reduced-motion
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const threshold = options?.threshold ?? 0.1;
  const rootMargin = options?.rootMargin ?? "0px 0px -50px 0px";

  useEffect(() => {
    if (isInView) return;
    const element = ref.current;
    if (!element) return;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setIsInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView, threshold, rootMargin]);

  return [ref, isInView] as const;
}

/**
 * Animation variants for staggered entrance
 */
export const sectionRevealVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  itemFast: {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  image: {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
} as const;

/**
 * Wrapper component for section entrance animations
 * Usage: <SectionReveal><div className="motion-item" /></SectionReveal>
 */
interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Wrapper for components that should animate on scroll
 */
interface MotionSectionProps {
  variant?: "item" | "itemFast" | "image";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MotionSection({ variant = "item", children, className, style }: MotionSectionProps) {
  const [ref, isInView] = useInView();

  const variantStyles: Record<string, React.CSSProperties> = {
    item: { opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' },
    itemFast: { opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.4s ease-out, transform 0.4s ease-out' },
    image: { opacity: 0, transform: 'translateY(32px) scale(0.98)', transition: 'opacity 0.7s ease-out, transform 0.7s ease-out' },
  };

  const showStyles: Record<string, React.CSSProperties> = {
    item: { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' },
    itemFast: { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.4s ease-out, transform 0.4s ease-out' },
    image: { opacity: 1, transform: 'translateY(0) scale(1)', transition: 'opacity 0.7s ease-out, transform 0.7s ease-out' },
  };

  const currentStyles = isInView ? showStyles[variant] : variantStyles[variant];

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...currentStyles, ...style }}
    >
      {children}
    </div>
  );
}