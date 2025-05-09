import React from "react";
import {MenuItemDetails} from "./preview/MenuItemDetails";

export const MenuItemMobilePreview = ({image}) => {
    return (
        <div className={'menu-item-mobile-preview-container'}>
            <img className={'phone-frame'}
                 src={`${process.env.PUBLIC_URL}/theme/images/phone-frame.png`}
                 alt={'Phone frame'}/>
            <MenuItemDetails image={image}/>
        </div>
    );
}