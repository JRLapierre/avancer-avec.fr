import { useEffect, useState } from "react";

export const useHeaderHeight = () => {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header');
        if (!header) return;

        const updateHeight = () => {setHeaderHeight(header.offsetHeight)};
        //in case the screen changes size
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {window.removeEventListener('resize', updateHeight)};
    }, []);

    return headerHeight;
};