import React from "react";

export const EggAllergenIcon = ({isActive}) => {

    return (isActive ?
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E6A804"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.3046 19.5275C29.7564 18.0989 30 16.5779 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C16.4736 30 17.8976 29.7875 19.243 29.3915L11.1158 21.2643L10.5 17.5001L10.2765 16.0732L12.6736 15.5956L9.41211 12.3341L10 11.5001L11.5 10.0001L18.3583 8.58105L29.3046 19.5275Z"
                      fill="#F7B507"/>
                <g filter="url(#filter0_d_105_29295)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20.4401 11.9698C20.5113 12.0667 20.5343 12.0979 20.5016 12C20.0016 10.5 18.0016 7 15.0016 7C12.0016 7 10.0016 10.5 9.5016 12C9.34783 12.4613 9.39761 12.3923 9.57684 12.144C9.84488 11.7726 10.4024 11 11.0016 11C11.4686 11 11.6514 11.218 11.8463 11.4505C12.0687 11.7159 12.307 12 13.0016 12C13.565 12 13.8136 11.7379 14.0563 11.4821C14.2876 11.2382 14.5136 11 15.0016 11C15.5016 11 15.7516 11.25 16.0016 11.5C16.2516 11.75 16.5016 12 17.0016 12C17.5016 12 17.7516 11.75 18.0017 11.5C18.2517 11.25 18.5018 11 19.0018 11C19.7272 11 20.252 11.7139 20.4401 11.9698ZM21 15.6667C21 19.7168 18.3137 23 15 23C11.6863 23 9 19.7168 9 15.6667C9 14.915 9.12608 14.1633 9.35239 13.4432C9.39726 13.3005 9.4825 13.1662 9.57507 13.0486V13.0486C9.84311 12.7082 10.4007 12 10.9998 12C11.4668 12 11.6496 12.1999 11.8445 12.413C12.067 12.6562 12.3052 12.9167 12.9998 12.9167C13.5632 12.9167 13.8118 12.6764 14.0545 12.4419C14.2859 12.2183 14.5118 12 14.9998 12C15.4998 12 15.7498 12.2292 15.9998 12.4583C16.2498 12.6875 16.4998 12.9167 16.9998 12.9167C17.4998 12.9167 17.7499 12.6875 17.9999 12.4583C18.25 12.2292 18.5 12 19 12C19.7254 12 20.2502 12.6544 20.4383 12.889V12.889C20.4552 12.91 20.4688 12.9335 20.4785 12.9587C20.8103 13.8225 21 14.7446 21 15.6667Z"
                          fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29295" x="5" y="5" width="20" height="24" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29295"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29295" result="shape"/>
                    </filter>
                </defs>
            </svg> :
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.3046 19.5275C29.7564 18.0989 30 16.5779 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C16.4736 30 17.8976 29.7875 19.243 29.3915L11.1158 21.2643L10.5 17.5001L10.2765 16.0732L12.6736 15.5956L9.41211 12.3341L10 11.5001L11.5 10.0001L18.3583 8.58105L29.3046 19.5275Z"
                      fill="#E1E1E1"/>
                <g filter="url(#filter0_d_105_29513)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20.4401 11.9698C20.5113 12.0667 20.5343 12.0979 20.5016 12C20.0016 10.5 18.0016 7 15.0016 7C12.0016 7 10.0016 10.5 9.5016 12C9.34783 12.4613 9.39761 12.3923 9.57684 12.144C9.84488 11.7726 10.4024 11 11.0016 11C11.4686 11 11.6514 11.218 11.8463 11.4505C12.0687 11.7159 12.307 12 13.0016 12C13.565 12 13.8136 11.7379 14.0563 11.4821C14.2876 11.2382 14.5136 11 15.0016 11C15.5016 11 15.7516 11.25 16.0016 11.5C16.2516 11.75 16.5016 12 17.0016 12C17.5016 12 17.7516 11.75 18.0017 11.5C18.2517 11.25 18.5018 11 19.0018 11C19.7272 11 20.252 11.7139 20.4401 11.9698ZM21 15.6667C21 19.7168 18.3137 23 15 23C11.6863 23 9 19.7168 9 15.6667C9 14.915 9.12608 14.1633 9.35239 13.4432C9.39726 13.3005 9.4825 13.1662 9.57507 13.0486V13.0486C9.84311 12.7082 10.4007 12 10.9998 12C11.4668 12 11.6496 12.1999 11.8445 12.413C12.067 12.6562 12.3052 12.9167 12.9998 12.9167C13.5632 12.9167 13.8118 12.6764 14.0545 12.4419C14.2859 12.2183 14.5118 12 14.9998 12C15.4998 12 15.7498 12.2292 15.9998 12.4583C16.2498 12.6875 16.4998 12.9167 16.9998 12.9167C17.4998 12.9167 17.7499 12.6875 17.9999 12.4583C18.25 12.2292 18.5 12 19 12C19.7254 12 20.2502 12.6544 20.4383 12.889V12.889C20.4552 12.91 20.4688 12.9335 20.4785 12.9587C20.8103 13.8225 21 14.7446 21 15.6667Z"
                          fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29513" x="5" y="5" width="20" height="24" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29513"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29513" result="shape"/>
                    </filter>
                </defs>
            </svg>
    );
}