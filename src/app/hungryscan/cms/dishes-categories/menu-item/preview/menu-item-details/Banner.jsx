import React from "react";
import {ReactSVG} from "react-svg";
import {useSelector} from "react-redux";
import {Container} from "./Banner.style";

export const Banner = ({name, iconPath}) => {
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);

    const renderIcon = () => {
        const shouldShowIcon = activeMenu.value?.bannerIconVisible;
        if (!shouldShowIcon) return;
        return (<ReactSVG src={iconPath} className={'banner-icon'}/>);
    }

    return (
        <Container>
            {renderIcon()}
            {name}
        </Container>
    );
}