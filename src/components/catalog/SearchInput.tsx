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
  placeholder = "Buscar productos, marcas...",
  debounceMs = 300,
  className = ""
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local value with prop
  useEffect(() => {
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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors duration-150" aria-hidden="true" />
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full h-11 pl-10 pr-4 rounded-md border font-body text-sm",
          "placeholder:text-slate-400 text-slate-900",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "transition-colors duration-150 bg-white",
          isFocused 
            ? "border-primary" 
            : "border-slate-300"
        )}
        aria-label="Buscar en el catálogo"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}