import React from "react";
import {ResponsivePie} from '@nivo/pie'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {PieChartLegend} from "./PieChartLegend";

export const QrFrequencyChart = () => {
    const {t} = useTranslation();
    const {data} = useSelector(state => state.statistics.scanStats);
    const aggregationData = data?.pieChart
    const chartData = [
        {
            "id": "unique",
            "label": t('unique'),
            "periodDifference": aggregationData?.uniquePrevPeriodDifference,
            "value": aggregationData?.unique ?? 0,
            "color": "#016DFF"
        },
        {
            "id": "returning",
            "label": t('repeated'),
            "value": aggregationData?.repeated ?? 0,
            "periodDifference": aggregationData?.repeatedPrevPeriodDifference,
            "color": "#4C97F6"
        }
    ];
    const zeroedChart = [
        {
            "id": "zero",
            "label": t('unique'),
            "periodDifference": 0,
            "value": 1,
            "color": "#F6F6F6"
        }
    ];
    const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

    const CenteredMetric = ({centerX, centerY}) => {
        return (
            <>
                <text
                    x={centerX}
                    y={centerY - 8}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: '2rem',
                        fontWeight: '600',
                        fill: '#191D25'
                    }}>
                    {totalValue}
                </text>
                <text
                    x={centerX}
                    y={centerY + 12}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: '0.9rem',
                        fill: '#707070'
                    }}>
                    {t('scans')}
                </text>
            </>
        )
    }

    const Header = () => {
        return (
            <>
                <text
                    x={200}
                    y={50}
                    textAnchor="right"
                    dominantBaseline="central"
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        fill: '#191D25'
                    }}>
                    {t('allScans')}
                </text>
            </>
        )
    }

    const Tooltip = ({datum}) => {
        if (totalValue === 0) return null;
        return (
            <div
                style={{
                    background: 'white',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 4
                }}>
                <div>
                    <span>{datum.data?.label}<br/></span>
                    <span>{t('percent')}: {(datum.data?.value * 100) / totalValue}%<br/></span>
                    <span>{t('views')}: {datum.data?.number}<br/></span>
                </div>
            </div>
        );
    }

    return (
        <ResponsivePie
            data={totalValue === 0 ? zeroedChart : chartData}
            margin={{top: 35, right: 300, bottom: 35, left: 30}}
            sortByValue={true}
            innerRadius={0.75}
            cornerRadius={5}
            activeOuterRadiusOffset={8}
            colors={totalValue === 0 ? ['#F6F6F6'] : ['#016DFF', '#4C97F6']}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{from: 'color'}}
            enableArcLabels={false}
            arcLabelsRadiusOffset={0.45}
            arcLabelsSkipAngle={4}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            motionConfig="wobbly"
            transitionMode="startAngle"
            startAngle={-120}
            endAngle={90}
            layers={[
                'arcs',
                'arcLabels',
                'arcLinkLabels',
                'legends',
                CenteredMetric,
                Header,
                () => <PieChartLegend chartData={chartData}/>
            ]}
            tooltip={({datum}) => <Tooltip datum={datum}/>}
        />
    );
}