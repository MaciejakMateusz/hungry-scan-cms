import React, {useState} from 'react';
import ReactDOM from 'react-dom';

export const Tooltip = ({children, content, topOffset = -40, rightOffset = 0}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({});

    const handleMouseEnter = (event) => {

        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.top + topOffset,
            left: (rect.left + rect.width / 2) + rightOffset,
        });
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const renderContent = () => {
        if (content === '') return <></>;
        return (
            <div
                className={'tooltip-content'}
                style={{top: tooltipPosition.top, left: tooltipPosition.left}}>
                {content}
            </div>
        );
    }

    return (
        <>
            <div className={'tooltip-wrapper'}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                {children}
            </div>
            {isVisible && ReactDOM.createPortal(renderContent(), document.body)}
        </>
    );
};