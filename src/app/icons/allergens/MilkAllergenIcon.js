import React from "react";

export const MilkAllergenIcon = ({isActive}) => {

    return (isActive ?
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#93B2C5"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.796 17.4796C29.9302 16.673 30 15.8447 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C15.9897 30 16.957 29.9042 17.8931 29.7212L11.6719 23.4998L15 7L17.5264 5.20999L29.796 17.4796Z"
                      fill="#95C2DF"/>
                <g filter="url(#filter0_d_105_29262)">
                    <path
                        d="M11 12.7906C11 12.3585 11.1399 11.938 11.3989 11.5921L13.3113 9.03728C13.542 8.72907 13.6667 8.35443 13.6667 7.96945V6.85417C13.6667 6.48598 13.3682 6.1875 13 6.1875H12.9271C12.5992 6.1875 12.3333 5.92167 12.3333 5.59375V5.59375C12.3333 5.26583 12.5992 5 12.9271 5H17.0729C17.4008 5 17.6667 5.26583 17.6667 5.59375V5.59375C17.6667 5.92167 17.4008 6.1875 17.0729 6.1875H17C16.6318 6.1875 16.3333 6.48598 16.3333 6.85417V7.96945C16.3333 8.35443 16.458 8.72907 16.6887 9.03728L18.6011 11.5921C18.8601 11.938 19 12.3585 19 12.7906V22C19 23.1046 18.1046 24 17 24H13C11.8954 24 11 23.1046 11 22V12.7906Z"
                        fill="white"/>
                    <path
                        d="M12 17.1694C12 16.1761 13.0486 15.5326 13.9342 15.9825V15.9825C14.1411 16.0876 14.317 16.2449 14.4443 16.439L14.4976 16.5201C14.8111 16.9979 15.3442 17.2857 15.9157 17.2857H16.8678C17.1157 17.2857 17.3568 17.3671 17.554 17.5173V17.5173C17.835 17.7315 18 18.0645 18 18.4179V20C18 21.6569 16.6569 23 15 23V23C13.3431 23 12 21.6569 12 20V17.1694Z"
                        fill="#93B2C5"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29262" x="7" y="3" width="16" height="27" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29262"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29262" result="shape"/>
                    </filter>
                </defs>
            </svg> :
            <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M29.796 17.4796C29.9302 16.673 30 15.8447 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C15.9897 30 16.957 29.9042 17.8931 29.7212L11.6719 23.4998L15 7L17.5264 5.20999L29.796 17.4796Z"
                      fill="#E1E1E1"/>
                <g filter="url(#filter0_d_105_29823)">
                    <path
                        d="M11 12.7906C11 12.3585 11.1399 11.938 11.3989 11.5921L13.3113 9.03728C13.542 8.72907 13.6667 8.35443 13.6667 7.96945V6.85417C13.6667 6.48598 13.3682 6.1875 13 6.1875H12.9271C12.5992 6.1875 12.3333 5.92167 12.3333 5.59375V5.59375C12.3333 5.26583 12.5992 5 12.9271 5H17.0729C17.4008 5 17.6667 5.26583 17.6667 5.59375V5.59375C17.6667 5.92167 17.4008 6.1875 17.0729 6.1875H17C16.6318 6.1875 16.3333 6.48598 16.3333 6.85417V7.96945C16.3333 8.35443 16.458 8.72907 16.6887 9.03728L18.6011 11.5921C18.8601 11.938 19 12.3585 19 12.7906V22C19 23.1046 18.1046 24 17 24H13C11.8954 24 11 23.1046 11 22V12.7906Z"
                        fill="white"/>
                    <path
                        d="M12 17.1694C12 16.1761 13.0486 15.5326 13.9342 15.9825V15.9825C14.1411 16.0876 14.317 16.2449 14.4443 16.439L14.4976 16.5201C14.8111 16.9979 15.3442 17.2857 15.9157 17.2857H16.8678C17.1157 17.2857 17.3568 17.3671 17.554 17.5173V17.5173C17.835 17.7315 18 18.0645 18 18.4179V20C18 21.6569 16.6569 23 15 23V23C13.3431 23 12 21.6569 12 20V17.1694Z"
                        fill="#E1E1E1"/>
                </g>
                <defs>
                    <filter id="filter0_d_105_29823" x="7" y="3" width="16" height="27" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_29823"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_105_29823" result="shape"/>
                    </filter>
                </defs>
            </svg>
    );
}