import React from "react";

export const SoyAllergenIcon = ({isActive}) => {

    return (isActive ?
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#76C16E"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M28.0514 22.3986C29.2917 20.2154 30 17.6904 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C17.6905 30 20.2156 29.2916 22.3989 28.0512L8.59961 14.252L14.2522 8.59937L28.0514 22.3986Z"
                      fill="#93D38D"/>
                <g filter="url(#filter0_d_105_29711)">
                    <circle cx="14.8995" cy="14.8999" r="4" transform="rotate(-45 14.8995 14.8999)" fill="white"/>
                    <path
                        d="M21.2636 15.6071C22.4541 16.7977 22.7875 19.1791 22.3243 20.9104C22.2747 21.0957 22.4116 21.3556 22.3243 21.6175C22.2008 21.988 21.9876 22.2011 21.6172 22.3246C21.3552 22.412 21.0953 22.2751 20.91 22.3246C19.1788 22.7878 16.7973 22.4545 15.6067 21.264C14.0447 19.7019 14.0447 17.1692 15.6067 15.6071C17.1688 14.045 19.7015 14.045 21.2636 15.6071Z"
                        fill="white"/>
                    <path
                        d="M14.285 8.62849C13.0944 7.43794 10.7129 7.10463 8.98167 7.56783C8.79643 7.61739 8.53653 7.4805 8.27456 7.56783C7.90408 7.69132 7.69095 7.90445 7.56746 8.27493C7.48013 8.53691 7.61702 8.7968 7.56746 8.98204C7.10426 10.7133 7.43757 13.0948 8.62812 14.2853C10.1902 15.8474 12.7229 15.8474 14.285 14.2853C15.8471 12.7232 15.8471 10.1906 14.285 8.62849Z"
                        fill="white"/>
                    <circle cx="11.3641" cy="11.3644" r="2" transform="rotate(-45 11.3641 11.3644)" fill="#76C16E"/>
                    <circle cx="14.8997" cy="14.8999" r="2" transform="rotate(-45 14.8997 14.8999)" fill="#76C16E"/>
                    <circle cx="18.4354" cy="18.4355" r="2" transform="rotate(-45 18.4354 18.4355)" fill="#76C16E"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29711" x="3.3667" y="5.36731" width="23.1582" height="23.1578"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29711"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29711" result="shape"/>
                    </filter>
                </defs>
            </svg> :
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M28.0514 22.3986C29.2917 20.2154 30 17.6904 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C17.6905 30 20.2156 29.2916 22.3989 28.0512L8.59961 14.252L14.2522 8.59937L28.0514 22.3986Z"
                      fill="#E1E1E1"/>
                <g filter="url(#filter0_d_105_29893)">
                    <circle cx="14.8995" cy="14.8999" r="4" transform="rotate(-45 14.8995 14.8999)" fill="white"/>
                    <path
                        d="M21.2636 15.6071C22.4541 16.7977 22.7875 19.1791 22.3243 20.9104C22.2747 21.0957 22.4116 21.3556 22.3243 21.6175C22.2008 21.988 21.9876 22.2011 21.6172 22.3246C21.3552 22.412 21.0953 22.2751 20.91 22.3246C19.1788 22.7878 16.7973 22.4545 15.6067 21.264C14.0447 19.7019 14.0447 17.1692 15.6067 15.6071C17.1688 14.045 19.7015 14.045 21.2636 15.6071Z"
                        fill="white"/>
                    <path
                        d="M14.285 8.62849C13.0944 7.43794 10.7129 7.10463 8.98167 7.56783C8.79643 7.61739 8.53653 7.4805 8.27456 7.56783C7.90408 7.69132 7.69095 7.90445 7.56746 8.27493C7.48013 8.53691 7.61702 8.7968 7.56746 8.98204C7.10426 10.7133 7.43757 13.0948 8.62812 14.2853C10.1902 15.8474 12.7229 15.8474 14.285 14.2853C15.8471 12.7232 15.8471 10.1906 14.285 8.62849Z"
                        fill="white"/>
                    <circle cx="11.3641" cy="11.3644" r="2" transform="rotate(-45 11.3641 11.3644)" fill="#E1E1E1"/>
                    <circle cx="14.8997" cy="14.8999" r="2" transform="rotate(-45 14.8997 14.8999)" fill="#E1E1E1"/>
                    <circle cx="18.4354" cy="18.4355" r="2" transform="rotate(-45 18.4354 18.4355)" fill="#E1E1E1"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29893" x="3.3667" y="5.36731" width="23.1582" height="23.1578"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29893"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29893" result="shape"/>
                    </filter>
                </defs>
            </svg>
    );
}