import { useState, useEffect } from 'react';

export const useScreenWiderThan = (breakpoint: number): boolean => {
    const [isWider, setIsWider] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(min-width: ${breakpoint.toString()}px)`);
        setIsWider(mediaQuery.matches);

        const handleResize = (e: MediaQueryListEvent) => {
            setIsWider(e.matches);
        };

        mediaQuery.addEventListener('change', handleResize);
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, [breakpoint]);

    return isWider;
};
