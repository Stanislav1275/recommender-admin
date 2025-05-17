import { useToast } from './use-toast';
import { cn } from '@/shared/lib/utils';

export function ToastProvider() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'p-4 rounded-lg shadow-lg max-w-sm',
            toast.variant === 'destructive'
              ? 'bg-red-50 text-red-900 border border-red-200'
              : 'bg-white text-gray-900 border border-gray-200'
          )}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="font-medium">{toast.title}</h3>
              <p className="mt-1 text-sm">{toast.description}</p>
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Закрыть</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export const toast = useToast;
