import React from "react";
import {MenuItemDetails} from "./MenuItemDetails";
import {Container} from "./MenuItemMobilePreview.style";
import {PriceFooter} from "./PriceFooter";

export const MenuItemMobilePreview = ({image}) => {
    return (
        <Container>
            <MenuItemDetails image={image}/>
            <PriceFooter/>
        </Container>
    );
}