import React from "react";

export const NutsAllergenIcon = ({isActive}) => {

    return (isActive ?
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#BA9850"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.4999 18.8554C29.8262 17.6252 30 16.3329 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C16.8042 30 18.534 29.6815 20.1362 29.0976L11 19.9615L14.06 16.4609L9.31125 11.7122L14.5 9.00004L15.28 7.12769L18.9822 10.8299L20.1446 9.50004L29.4999 18.8554Z"
                      fill="#C4A769"/>
                <g filter="url(#filter0_d_105_29624)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12.4105 8.56358C11.8893 8.60919 11.3733 8.65435 10.9981 8.76471C9.80776 9.11481 9.32588 10.1942 9.1308 11.0108C9.00247 11.5479 9.44583 12 9.99811 12H19.9981C20.5504 12 20.9938 11.5479 20.8654 11.0108C20.6703 10.1942 20.1885 9.11481 18.9981 8.76471C18.6229 8.65436 18.1069 8.6092 17.5857 8.56359C16.6164 8.47877 15.6295 8.3924 15.4981 7.88235C15.4945 7.86865 15.4924 7.85436 15.4915 7.83956C15.4685 7.46993 15.3684 7 14.9981 7C14.6277 7 14.5277 7.46993 14.5047 7.83956C14.5038 7.85436 14.5016 7.86865 14.4981 7.88235C14.3666 8.3924 13.3797 8.47876 12.4105 8.56358ZM9.97583 13C9.43741 13 8.99203 13.4313 9.00011 13.9696C9.08872 19.8734 12.0909 20.9176 13.6417 21.457C14.0824 21.6102 14.4058 21.7227 14.5119 21.8944C14.7614 22.2981 14.8861 22.5 15.0109 22.5C15.1356 22.5 15.2603 22.2981 15.5098 21.8944C15.6159 21.7227 15.9393 21.6102 16.38 21.4569C17.9308 20.9175 20.9329 19.8732 21.0216 13.9696C21.0296 13.4313 20.5843 13 20.0458 13H9.97583Z"
                          fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29624" x="5" y="5" width="20.0215" height="23.5"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29624"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29624" result="shape"/>
                    </filter>
                </defs>
            </svg> :
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.4999 18.8554C29.8262 17.6252 30 16.3329 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C16.8042 30 18.534 29.6815 20.1362 29.0976L11 19.9615L14.06 16.4609L9.31125 11.7122L14.5 9.00004L15.28 7.12769L18.9822 10.8299L20.1446 9.50004L29.4999 18.8554Z"
                      fill="#E1E1E1"/>
                <g filter="url(#filter0_d_105_29565)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12.4105 8.56358C11.8893 8.60919 11.3733 8.65435 10.9981 8.76471C9.80776 9.11481 9.32588 10.1942 9.1308 11.0108C9.00247 11.5479 9.44583 12 9.99811 12H19.9981C20.5504 12 20.9938 11.5479 20.8654 11.0108C20.6703 10.1942 20.1885 9.11481 18.9981 8.76471C18.6229 8.65436 18.1069 8.6092 17.5857 8.56359C16.6164 8.47877 15.6295 8.3924 15.4981 7.88235C15.4945 7.86865 15.4924 7.85436 15.4915 7.83956C15.4685 7.46993 15.3684 7 14.9981 7C14.6277 7 14.5277 7.46993 14.5047 7.83956C14.5038 7.85436 14.5016 7.86865 14.4981 7.88235C14.3666 8.3924 13.3797 8.47876 12.4105 8.56358ZM9.97583 13C9.43741 13 8.99203 13.4313 9.00011 13.9696C9.08872 19.8734 12.0909 20.9176 13.6417 21.457C14.0824 21.6102 14.4058 21.7227 14.5119 21.8944C14.7614 22.2981 14.8861 22.5 15.0109 22.5C15.1356 22.5 15.2603 22.2981 15.5098 21.8944C15.6159 21.7227 15.9393 21.6102 16.38 21.4569C17.9308 20.9175 20.9329 19.8732 21.0216 13.9696C21.0296 13.4313 20.5843 13 20.0458 13H9.97583Z"
                          fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29565" x="5" y="5" width="20.0215" height="23.5"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29565"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29565" result="shape"/>
                    </filter>
                </defs>
            </svg>
    );
}