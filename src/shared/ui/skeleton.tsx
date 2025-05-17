import { cn } from '@/shared/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-slate-200/20 dark:bg-slate-800/20',
                className
            )}
            {...props}
        />
    );
} 