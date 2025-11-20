import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-[--color-primary] text-[--color-primary-foreground] hover:opacity-90 focus-visible:outline-[--color-primary]",
        secondary: "bg-[--color-secondary] text-[--color-secondary-foreground] hover:opacity-90 focus-visible:outline-[--color-secondary]",
        ghost: "bg-transparent text-[--color-foreground] border border-[--color-border] hover:bg-[--color-muted]/60 focus-visible:outline-[--color-foreground]",
        outline: "bg-white text-[--color-foreground] border border-[--color-border] shadow-sm hover:bg-[--color-muted]/50 focus-visible:outline-[--color-foreground]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-5 text-base",
        block: "w-full h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { buttonVariants };
