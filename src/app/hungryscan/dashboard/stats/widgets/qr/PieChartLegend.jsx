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
import {Tooltip} from "../../../../cms/dishes-categories/menu-item/preview/menu-item-details/Tooltip";
import {useTranslation} from "react-i18next";

export const PieChartLegend = ({chartData}) => {
    const {t} = useTranslation();

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
                    <UniqueScanIconContainer>
                        <UniqueScanIcon/>
                    </UniqueScanIconContainer>
                    <RepeatedScanIconContainer>
                        <RepeatedScanIcon/>
                    </RepeatedScanIconContainer>
                    <UniqueScanLabel>
                        <span>{chartData[0].label}</span>
                    </UniqueScanLabel>
                    <RepeatedScanLabel>
                        <span>{chartData[1].label}</span>
                    </RepeatedScanLabel>
                    <UniqueValuesWrapper>
                        <UniqueScanValue>{chartData[0].value}</UniqueScanValue>
                        <Tooltip content={t('uniqueScansMetricInfo')}>
                            {renderUniqueScanDifference(chartData[0].periodDifference)}
                        </Tooltip>
                    </UniqueValuesWrapper>
                    <RepeatedValuesWrapper>
                        <RepeatedScanValue>{chartData[1].value}</RepeatedScanValue>
                        <Tooltip content={t('repeatedScansMetricInfo')}>
                            {renderRepeatedScanDifference(chartData[1].periodDifference)}
                        </Tooltip>
                    </RepeatedValuesWrapper>
                </LegendContainer>
            </div>
        </foreignObject>
    );
}