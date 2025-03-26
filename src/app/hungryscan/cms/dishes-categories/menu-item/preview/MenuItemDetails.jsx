import React from "react";
import {ImageSection} from "./ImageSection";
import {DataSection} from "./DataSection";
import {PriceFooter} from "./PriceFooter";

export const MenuItemDetails = () => {

    return (
        <>
            <div className={'menu-item-details-container'}>
                <ImageSection/>
                <DataSection/>
            </div>
            <PriceFooter/>
        </>
    );
}