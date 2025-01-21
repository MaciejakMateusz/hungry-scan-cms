import React from "react";

export const StatsIcon = ({active}) => {
    const color = active ? "#FAFAFA" : "#93939E";
    return (
        <div className={'nav-btn-icon-wrapper'}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="6">
                    <g id="Group 1191">
                        <path id="Rectangle 4783"
                              d="M3 19H3.5V18.5V13.1243C3.5 12.6825 3.14183 12.3243 2.7 12.3243H2.3C1.85817 12.3243 1.5 12.6825 1.5 13.1243V18.5V19H2H3Z"
                              stroke={color}/>
                        <path id="Rectangle 4784"
                              d="M8 19H8.5V18.5V10.2865C8.5 9.84465 8.14183 9.48648 7.7 9.48648H7.3C6.85817 9.48648 6.5 9.84465 6.5 10.2865V18.5V19H7H8Z"
                              stroke={color}/>
                        <path id="Rectangle 4785"
                              d="M13 19H13.5V18.5V13.1243C13.5 12.6825 13.1418 12.3243 12.7 12.3243H12.3C11.8582 12.3243 11.5 12.6825 11.5 13.1243V18.5V19H12H13Z"
                              stroke={color}/>
                        <path id="Rectangle 4786"
                              d="M18 19H18.5V18.5V10.2865C18.5 9.84465 18.1418 9.48648 17.7 9.48648H17.3C16.8582 9.48648 16.5 9.84465 16.5 10.2865V18.5V19H17H18Z"
                              stroke={color}/>
                        <path id="Vector 22"
                              d="M2.5 5.25675L7.31897 1.60996C7.42605 1.52892 7.57395 1.52892 7.68103 1.60996L12.319 5.11975C12.4261 5.20078 12.5739 5.20078 12.681 5.11975L17.5 1.47296"
                              stroke={color} strokeLinecap="round"/>
                        <path id="Vector 23" d="M15.5 1H17.7C17.8657 1 18 1.13431 18 1.3V2.89189" stroke={color}
                              strokeLinecap="round"/>
                    </g>
                </g>
            </svg>
        </div>
    );
}