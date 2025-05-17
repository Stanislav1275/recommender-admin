import { cn } from '@/shared/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'overlay';
}

export function Loader({ className, size = 'md', variant = 'default', ...props }: LoaderProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const variantClasses = {
        default: 'text-slate-600 dark:text-slate-400',
        overlay: 'fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50',
    };

    const loader = (
        <Loader2
            className={cn(
                'animate-spin',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        />
    );

    if (variant === 'overlay') {
        return (
            <div className={variantClasses.overlay} {...props}>
                {loader}
            </div>
        );
    }

    return loader;
} 