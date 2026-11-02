import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
  signOut: vi.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  LayoutGroup: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => {
  const icons = [
    "LayoutDashboard",
    "Package",
    "Tag",
    "Settings",
    "Eye",
    "LogOut",
    "ChevronLeft",
    "Search",
    "Command",
    "ArrowUp",
    "ArrowDown",
    "ExternalLink",
    "ChevronRight",
    "Plus",
    "Edit",
    "Trash2",
    "Upload",
    "Download",
    "FileSpreadsheet",
    "Image",
    "X",
    "Loader2",
    "FileText",
    "CheckCircle",
    "AlertCircle",
    "Info",
  ];
  
  const mockIcon = (name: string) => {
    const Icon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid={`icon-${name.toLowerCase()}`} {...props} />
    );
    Icon.displayName = `MockIcon${name}`;
    return Icon;
  };
  
  return icons.reduce((acc, name) => ({ ...acc, [name]: mockIcon(name) }), {});
});

// Mock @vercel/analytics/react
vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
  track: vi.fn(),
}));

// Mock @vercel/speed-insights/next
vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => null,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock matchMedia for theme detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Polyfill IntersectionObserver for jsdom
class IntersectionObserverPolyfill {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
  elements: Set<Element>;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options || {};
    this.elements = new Set();
  }

  observe(element: Element) {
    this.elements.add(element);
    // Trigger callback immediately in test environment
    const entry: IntersectionObserverEntry = {
      target: element,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now(),
    } as IntersectionObserverEntry;
    this.callback([entry], this);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = IntersectionObserverPolyfill as unknown as typeof IntersectionObserver;

// Suppress console.error in tests (optional, remove for debugging)
// const originalError = console.error;
// beforeAll(() => {
//   console.error = (...args) => {
//     if (args[0]?.includes?.("Warning: ReactDOM.render is no longer supported")) return;
//     originalError.call(console, ...args);
//   };
// });
// afterAll(() => {
//   console.error = originalError;
// });