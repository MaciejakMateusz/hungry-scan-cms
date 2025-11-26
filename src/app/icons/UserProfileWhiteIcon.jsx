import React from "react";
import {USER_PROFILE} from "../../utils/viewsConstants";
import {useSwitchView} from "../../hooks/useSwitchView";

export const UserProfileWhiteIcon = ({clearStateHandler}) => {
    const handleSwitchView = useSwitchView({clearStateHandler: clearStateHandler});
    return (
        <div className={'profile-icon-wrapper'} onClick={() => handleSwitchView(USER_PROFILE)}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C12.7614 2 15 4.23858 15 7C15 8.68525 14.1652 10.1743 12.8877 11.0801C15.2255 11.4991 17 13.5416 17 16L16.9893 16.2041C16.8938 17.1457 16.1457 17.8938 15.2041 17.9893L15 18H5L4.7959 17.9893C3.85435 17.8938 3.1062 17.1457 3.01074 16.2041L3 16C3 13.5419 4.77397 11.4995 7.11133 11.0801C5.83419 10.1742 5 8.68496 5 7C5 4.23858 7.23858 2 10 2ZM8 12.25C5.92893 12.25 4.25 13.9289 4.25 16C4.25 16.4142 4.58579 16.75 5 16.75H15C15.4142 16.75 15.75 16.4142 15.75 16C15.75 13.9289 14.0711 12.25 12 12.25H8ZM10 3.25C7.92893 3.25 6.25 4.92893 6.25 7C6.25 9.07107 7.92893 10.75 10 10.75C12.0711 10.75 13.75 9.07107 13.75 7C13.75 4.92893 12.0711 3.25 10 3.25Z"
                      fill="#FAFAFA"/>
            </svg>
        </div>
    );
}