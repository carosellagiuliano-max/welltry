import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-[--color-primary]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
