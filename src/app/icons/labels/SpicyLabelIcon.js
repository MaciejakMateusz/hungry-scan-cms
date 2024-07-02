import React from "react";

export const SpicyLabelIcon = ({isActive}) => {

    return (isActive ?
            <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#DD6465"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.6494 18.2392C29.879 17.196 30 16.1121 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C15.7589 30 16.5047 29.9436 17.2333 29.8349L8.36522 20.9668L13 20.5L17 11.5L18.0156 6.60545L29.6494 18.2392Z"
                      fill="#E67778"/>
                <g filter="url(#filter0_d_105_29308)">
                    <path
                        d="M14.9907 10.8989C15.9824 10.1644 16.6471 10.3906 16.6471 10.3906C16.6471 10.3906 17.5458 8.97621 17.4647 7.98866C17.4253 7.50832 17.3118 7.18593 17.1271 6.80162C16.9806 6.49667 17.6998 6.32576 17.9553 6.54748C18.5013 7.02121 18.3531 7.86016 18.1294 8.21491C17.6009 9.05307 17.3117 10.6169 17.3117 10.6169C17.3117 10.6169 18.4168 10.7755 18.8099 11.6629C19.6486 13.5566 17.2553 19.1783 14.5423 20.9314C10.7389 23.3891 7.24143 20.5903 8.40201 20.4494C9.5626 20.3084 12.3848 20.733 13.5295 17.3702C14.1836 15.4487 13.5031 12.0007 14.9907 10.8989Z"
                        fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29308" x="4.17578" y="4.44678" width="18.8042" height="23.4911"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29308"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29308" result="shape"/>
                    </filter>
                </defs>
            </svg> :
            <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.6494 18.2392C29.879 17.196 30 16.1121 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C15.7589 30 16.5047 29.9436 17.2333 29.8349L8.36522 20.9668L13 20.5L17 11.5L18.0156 6.60545L29.6494 18.2392Z"
                      fill="#E1E1E1"/>
                <g filter="url(#filter0_d_105_29724)">
                    <path
                        d="M14.9907 10.8989C15.9824 10.1644 16.6471 10.3906 16.6471 10.3906C16.6471 10.3906 17.5458 8.97621 17.4647 7.98866C17.4253 7.50832 17.3118 7.18593 17.1271 6.80162C16.9806 6.49667 17.6998 6.32576 17.9553 6.54748C18.5013 7.02121 18.3531 7.86016 18.1294 8.21491C17.6009 9.05307 17.3117 10.6169 17.3117 10.6169C17.3117 10.6169 18.4168 10.7755 18.8099 11.6629C19.6486 13.5566 17.2553 19.1783 14.5423 20.9314C10.7389 23.3891 7.24143 20.5903 8.40201 20.4494C9.5626 20.3084 12.3848 20.733 13.5295 17.3702C14.1836 15.4487 13.5031 12.0007 14.9907 10.8989Z"
                        fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29724" x="4.17578" y="4.44678" width="18.8042" height="23.4911"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29724"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29724" result="shape"/>
                    </filter>
                </defs>
            </svg>
    );
}