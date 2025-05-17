import { useEffect, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';

export function useGlobalLoader(minDelay = 400) {
  const isFetching = useIsFetching();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isFetching > 0) {
      setShow(true);
    } else if (show) {
      timeout = setTimeout(() => setShow(false), minDelay);
    }
    return () => clearTimeout(timeout);
  }, [isFetching, minDelay, show]);

  return show;
}