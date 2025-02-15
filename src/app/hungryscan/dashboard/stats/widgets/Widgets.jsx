import React from "react";
import {QrWidget} from "./qr/QrWidget";
import {PackageWidget} from "./PackageWidget";
import {QrFrequencyWidget} from "./qr-freq/QrFrequencyWidget";
import {PopularDishesWidget} from "./popular-dishes/PopularDishesWidget";

export const Widgets = () => {
    return (
        <div className={'statistics-widgets-layout'}>
            <div className={'widgets-left-col'}>
                <QrWidget/>
                <PackageWidget/>
            </div>
            <div className={'widgets-right-col'}>
                <QrFrequencyWidget/>
                <PopularDishesWidget/>
            </div>
        </div>
    );
}