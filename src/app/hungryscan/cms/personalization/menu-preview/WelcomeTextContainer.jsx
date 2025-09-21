import React from "react";
import {useSelector} from "react-redux";
import {getTranslation} from "../../../../../locales/langUtils";

export const WelcomeTextContainer = () => {
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);

    if (!menu) return null;

    return (
        <div className={'menu-preview-welcome-text-container'}>
            <span>{getTranslation(menu.message)}</span>
        </div>
    );
}