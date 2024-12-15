import React from "react";
import {useTranslation} from "react-i18next";

export const NavMenu = () => {
    const {t} = useTranslation();

    return (
        <div className={'main-page-menu'}>
            <div className={'main-page-menu-wrapper'}>
                <div className={'main-page-menu-buttons'}>
                    <button className={'main-page-menu-button'}>Home</button>
                    <button className={'main-page-menu-button'}>{t('ourOffer')}</button>
                    <button className={'main-page-menu-button'}>{t('pricePlans')}</button>
                    <button className={'main-page-menu-button'}>{t('aboutUs')}</button>
                    <button className={'main-page-menu-button'}>{t('contact')}</button>
                    <button className={'main-page-menu-button active'}>{t('logInButton')}</button>
                </div>
            </div>
        </div>
    );
}