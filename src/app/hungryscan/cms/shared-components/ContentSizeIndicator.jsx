import React from "react";
import {IndicatorContainer} from "./ContentSizeIndicator.style";

export const ContentSizeIndicator = ({size}) => {
    return (
        <IndicatorContainer>
            {size}
        </IndicatorContainer>
    );
}