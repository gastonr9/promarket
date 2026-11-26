"use client";

import dynamic from "next/dynamic";

/**
 * Code-split below-the-fold sections while keeping their content server-rendered for crawlers.
 */

// Trust Strip - Service indicators
export const TrustStrip = dynamic(
  () => import("./TrustStrip").then((m) => ({ default: m.TrustStrip })),
  {
    loading: () => (
      <div className="py-8 animate-pulse grid gap-4 md:grid-cols-4 px-4">
        <div className="h-16 bg-muted rounded" />
        <div className="h-16 bg-muted rounded" />
        <div className="h-16 bg-muted rounded" />
        <div className="h-16 bg-muted rounded" />
      </div>
    ),
  }
);

// Catalog - Product grid with filters
export const Catalog = dynamic(
  () => import("./Catalog").then((m) => ({ default: m.Catalog })),
  {
    loading: () => (
      <div className="py-16 animate-pulse grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
        <div className="h-72 bg-muted" />
        <div className="h-72 bg-muted" />
        <div className="h-72 bg-muted" />
        <div className="h-72 bg-muted" />
      </div>
    ),
  }
);

// How It Works - 3 steps
export const HowItWorks = dynamic(
  () => import("./HowItWorks").then((m) => ({ default: m.HowItWorks })),
  {
    loading: () => (
      <div className="py-16 animate-pulse grid gap-8 md:grid-cols-3 px-4">
        <div className="h-48 bg-muted rounded" />
        <div className="h-48 bg-muted rounded" />
        <div className="h-48 bg-muted rounded" />
      </div>
    ),
  }
);

// Contact cards - configured contact details
export const ContactCards = dynamic(
  () => import("./ContactCards").then((m) => ({ default: m.ContactCards })),
  {
    loading: () => (
      <div className="py-12 animate-pulse grid gap-6 md:grid-cols-3 px-4">
        <div className="h-48 bg-muted rounded" />
        <div className="h-48 bg-muted rounded" />
        <div className="h-48 bg-muted rounded" />
      </div>
    ),
  }
);

// Footer - Naval background
export const Footer = dynamic(
  () => import("./Footer").then((m) => ({ default: m.Footer })),
  {
    loading: () => (
      <div className="py-12 animate-pulse">
        <div className="h-32 bg-muted" />
      </div>
    ),
  }
);