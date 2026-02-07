import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

const AutoFitText = styled.span`
  display: inline-block;
  white-space: nowrap;
  transform-origin: center;
  z-index: 12;
`;

export const IndexedText = ({ children, minScale = 0.7, sidePaddingPx = 5 }) => {
    const ref = useRef(null);
    const [scale, setScale] = useState(1);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const fit = () => {
            const parent = el.parentElement;
            if (!parent) return;

            const available = parent.clientWidth - sidePaddingPx * 2;
            const needed = el.scrollWidth;

            if (needed <= 0 || available <= 0) return;

            const nextScale = Math.min(1, available / needed);
            setScale(Math.max(minScale, nextScale));
        };

        fit();

        const ro = new ResizeObserver(fit);
        ro.observe(el);
        ro.observe(el.parentElement);

        return () => ro.disconnect();
    }, [children, minScale, sidePaddingPx]);

    return (
        <AutoFitText ref={ref} style={{ transform: `scale(${scale})` }}>
            {children}
        </AutoFitText>
    );
}