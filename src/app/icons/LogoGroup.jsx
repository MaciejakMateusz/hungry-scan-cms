import React from "react";
import {BrandLogo} from "./BrandLogo";

export const LogoGroup = ({onClick}) => {
    return (
        <div className={'icon-logo-group'} onClick={onClick}>
            <BrandLogo/>
            <span className={'logo-brand-name'}>HungryScan</span>
        </div>

    );
}