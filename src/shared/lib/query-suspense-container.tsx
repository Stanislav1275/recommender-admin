import React, { Suspense, ErrorInfo } from 'react';
import { ScreenLoader } from '@/shared/ui/screen-loader';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';

interface QuerySuspenseContainerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export class QueryErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error, errorInfo: ErrorInfo) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error, errorInfo: ErrorInfo) => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    toast.error('Произошла ошибка при загрузке данных');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6">
          <h2 className="text-xl font-bold mb-4">Что-то пошло не так</h2>
          <p className="text-muted-foreground mb-4">{this.state.error?.message}</p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>Перезагрузить страницу</Button>
            <Button variant="outline" onClick={() => this.setState({ hasError: false, error: null })}>
              Повторить запрос
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const QuerySuspenseContainer: React.FC<QuerySuspenseContainerProps> = ({
  children,
  fallback = <ScreenLoader />,
  onError,
}) => {
  return (
    <QueryErrorBoundary onError={onError}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </QueryErrorBoundary>
  );
}; 