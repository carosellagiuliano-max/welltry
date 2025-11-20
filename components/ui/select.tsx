import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, children, ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm text-[--color-foreground]">
      {label && <span className="font-medium">{label}</span>}
      <select
        ref={ref}
        className={cn(
          "w-full rounded-md border border-[--color-border] bg-white px-3 py-2 shadow-sm focus-visible:outline focus-visible:outline-[--color-primary]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {helperText && <span className="text-xs text-muted">{helperText}</span>}
    </label>
  )
);
Select.displayName = "Select";
