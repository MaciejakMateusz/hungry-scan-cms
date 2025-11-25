import React, {useEffect} from "react";
import {ImageSection} from "./ImageSection.jsx";
import {DataSection} from "./DataSection.jsx";
import {Container} from "./MenuItemDetails.style";

export const MenuItemDetails = ({image}) => {

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <Container>
            <ImageSection image={image}/>
            <DataSection image={image}/>
        </Container>
    );
}