"use client";

import { useRef, useEffect, useState } from "react";
import { motion, type MotionProps } from "framer-motion";

/**
 * Variants for staggered section entrance animations
 * Following design-taste-frontend: heading → text → image/buttons
 * Stagger: 60-90ms, rise 16-32px with opacity
 */
const sectionRevealVariants = {
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

export { sectionRevealVariants };

/**
 * Hook to detect when element enters viewport
 * Respects prefers-reduced-motion
 */
export function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Defer to avoid synchronous state update in effect
      requestAnimationFrame(() => setIsInView(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
}

/**
 * Wrapper component for section entrance animations
 * Usage: <SectionReveal><motion.div variants={sectionRevealVariants.item} /></SectionReveal>
 */
interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  const [ref, isInView] = useInView();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={sectionRevealVariants.container}
      initial={isInView ? "show" : "hidden"}
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrapper for motion components that should animate on scroll
 */
interface MotionSectionProps extends MotionProps {
  variant?: "item" | "itemFast" | "image";
}

export function MotionSection({ variant = "item", children, ...props }: MotionSectionProps) {
  const [ref, isInView] = useInView();

  const variants = {
    item: sectionRevealVariants.item,
    itemFast: sectionRevealVariants.itemFast,
    image: sectionRevealVariants.image,
  }[variant];

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={isInView ? "show" : "hidden"}
      animate={isInView ? "show" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}