import { useState, useEffect } from 'react';

//Don't really need types for this function since the window object is dependable but better to be safe
type WindowSize = {
  width: number;
  height: number;
}

function useWindowSize() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width, height };
}