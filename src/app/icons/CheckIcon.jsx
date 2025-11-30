import React from "react";

export const CheckIcon = ({width = '20', height = '20', stroke= '#FFF'}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 11L8.5 14.5L15.5 5.5" stroke={stroke} strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
    );
}