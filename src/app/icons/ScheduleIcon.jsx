import React from "react";

export const ScheduleIcon = ({isInEditMode }) => {
    const color = isInEditMode ? 'var(--Grey-700)' : '#222';
    return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.625 4H16C17.1046 4 18 4.89543 18 6V16C18 17.1046 17.1046 18 16 18H4C2.96435 18 2.113 17.2128 2.01074 16.2041L2 16V6C2 4.89543 2.89543 4 4 4H5.375V2H6.625V4H13.375V2H14.625V4ZM3.25 16C3.25 16.4142 3.58579 16.75 4 16.75H16C16.4142 16.75 16.75 16.4142 16.75 16V9.125H3.25V16ZM4 5.25C3.58579 5.25 3.25 5.58579 3.25 6V7.875H16.75V6C16.75 5.58579 16.4142 5.25 16 5.25H4Z"
                  fill={color}/>
        </svg>
    );
}