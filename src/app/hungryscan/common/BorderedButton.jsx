import React from "react";
import {Button} from "./BorderedButton.style";

export const BorderedButton = ({onClick, icon, text, isBordered, style}) => {
    return (
        <Button onClick={onClick} style={{...style, border: isBordered ? '1px solid #EDEFF3' : 'none'}}>
            {icon && <span>{icon}</span>}
            {text && <span>{text}</span>}
        </Button>
    );
}