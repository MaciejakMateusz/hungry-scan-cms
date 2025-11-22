import React from "react";
import {useSelector} from "react-redux";
import {useGetTranslation} from "../../../../../hooks/useGetTranslation";

export const WelcomeTextContainer = () => {
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const getTranslation = useGetTranslation();

    if (!menu) return null;

    return (
        <div className={'menu-preview-welcome-text-container'}>
            <span>{getTranslation(menu.message)}</span>
        </div>
    );
}