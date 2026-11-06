"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, startIcon, endIcon, style, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    // Calculate padding to ensure icons don't overlap text
    const paddingLeft = startIcon ? "44px" : "16px";  // pl-11 = 44px, default pl-4 = 16px
    const paddingRight = endIcon ? "44px" : "16px";

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none z-10">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "input-base w-full",
              error && "border-red-500 focus:border-red-500 bg-red-50 focus:ring-red-500/20",
              className
            )}
            style={{
              ...style,
              paddingLeft,
              paddingRight,
            } as React.CSSProperties}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-3.5 flex items-center justify-center text-slate-400 z-10">
              {endIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 font-body text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 font-body text-xs text-slate-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "input-base min-h-[100px] resize-y",
            error && "border-red-500 focus:border-red-500 bg-red-50 focus:ring-red-500/20",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 font-body text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 font-body text-xs text-slate-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";