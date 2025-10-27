import React from "react";

export const BranLogo = () => {
    return (
        <div className={'brand-logo-container'}>
            <svg width="22" height="21" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_14_2525)">
                    <path d="M3 4.59954C3 1.13372 7.49218 1.13327 7.49218 4.59951C7.49218 8.06575 7.49218 8.43365 9.73828 8.43323C11.9844 8.43281 15.4837 8.49896 18.1667 11.8386C18.1667 11.8386 18.0011 13.6534 18.2142 14.7604C19.3009 20.4052 25.8883 17.8174 27.9947 19.2763C31.2549 21.5342 25.8213 26.0501 22.5611 21.5342C21.9091 20.631 18.2142 19.9853 18.2142 23.4508C18.2142 23.5944 18.2073 23.732 18.1942 23.8636C17.891 26.9104 14.2305 26.7728 14.2305 23.4508C14.2305 19.9853 14.2305 22.7678 14.2305 18.1471C14.2305 13.5264 7.34691 13.5264 7.34691 18.1471C7.34691 21.6127 3 21.6128 3 18.1473C3 14.6818 3 8.06536 3 4.59954Z"
                          fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_14_2525" x="0" y="0" width="32" height="30.05" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="1"/>
                        <feGaussianBlur stdDeviation="1.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.54 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14_2525"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14_2525" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}