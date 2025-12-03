import React from "react";
import {setPreviewActive} from "../../../../slices/globalParamsSlice";
import {useDispatch} from "react-redux";
import {Container} from "./ClosePreviewButton.style";
import {ArrowRightIcon} from "../../../icons/ArrowRightIcon";

export const ClosePreviewButton = () => {
    const dispatch = useDispatch();

    return (
        <Container onClick={() => dispatch(setPreviewActive(false))}>
            <ArrowRightIcon/>
        </Container>
    );
}