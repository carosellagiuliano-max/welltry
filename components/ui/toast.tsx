"use client";

import * as React from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  push: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = (id: string) => setToasts((current) => current.filter((t) => t.id !== id));

  const push = React.useCallback((toast: Omit<ToastItem, "id">) => {
    setToasts((current) => [...current, { ...toast, id: crypto.randomUUID() }]);
  }, []);

  React.useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) => setTimeout(() => dismiss(toast.id), 4000));
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 rounded-md border border-[--color-border] bg-white p-4 shadow-lg",
              toast.variant === "success" && "border-emerald-400",
              toast.variant === "error" && "border-rose-400",
              toast.variant === "warning" && "border-amber-400"
            )}
          >
            <div className="mt-0.5">
              {toast.variant === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              {toast.variant === "error" && <X className="h-5 w-5 text-rose-500" />}
              {toast.variant === "warning" && <Info className="h-5 w-5 text-amber-500" />}
              {toast.variant === "info" && <Info className="h-5 w-5 text-sky-500" />}
            </div>
            <div className="flex-1 text-sm">
              <p className="font-semibold">{toast.title}</p>
              {toast.description && <p className="text-muted">{toast.description}</p>}
            </div>
            <button aria-label="toast schließen" className="text-xs text-muted" onClick={() => dismiss(toast.id)}>
              schließen
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider not mounted");
  return ctx;
}
