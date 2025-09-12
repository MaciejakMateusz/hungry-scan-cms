import React from "react";

export const MenuMobilePreview = () => {
    return (
        <div className={'menu-item-mobile-preview-container'}>
            <img className={'phone-frame'}
                 src={`${process.env.PUBLIC_URL}/theme/images/phone-frame.png`}
                 alt={'Phone frame'}/>
        </div>
    );
}