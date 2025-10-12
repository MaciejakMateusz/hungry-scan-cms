import React from "react";
import {setCurrentView} from "../../slices/globalParamsSlice";
import {USER_PROFILE} from "../../utils/viewsConstants";
import {useDispatch} from "react-redux";

export const UserProfileWhiteIcon = () => {
    const dispatch = useDispatch();

    return (
        <div className={'profile-icon-wrapper'} onClick={() => dispatch(setCurrentView(USER_PROFILE))}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group">
                    <path id="Vector"
                          d="M2.43442 15.4936H13.3213C14.6351 15.4936 15.2557 15.1011 15.2557 14.2526C15.2557 12.1188 12.4498 9.05426 7.87456 9.05426C3.3059 9.05426 0.5 12.1188 0.5 14.2526C0.5 15.1011 1.1206 15.4936 2.43442 15.4936ZM2.11091 14.4362C1.78741 14.4362 1.66858 14.3539 1.66858 14.126C1.66858 12.6507 3.90669 10.118 7.87456 10.118C11.849 10.118 14.0872 12.6507 14.0872 14.126C14.0872 14.3539 13.9683 14.4362 13.6448 14.4362H2.11091ZM7.88774 7.97783C9.88819 7.97783 11.4991 6.28724 11.4991 4.19143C11.4991 2.1336 9.88819 0.5 7.88774 0.5C5.89393 0.5 4.2698 2.15892 4.2698 4.20409C4.2698 6.29358 5.88732 7.97783 7.88774 7.97783ZM7.88774 6.92042C6.54753 6.92042 5.43838 5.73005 5.43838 4.20409C5.43838 2.72245 6.54094 1.55741 7.88774 1.55741C9.23458 1.55741 10.3305 2.70346 10.3305 4.19143C10.3305 5.71739 9.22802 6.92042 7.88774 6.92042Z"
                          fill="#FAFAFA"/>
                </g>
            </svg>
        </div>
    );
}