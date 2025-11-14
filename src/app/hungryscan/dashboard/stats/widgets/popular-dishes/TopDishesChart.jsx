import React from "react";
import {ResponsivePie} from '@nivo/pie'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {PieChartLegend} from "./PieChartLegend";
import {useGetTranslation} from "../../../../../../hooks/useGetTranslation";

export const TopDishesChart = () => {
    const {t} = useTranslation();
    const getTranslation = useGetTranslation();
    const {data} = useSelector(state => state.statistics.popularItemsStats);
    const fallbackData = [
        {
            "id": "zero",
            "label": t('noAvailableData'),
            "value": 1,
            "color": "#B5B5B5"
        }
    ];
    const totalValue = data?.reduce((sum, item) => sum + item.viewsCount, 0);
    const chartData = [...(data || [])]
        .sort((a, b) => b.viewsCount - a.viewsCount)
        .slice(0, 5)
        .map(item => {
            const percentage = (item.viewsCount * 100) / totalValue;
            return {
                ...item,
                label: `${getTranslation(item.name)}`,
                value: parseFloat(percentage.toFixed(2)),
                number: item.viewsCount
            };
        });

    const CenteredMetric = ({centerX, centerY}) => {
        return (
            <>
                <text
                    x={centerX}
                    y={centerY - 7}
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
                    y={centerY + 13}
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
                    x={260}
                    y={10}
                    textAnchor="right"
                    dominantBaseline="central"
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        fill: '#191D25'
                    }}>
                    {t('mostViewedPositions')}
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
                    <span>{t('percent')}: {datum.data?.value}%<br/></span>
                    <span>{t('views')}: {datum.data?.number}<br/></span>
                </div>
            </div>
        );
    }

    return (
        <ResponsivePie
            data={totalValue === 0 ? fallbackData : chartData}
            margin={{top: 35, right: 450, bottom: 35, left: 0}}
            sortByValue={true}
            innerRadius={0.75}
            cornerRadius={5}
            activeOuterRadiusOffset={8}
            colors={totalValue === 0 ? ['#B5B5B5'] : ['#016DFF', '#6EC191', '#FFCE4A', '#FE6663', '#9746FF']}
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
                Header,
                (props) => {
                    const items = props.dataWithArc.map(d => ({
                        id: d.id,
                        label: d.data.label,
                        value: totalValue !== 0 && d.data.value,
                        number: d.data.number,
                        color: d.color,
                    }));
                    return <PieChartLegend chartData={items} />;
                }
            ]}
            tooltip={({datum}) => <Tooltip datum={datum}/>}
        />
    );
}