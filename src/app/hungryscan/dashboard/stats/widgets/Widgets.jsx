import React from "react";
import {QrWidget} from "./qr/QrWidget";
import {UsersActivityWidget} from "./users-activity/UsersActivityWidget";
import {QrFrequencyWidget} from "./qr-freq/QrFrequencyWidget";
import {PopularDishesWidget} from "./popular-dishes/PopularDishesWidget";
import {useWindowWidth} from "../../../../../hooks/useWindowWidth";

export const Widgets = () => {
    const width = useWindowWidth();
    const isWide = width > 1300;

    return (
        <div className={'statistics-widgets-layout'}>
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