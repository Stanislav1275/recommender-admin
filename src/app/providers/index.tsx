import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';
import { ToastProvider } from '@/shared/ui/toast';
import { ScreenLoader } from '@/shared/ui/screen-loader';
import { DelayedSuspense } from '@/shared/lib/delayed-suspense';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
        <DelayedSuspense   fallback={<ScreenLoader />} delay={1000}>
          {children}
        </DelayedSuspense>
        <ToastProvider />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
