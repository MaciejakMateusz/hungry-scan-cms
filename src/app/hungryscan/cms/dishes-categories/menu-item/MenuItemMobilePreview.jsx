import React from "react";
import {MenuItemDetails} from "./preview/MenuItemDetails";

export const MenuItemMobilePreview = () => {
    return (
        <div className={'menu-item-mobile-preview-container'}>
            <img className={'phone-frame'}
                 src={`${process.env.PUBLIC_URL}/theme/images/phone-frame.png`}
                 alt={'Phone frame'}/>
            <MenuItemDetails/>
        </div>
    );
}