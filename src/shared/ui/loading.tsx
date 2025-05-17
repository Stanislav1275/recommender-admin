import { cn } from "@/shared/lib/utils"

interface LoadingProps {
  className?: string
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-neutral-200 dark:border-neutral-800 rounded-full animate-spin border-t-[#d95b60]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#d95b60] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 