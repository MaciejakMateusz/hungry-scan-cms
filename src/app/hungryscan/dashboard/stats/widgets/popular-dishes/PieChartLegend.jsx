import React from "react";
import {Icon, IconLabelWrapper, Label, LegendContainer, Value, Position} from "./PieChartLegend.style";
import {useWindowWidth} from "../../../../../../hooks/useWindowWidth";

export const PieChartLegend = ({chartData}) => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 730;

    const mobileStyles = {
        padding: "40px 30px 20px 50px",
    };

    if (!chartData) return null;

    return (
        <LegendContainer style={isMobile ? mobileStyles : {}}>
            {chartData.map((d) => (
                <Position key={d.id}>
                    <IconLabelWrapper>
                        <Icon $color={d.color}/>
                        <Label>{d.label}</Label>
                    </IconLabelWrapper>
                    <Value>{d.number}</Value>
                </Position>
            ))}
        </LegendContainer>
    );
};