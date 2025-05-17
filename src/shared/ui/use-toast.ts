import { useState, useCallback } from 'react';

type ToastVariant = 'default' | 'destructive';

interface Toast {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
}

interface ToastOptions {
  title: string;
  description: string;
  variant?: ToastVariant;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = 'default' }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, title, description, variant };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toast, dismiss, toasts };
}
