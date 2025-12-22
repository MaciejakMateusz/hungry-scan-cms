import { useEffect } from "react";

export const useCloseOnScroll = (handler, when = true) => {
    useEffect(() => {
        if (!when) return;

        const onScroll = (event) => {
            handler(event);
        };

        window.addEventListener("scroll", onScroll, { capture: true, passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll, { capture: true });
        };
    }, [handler, when]);
};