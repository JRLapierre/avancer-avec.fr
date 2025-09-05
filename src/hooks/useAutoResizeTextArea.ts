import { useEffect, useRef } from "react";

export const useAutoResizeTextArea = () => {

    const supportsFieldSizing = CSS.supports('field-sizing', 'content');
    const ref = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (!supportsFieldSizing && ref.current) {
            const el = ref.current;
            const resize = () => {
                el.style.height = "auto";
                el.style.height = el.scrollHeight.toString() + "px";
            };
            resize(); // adjust on mount
            el.addEventListener("input", resize);
            return () => {el.removeEventListener("input", resize);}
        }
    });

    return ref;
}
