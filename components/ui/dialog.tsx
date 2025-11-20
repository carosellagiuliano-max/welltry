"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return open
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className={cn("surface w-full max-w-lg", className)}>
            <div className="flex items-center justify-between border-b border-[--color-border] px-5 py-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Dialog</p>
                {title && <h3 className="text-lg font-semibold">{title}</h3>}
              </div>
              <Button variant="ghost" size="sm" aria-label="close dialog" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="px-5 py-4 text-sm text-[--color-foreground]">{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
}
