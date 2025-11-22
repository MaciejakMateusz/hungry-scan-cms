import React from "react";
import {QrWidget} from "./qr/QrWidget";
import {UsersActivityWidget} from "./users-activity/UsersActivityWidget";
import {QrFrequencyWidget} from "./qr-freq/QrFrequencyWidget";
import {PopularDishesWidget} from "./popular-dishes/PopularDishesWidget";

export const Widgets = () => {
    return (
        <div className={'statistics-widgets-layout'}>
            <div className={'widgets-left-col'}>
                <QrWidget/>
                <UsersActivityWidget/>
            </div>
            <div className={'widgets-right-col'}>
                <QrFrequencyWidget/>
                <PopularDishesWidget/>
            </div>
        </div>
    );
}