import React from "react";
import {QrWidget} from "./qr/QrWidget";
import {UsersActivityWidget} from "./users-activity/UsersActivityWidget";
import {QrFrequencyWidget} from "./qr-freq/QrFrequencyWidget";
import {PopularDishesWidget} from "./popular-dishes/PopularDishesWidget";
import {useWindowWidth} from "../../../../../hooks/useWindowWidth";
import {useSelector} from "react-redux";

export const Widgets = () => {
    const {navPanelCollapsed} = useSelector(state => state.globalParams.globalParams);
    const width = useWindowWidth();
    const isWide = navPanelCollapsed ? width > 1300 : width > 1450;

    const columnLayout = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    }

    return (
        <div className={'statistics-widgets-layout'} style={!isWide ? columnLayout : {}}>
            <div className={'widgets-left-col'}>
                <QrWidget/>
                {isWide ? <UsersActivityWidget/> : <QrFrequencyWidget/>}
            </div>
            <div className={'widgets-right-col'}>
                {isWide ? <QrFrequencyWidget/> : <PopularDishesWidget/>}
                {isWide ? <PopularDishesWidget/> : <UsersActivityWidget/>}
            </div>
        </div>
    );
}