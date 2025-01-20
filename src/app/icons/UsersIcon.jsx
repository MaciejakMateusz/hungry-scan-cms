import React from "react";

export const UsersIcon = ({active}) => {
    const color = active ? "#FAFAFA" : "#93939E";
    return (
        <div className={'nav-btn-icon-wrapper'}>
            <svg width="16" height="17" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 1139">
                    <path id="Vector 30"
                          d="M13.6905 18.9999H1.07338C1.03286 18.9999 1 18.967 1 18.9265V15.8548C1 13.4984 2.91025 11.5881 5.26667 11.5881H9.53333C11.8897 11.5881 13.8 13.4984 13.8 15.8548V18.8904C13.8 18.9509 13.751 18.9999 13.6905 18.9999Z"
                          stroke={color} strokeLinecap="round"/>
                    <path id="Ellipse 359"
                          d="M11.1666 7.35297C11.1666 9.41244 9.48373 11.0883 7.39997 11.0883C5.31621 11.0883 3.6333 9.41244 3.6333 7.35297C3.6333 5.2935 5.31621 3.61768 7.39997 3.61768C9.48373 3.61768 11.1666 5.2935 11.1666 7.35297Z"
                          stroke={color}/>
                    <path id="Vector 37" d="M13.2666 10V10C15.4755 10.6265 16.9999 12.6434 16.9999 14.9394V19"
                          stroke={color}
                          strokeLinecap="round"/>
                    <path id="Vector 38" d="M13.2666 10C15.0841 6.42261 13.2666 1 7.3999 1" stroke={color}
                          strokeLinecap="round"/>
                </g>
            </svg>
        </div>
    );
}