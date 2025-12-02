import React from "react";
import {Button, ButtonContainer} from "./NavButtonMobile.style";
import {BurgerIcon} from "../icons/BurgerIcon";

export const NavButtonMobile = ({onClick}) => {

    return (
        <ButtonContainer onClick={onClick}>
            <Button>
                <BurgerIcon fill={'#FFF'}/>
            </Button>
        </ButtonContainer>
    );
}