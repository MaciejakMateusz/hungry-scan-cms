import React from "react";
import {Button} from "./BorderedButton.style";

export const BorderedButton = ({onClick, icon, text, isBordered, isMobile, style}) => {
    return (
        <Button onClick={onClick}
                style={{
                    ...style,
                    border: isBordered ? '1px solid #EDEFF3' : 'none',
                    padding: isMobile ? '6px 6px' : '6px 12px'
        }}>
            {icon && <span>{icon}</span>}
            {(text && !isMobile) && <span>{text}</span>}
        </Button>
    );
}