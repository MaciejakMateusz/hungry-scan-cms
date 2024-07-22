import React, {useState} from 'react';

export const Tooltip = ({children, content}) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={'tooltip-wrapper'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {children}
            {isVisible && (
                <div
                    className={'tooltip-content'}>
                    {content}
                </div>
            )}
        </div>
    );
};