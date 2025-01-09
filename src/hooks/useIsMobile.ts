import { useState, useEffect } from 'react';

type ScreenSize = 'mobile' | 'desktop';

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize(window.innerWidth < 1024 ? 'mobile' : 'desktop');
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenSize;
};
