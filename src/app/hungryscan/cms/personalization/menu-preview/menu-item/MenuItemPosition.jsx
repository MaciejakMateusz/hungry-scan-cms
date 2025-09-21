import React from "react";
import {MenuItemImage} from "./MenuItemImage.jsx";
import {MenuItemContent} from "./MenuItemContent.jsx";
import {Banner} from "./Banner.jsx";
import {useTranslation} from "react-i18next";
import {useImageExists} from "../../../../../../hooks/useHasImage";

export const MenuItemPosition = ({menuItem}) => {
    const {t} = useTranslation();
    const hasImage = useImageExists(menuItem.id);
    const banners = menuItem.banners?.filter(banner => banner.id !== 'promo');

    return (
        <div className={'menu-preview-menu-item-container'}>
            <div className={'menu-preview-banner-wrapper'}>
                {banners?.map(banner => (
                    <Banner key={banner.id}
                            name={t(banner.id)}
                            iconPath={`${process.env.PUBLIC_URL}/theme/icons/${banner.id}-small.svg`}/>
                ))}
            </div>
            <div className={`menu-preview-menu-item-grid ${!hasImage ? 'no-photo' : ''}`}>
                <MenuItemImage menuItem={menuItem} hasImage={hasImage}/>
                <MenuItemContent menuItem={menuItem} hasImage={hasImage}/>
            </div>
        </div>
    );
}