import React from "react";

export const MustardAllergenIcon = ({isActive}) => {

    return (isActive ?
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E6A804"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.2504 19.6957C29.7368 18.2185 30 16.64 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C16.1042 30 17.1805 29.8807 18.2168 29.6543L12.3226 23.7601L14.2259 11.4954L12.9746 10.2441L13.647 9.57178L14.4065 10.3313L14.5979 9.0979L13.9395 8.43945L14.8398 7.53912L15.1426 5.58789L29.2504 19.6957Z"
                      fill="#F7B507"/>
                <g filter="url(#filter0_d_105_29989)">
                    <rect width="5.62963" height="13.1358" rx="0.703704" transform="matrix(-1 0 0 1 17.7773 10.8643)"
                          fill="white"/>
                    <rect width="4.22223" height="1.40741" rx="0.469136" transform="matrix(-1 0 0 1 17.0732 8.98743)"
                          fill="white"/>
                    <path
                        d="M15.1849 5.66759C15.1137 5.45374 14.8112 5.45374 14.7399 5.66759L13.8925 8.20978C13.8419 8.36167 13.9549 8.51852 14.115 8.51852H15.8098C15.9699 8.51852 16.083 8.36167 16.0323 8.20978L15.1849 5.66759Z"
                        fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29989" x="8.14795" y="3.5072" width="13.6294" height="26.4929"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29989"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29989" result="shape"/>
                    </filter>
                </defs>
            </svg> :
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.2504 19.6957C29.7368 18.2185 30 16.64 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C16.1042 30 17.1805 29.8807 18.2168 29.6543L12.3226 23.7601L14.2259 11.4954L12.9746 10.2441L13.647 9.57178L14.4065 10.3313L14.5979 9.0979L13.9395 8.43945L14.8398 7.53912L15.1426 5.58789L29.2504 19.6957Z"
                      fill="#E1E1E1"/>
                <g filter="url(#filter0_d_105_29956)">
                    <rect width="5.62963" height="13.1358" rx="0.703704" transform="matrix(-1 0 0 1 17.7773 10.8643)"
                          fill="white"/>
                    <rect width="4.22223" height="1.40741" rx="0.469136" transform="matrix(-1 0 0 1 17.0732 8.98743)"
                          fill="white"/>
                    <path
                        d="M15.1849 5.66759C15.1137 5.45374 14.8112 5.45374 14.7399 5.66759L13.8925 8.20978C13.8419 8.36167 13.9549 8.51852 14.115 8.51852H15.8098C15.9699 8.51852 16.083 8.36167 16.0323 8.20978L15.1849 5.66759Z"
                        fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29956" x="8.14795" y="3.5072" width="13.6294" height="26.4929"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29956"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29956" result="shape"/>
                    </filter>
                </defs>
            </svg>
    );
}