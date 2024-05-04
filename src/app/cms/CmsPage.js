import React from "react";
import {DateTime} from "../restaurant/DateTime";
import {CmsNavMenu} from "./CmsNavMenu";
import {MainList} from "./MainList";
import {BottomButtons} from "./BottomButtons";

export const CmsPage = () => {

    return (
        <>
            <div className="global-container">
                <div className="global-cms-grid-container">
                    <DateTime/>
                    <CmsNavMenu/>
                    <MainList/>
                    <BottomButtons/>
                </div>
            </div>
        </>
    );
}
