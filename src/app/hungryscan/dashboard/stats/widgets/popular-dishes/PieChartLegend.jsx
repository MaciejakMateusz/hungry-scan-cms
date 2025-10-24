import React from "react";
import {Icon, IconLabelWrapper, Label, LegendContainer, Value, Position} from "./PieChartLegend.style";

export const PieChartLegend = ({chartData}) => {

    if (!chartData) return null;

    return (
        <foreignObject x={262} y={60} width={300} height={200}>
            <div xmlns="http://www.w3.org/1999/xhtml">
                <LegendContainer>
                    {chartData.map(d => (
                        <Position key={d.id}>
                            <IconLabelWrapper>
                                <Icon $color={d.color}/>
                                <Label>{d.label}</Label>
                            </IconLabelWrapper>
                            <Value>{d.number}</Value>
                        </Position>
                    ))}
                </LegendContainer>
            </div>
        </foreignObject>
    );
}