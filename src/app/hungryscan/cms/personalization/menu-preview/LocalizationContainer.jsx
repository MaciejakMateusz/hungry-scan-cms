import React from "react";
import {useSelector} from "react-redux";
import {LocalizationIcon} from "../../../../icons/LocalizationIcon";

export const LocalizationContainer = () => {
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const theme = menu?.theme
    const restaurantName = menu?.restaurant.name

    return (
        <div className={'menu-preview-localization-container'}>
            <span className={'menu-preview-flex-centered'}>
                <LocalizationIcon themeColor={theme}/>
                {restaurantName}
            </span>
        </div>
    );
}