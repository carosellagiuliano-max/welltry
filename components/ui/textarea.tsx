import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted focus-visible:outline focus-visible:outline-[--color-primary]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
