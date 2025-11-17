import React from "react";

export const SearchIcon = ({color = "#222"}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1936 13.7287C14.5976 12.6305 15.5 10.9206 15.5 9C15.5 5.68629 12.8137 3 9.5 3C6.18629 3 3.5 5.68629 3.5 9C3.5 12.3137 6.18629 15 9.5 15C10.8931 15 12.1753 14.5252 13.1936 13.7287ZM13.1936 13.7287L16.5 17"
                  stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
    );
}