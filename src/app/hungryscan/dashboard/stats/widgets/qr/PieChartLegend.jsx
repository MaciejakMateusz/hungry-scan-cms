import React from "react";
import {
    LegendContainer,
    RepeatedScanDifference,
    RepeatedScanIcon,
    RepeatedScanIconContainer,
    RepeatedScanLabel,
    RepeatedScanValue,
    RepeatedValuesWrapper,
    UniqueScanDifference,
    UniqueScanIcon,
    UniqueScanIconContainer,
    UniqueScanLabel,
    UniqueScanValue,
    UniqueValuesWrapper
} from "./PieChartLegend.style";

export const PieChartLegend = ({chartData}) => {

    const renderUniqueScanDifference = periodDifference => {
        const isPositive = periodDifference >= 0;
        return (
            <UniqueScanDifference $isPositive={isPositive}>
                {isPositive ? '+' : ''}{parseFloat(periodDifference).toFixed(0)}%
            </UniqueScanDifference>
        );
    }

    const renderRepeatedScanDifference = periodDifference => {
        const isPositive = periodDifference >= 0;
        return (
            <RepeatedScanDifference $isPositive={isPositive}>
                {isPositive ? '+' : ''}{parseFloat(periodDifference).toFixed(0)}%
            </RepeatedScanDifference>
        );
    }

    return (
        <foreignObject x={200} y={85} width={200} height={50}>
            <div xmlns="http://www.w3.org/1999/xhtml">
                <LegendContainer>
                    <UniqueScanIconContainer><UniqueScanIcon/></UniqueScanIconContainer>
                    <RepeatedScanIconContainer><RepeatedScanIcon/></RepeatedScanIconContainer>
                    <UniqueScanLabel>{chartData[0].label}</UniqueScanLabel>
                    <RepeatedScanLabel>{chartData[1].label}</RepeatedScanLabel>
                    <UniqueValuesWrapper>
                        <UniqueScanValue>{chartData[0].value}</UniqueScanValue>
                        {renderUniqueScanDifference(chartData[0].periodDifference)}
                    </UniqueValuesWrapper>
                    <RepeatedValuesWrapper>
                        <RepeatedScanValue>{chartData[1].value}</RepeatedScanValue>
                        {renderRepeatedScanDifference(chartData[1].periodDifference)}
                    </RepeatedValuesWrapper>
                </LegendContainer>
            </div>
        </foreignObject>
    );
}