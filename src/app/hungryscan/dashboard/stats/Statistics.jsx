import React from "react";
import {Widgets} from "./widgets/Widgets";
import {PeriodicSummary} from "./PeriodicSummary";

export const Statistics = () => {
    return (
        <div className={'statistics-content'}>
            <PeriodicSummary/>
            <Widgets/>
        </div>
    );
}