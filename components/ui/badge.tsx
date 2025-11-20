import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "soft";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const styles = {
    default: "bg-[--color-primary] text-[--color-primary-foreground]",
    outline: "border border-[--color-border] text-[--color-foreground]",
    soft: "bg-[--color-muted] text-[--color-foreground]",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", styles[variant], className)}
      {...props}
    />
  );
}
