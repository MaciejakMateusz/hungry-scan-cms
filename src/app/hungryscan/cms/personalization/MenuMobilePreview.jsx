import React from "react";
import {Menu} from "./menu-preview/Menu";

export const MenuMobilePreview = () => {
    return (
        <div className={'menu-mobile-preview-container'}>
            <img className={'phone-frame'}
                 src={`${process.env.PUBLIC_URL}/theme/images/phone-frame.png`}
                 alt={'Phone frame'}/>
            <Menu/>
        </div>
    );
}