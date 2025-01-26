import React from "react";
import {QrWidget} from "./QrWidget";
import {PackageWidget} from "./PackageWidget";
import {QrFrequencyWidget} from "./QrFrequencyWidget";
import {PopularDishesWidget} from "./PopularDishesWidget";

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