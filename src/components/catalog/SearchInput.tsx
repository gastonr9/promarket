"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Buscar en el catálogo...",
  debounceMs = 300,
  className = ""
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value || "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local value with prop
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => setLocalValue(value), 0);
  }, [value]);

  const debouncedOnChange = useCallback((val: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onChange(val), debounceMs);
  }, [onChange, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className={cn("search-input relative flex-1 max-w-xs", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full h-10 pl-10 pr-4 rounded-[var(--radius)] border border-input bg-background",
          "placeholder:text-muted-foreground text-sm",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "transition-colors duration-150"
        )}
        aria-label="Buscar en el catálogo"
        autoComplete="off"
      />
    </div>
  );
}