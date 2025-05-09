import React from "react";
import {ImageSection} from "./ImageSection";
import {DataSection} from "./DataSection";
import {PriceFooter} from "./PriceFooter";

export const MenuItemDetails = ({image}) => {

    return (
        <>
            <div className={'menu-item-details-container'}>
                <ImageSection image={image}/>
                <DataSection/>
            </div>
            <PriceFooter/>
        </>
    );
}