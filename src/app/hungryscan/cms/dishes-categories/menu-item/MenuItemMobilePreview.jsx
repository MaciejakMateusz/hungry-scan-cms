import React from "react";
import {MenuItemDetails} from "./preview/MenuItemDetails";

export const MenuItemMobilePreview = ({image}) => {
    return (
        <div className={'menu-item-mobile-preview-container'}>
            <MenuItemDetails image={image}/>
        </div>
    );
}