import React from "react";
import {ReactSVG} from "react-svg";

export const Banner = ({name, iconPath}) => {
    return (
        <div className={'menu-preview-banner-container'}>
            <ReactSVG src={iconPath} className={'menu-preview-banner-icon'}/>
            {name}
        </div>
    );
}