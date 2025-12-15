import React from "react";
import {ReactSVG} from "react-svg";
import {useSelector} from "react-redux";
import {Container} from "./Banner.style";

export const Banner = ({name, iconPath}) => {
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const shouldShowIcon = activeMenu.value?.bannerIconVisible;

    const renderIcon = () => {
        if (!shouldShowIcon) return;
        return (<ReactSVG src={iconPath} className={'banner-icon'}/>);
    }

    return (
        <Container style={shouldShowIcon ? {padding: '3px 10px 3px 8px'} : {}}>
            {renderIcon()}
            {name}
        </Container>
    );
}