import React from "react";
import {s3BucketUrl} from "../../../../../../apiData";

export const MenuItemImage = ({menuItem, hasImage}) => {

    if (!hasImage) {
        return null;
    }

    return (
        <div className={`menu-preview-menu-item-image-container ${!hasImage ? 'no-photo' : ''}`}>
            <img alt={'Menu position'}
                 className={'menu-preview-menu-item-image'}
                 src={`${s3BucketUrl}/menuItems/${menuItem.id}?t=${menuItem.updated}`}
            />
        </div>
    );
};