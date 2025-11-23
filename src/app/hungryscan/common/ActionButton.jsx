import React from "react";
import {Button} from "./ActionButton.style";

export const ActionButton = ({onClick, icon, text, style}) => {
    return (
        <Button onClick={onClick} style={{...style}}>
            {icon && <span>{icon}</span>}
            {text && <span>{text}</span>}
        </Button>
    );
}