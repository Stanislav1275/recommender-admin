import { useState, useEffect, useRef } from 'react';

interface UseRocketLoaderOptions {
  duration?: number;
  onFinish?: () => void;
}

export function useRocketLoader({ duration = 3000, onFinish }: UseRocketLoaderOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateProgress = () => {
    if (!isLoading) return;
    
    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    const newProgress = Math.min(elapsed / duration, 1);
    
    setProgress(newProgress);
    
    if (newProgress < 1) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (onFinish) {
        onFinish();
      }
      
      timerRef.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
    startTimeRef.current = Date.now();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const stopLoading = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setIsLoading(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    progress,
    startLoading,
    stopLoading,
    loaderProps: {
      isVisible: isLoading,
      progress,
      onFinish
    }
  };
} 