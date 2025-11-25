import React from "react";
import {Container, PositionPrice, PositionText} from "./MenuItemDetailsPosition.style";

export const MenuItemDetailsPosition = ({name, price}) => {
    return (
        <Container>
            <PositionText>{name}</PositionText>
            <PositionPrice>{price}</PositionPrice>
        </Container>
    );
}