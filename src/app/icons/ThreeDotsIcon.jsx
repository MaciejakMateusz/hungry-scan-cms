import React from "react";

export const ThreeDotsIcon = ({fill = '#222'}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.25" cy="10" r="1.5" fill={fill}/>
            <circle cx="10" cy="10" r="1.5" fill={fill}/>
            <circle cx="16.75" cy="10" r="1.5" fill={fill}/>
        </svg>
    );
}