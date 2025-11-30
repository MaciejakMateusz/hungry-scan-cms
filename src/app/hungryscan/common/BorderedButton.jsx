import React from "react";
import {Button} from "./BorderedButton.style";
import {LoadingSpinner} from "../../icons/LoadingSpinner";

export const BorderedButton = ({onClick, icon, text, isBordered, isMobile, style, isLoading}) => {

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

    return (
        <Button onClick={onClick}
                style={{
                    ...style,
                    border: isBordered ? '1px solid #EDEFF3' : 'none',
                    padding: isMobile ? '6px 6px' : style?.padding
                }}>
            {renderContent()}
        </Button>
    );
}