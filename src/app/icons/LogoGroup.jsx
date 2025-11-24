import React from "react";
import {BrandLogo} from "./BrandLogo";

export const LogoGroup = ({onClick}) => {
    return (
        <div className={'icon-logo-group'} onClick={onClick}>
            <div className={'brand-logo-container'}>
                <BrandLogo/>
            </div>
            <span className={'logo-brand-name'}>HungryScan</span>
        </div>

    );
}