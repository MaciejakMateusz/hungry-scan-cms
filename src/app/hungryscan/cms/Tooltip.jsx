import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const Tooltip = ({ children, content, topOffset = -40}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({});

    const handleMouseEnter = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.top + topOffset,
            left: rect.left + rect.width / 2,
        });
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <>
            <div
                className={'tooltip-wrapper'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {children}
            </div>
            {isVisible && ReactDOM.createPortal(
                <div
                    className={'tooltip-content'}
                    style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
                    {content}
                </div>,
                document.body
            )}
        </>
    );
};