import { Suspense, useState, useEffect, type ReactNode } from 'react';

export const DelayedSuspense = ({ children, delay = 300, fallback }:{children:ReactNode, delay?:number, fallback:ReactNode}) => {
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timeout);
    }, [delay]);
  
    return show ? <Suspense fallback={fallback}>{children}</Suspense> : fallback;
  };