import React from "react";
import {QrFrequencyChart} from "./QrFrequencyChart";

export const QrWidget = () => {

    return (
        <div className={'statistic-widget qr-code'}>
            <QrFrequencyChart/>
        </div>
    );
}