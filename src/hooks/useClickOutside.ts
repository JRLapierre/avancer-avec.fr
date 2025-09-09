import { useEffect, useRef, useState } from 'react';

export const useClickOutside = <T extends HTMLElement>(initialIsVisible = false): [React.RefObject<T | null>, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isVisible, setIsVisible] = useState(initialIsVisible);
    const ref = useRef<T>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            setIsVisible(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return [ref, isVisible, setIsVisible];
}
