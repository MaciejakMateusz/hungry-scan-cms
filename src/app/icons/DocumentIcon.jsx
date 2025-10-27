import React from "react";

export const DocumentIcon = ({active, customColor, absolute}) => {
    const defaultColor = customColor ? customColor : "#93939E";
    const color = active ? "#FAFAFA" : defaultColor;
    return (
        <div className={`nav-btn-icon-wrapper ${absolute ? 'absolute' : ''}`}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="4">
                    <g id="Group 1137">
                        <path id="Rectangle 4763"
                              d="M2.5 5.81309C2.5 4.3346 3.77612 3.17907 5.24736 3.32536L15.2474 4.31967C16.526 4.44681 17.5 5.52249 17.5 6.80741V16.6869C17.5 18.1654 16.2239 19.3209 14.7526 19.1746L4.75264 18.1803C3.47403 18.0532 2.5 16.9775 2.5 15.6926V5.81309Z"
                              stroke={color}/>
                        <path id="Rectangle 4764"
                              d="M14.8333 3.75V4.19558L15.276 4.2467C16.5396 4.39263 17.5 5.46396 17.5 6.73144V16.6862C17.5 18.1649 16.2235 19.3205 14.7521 19.1739L4.75213 18.1775C3.47374 18.0502 2.5 16.9746 2.5 15.6899V4.96021C2.5 3.7547 3.36029 2.72087 4.54573 2.50183L11.8791 1.14675C13.4157 0.862805 14.8333 2.04246 14.8333 3.60513V3.75Z"
                              stroke={color} strokeLinecap="round"/>
                        <path id="Vector 7" d="M6.44434 10.4167L13.5557 11.25" stroke={color} strokeLinecap="round"/>
                        <path id="Vector 8" d="M6.44434 7.5L13.5557 8.33333" stroke={color} strokeLinecap="round"/>
                    </g>
                </g>
            </svg>
        </div>
    );
}