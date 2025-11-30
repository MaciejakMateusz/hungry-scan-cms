import React from "react";
import {Button, ButtonContainer} from "./NavButtonMobile.style";
import {ThreeDotsIcon} from "../icons/ThreeDotsIcon";

export const NavButtonMobile = ({onClick}) => {

    return (
        <ButtonContainer onClick={onClick}>
            <Button>
                <ThreeDotsIcon fill={'#FFF'}/>
            </Button>
        </ButtonContainer>
    );
}