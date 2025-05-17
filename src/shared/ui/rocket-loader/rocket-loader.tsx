import React, { useEffect } from 'react';
import { Rocket } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export interface RocketLoaderProps {
  isVisible: boolean;
  progress: number;
  onFinish?: () => void;
}

export const RocketLoader = ({ isVisible, progress, onFinish }: RocketLoaderProps) => {
  useEffect(() => {
    if (progress >= 1 && onFinish) {
      onFinish();
    }
  }, [progress, onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative h-[300px] w-full max-w-[500px] overflow-hidden">
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ 
            transform: `translate(-50%, ${100 - progress * 100}%)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <div className="relative">
            <Rocket 
              className={cn(
                "h-16 w-16 text-primary animate-pulse",
                progress >= 1 && "animate-bounce"
              )} 
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 rounded-full opacity-70 animate-ping" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-400 rounded-full opacity-50 animate-ping animation-delay-150" />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-300 rounded-full opacity-30 animate-ping animation-delay-300" />
          </div>
        </div>
      </div>
    </div>
  );
}; 