import React from "react";
import {ResponsivePie} from '@nivo/pie'
import {useTranslation} from "react-i18next";

export const PieChart = () => {
    const {t} = useTranslation();
    const fallbackData = [
        {
            "id": "first",
            "label": "Kaczka w pomarańczach z ziemniakami",
            "value": 384,
            "color": "#016DFF"
        },
        {
            "id": "second",
            "label": "Placek po węgiersku",
            "value": 320,
            "color": "#8CCB44"
        },
        {
            "id": "third",
            "label": "Placki ziemniaczane w sosie kurkowym",
            "value": 250,
            "color": "#FFCE4A"
        },
        {
            "id": "fourth",
            "label": "Polędwiczki wieprzowe w sosie chrzanowym",
            "value": 200,
            "color": "#FE6663"
        },
        {
            "id": "fifth",
            "label": "Krem z pomidorów",
            "value": 100,
            "color": "#9746FF"
        }
    ];
    const totalValue = fallbackData.reduce((sum, item) => sum + item.value, 0);
    const fallbackPieChartData = fallbackData.map(item => {
        const percentage = (item.value * 100) / totalValue;
        return {
            ...item,
            value:  parseFloat(percentage.toFixed(2)),
            number: item.value
        };
    });

    const CenteredMetric = ({centerX, centerY}) => {
        return (
            <>
                <text
                    x={centerX}
                    y={centerY}
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
                    y={centerY + 20}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: '0.9rem',
                        fill: '#707070'
                    }}>
                    {t('views')}
                </text>
            </>
        )
    }

    const Header = () => {
        return (
            <>
                <text
                    x={315}
                    y={15}
                    textAnchor="right"
                    dominantBaseline="central"
                    style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        fill: '#191D25'
                    }}>
                    {t('mostViewedPositions')}
                </text>
            </>
        )
    }

    return (
        <ResponsivePie
            data={fallbackPieChartData}
            margin={{top: 35, right: 350, bottom: 35, left: 0}}
            sortByValue={true}
            innerRadius={0.75}
            cornerRadius={5}
            activeOuterRadiusOffset={8}
            colors={['#016DFF', '#6EC191', '#FFCE4A', '#FE6663', '#9746FF']}
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
            layers={[
                'arcs',
                'arcLabels',
                'arcLinkLabels',
                'legends',
                CenteredMetric,
                Header
            ]}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 75,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 105,
                    itemHeight: 25,
                    itemTextColor: '#1F242D',
                    itemDirection: 'left-to-right',
                    symbolSize: 10,
                    symbolShape: 'circle',
                },
            ]}
            tooltip={({datum}) => (
                <div
                    style={{
                        background: 'white',
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: 4
                    }}>
                    <div>
                        <span>{datum.data?.label}<br/></span>
                        <span>{t('percent')}: {datum.data?.value}%<br/></span>
                        <span>{t('views')}: {datum.data?.number}<br/></span>
                    </div>

                </div>
            )}
        />
    );
}