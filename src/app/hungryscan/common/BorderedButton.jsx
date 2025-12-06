import React from "react";
import {Button} from "./BorderedButton.style";
import {LoadingSpinner} from "../../icons/LoadingSpinner";

export const BorderedButton = ({onClick, icon, text, isBordered, isMobile, style, isLoading, isPlus}) => {

    const renderContent = () => {
        if (isLoading) {
            return (<LoadingSpinner buttonMode={true}/>);
        }

        return (
            <>
                {icon && <span>{icon}</span>}
                {(text && !isMobile) && <span>{text}</span>}
            </>
        );
    }

    const getPadding = () => {
        if (isPlus && !isMobile) {
            return '6px 12px 6px 6px';
        }
        return isMobile ? '6px 6px' : style?.padding;
    }

    return (
        <Button onClick={onClick}
                style={{
                    ...style,
                    border: isBordered ? '1px solid #EDEFF3' : 'none',
                    padding: getPadding(),
                    gap: isPlus ? '1px' : '8px'
                }}>
            {renderContent()}
        </Button>
    );
}