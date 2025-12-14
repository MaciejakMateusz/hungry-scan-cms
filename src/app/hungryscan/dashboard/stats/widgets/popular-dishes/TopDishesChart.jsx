import React from "react";
import {ResponsivePie} from "@nivo/pie";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {PieChartLegend} from "./PieChartLegend";
import {useGetTranslation} from "../../../../../../hooks/useGetTranslation";
import {useWindowWidth} from "../../../../../../hooks/useWindowWidth";
import {PopularDishesMenuSelector} from "./PopularDishesMenuSelector";

export const TopDishesChart = () => {
    const {t} = useTranslation();
    const getTranslation = useGetTranslation();
    const {data} = useSelector(state => state.statistics.popularItemsStats);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 730;

    const fallbackData = [
        {
            id: 'zero',
            label: t('noAvailableData'),
            value: 1,
            color: '#F6F6F6',
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

    const nivoColors =
        totalValue === 0
            ? ['#F6F6F6']
            : ['#016DFF', '#6EC191', '#FFCE4A', '#FE6663', '#8540DD'];

    const dataForChart = totalValue === 0 ? fallbackData : chartData;

    const mobileLegendItems = dataForChart.map((item, index) => ({
        id: item.id,
        label: item.label,
        value: totalValue !== 0 ? item.value : null,
        number: item.number,
        color: nivoColors[index % nivoColors.length],
    }));

    const CenteredMetric = ({centerX, centerY}) => {
        return (
            <>
                <text
                    x={centerX}
                    y={centerY - 7}
                    textAnchor='middle'
                    dominantBaseline='central'
                    style={{
                        fontSize: '2rem',
                        fontWeight: '600',
                        fill: "#191D25",
                    }}>
                    {totalValue}
                </text>
                <text
                    x={centerX}
                    y={centerY + 13}
                    textAnchor='middle'
                    dominantBaseline='central'
                    style={{
                        fontSize: '0.9rem',
                        fill: '#707070'
                    }}>
                    {t('views')}
                </text>
            </>
        );
    };

    const Header = () => (
        <text
            x={240}
            y={20}
            textAnchor='right'
            dominantBaseline='central'
            style={{
                fontSize: '1.1rem',
                fontWeight: '500',
                fill: '#191D25',
            }}
        >
            {t('mostViewedPositions')}
        </text>
    );

    const Tooltip = ({datum}) => {
        if (totalValue === 0) return null;
        return (
            <div
                style={{
                    background: 'white',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                }}>
                <div>
                    <span>
                        {datum.data?.label}
                        <br/>
                    </span>
                    <span>
                        {t('percent')}: {datum.data?.value}%<br/>
                    </span>
                    <span>
                        {t('views')}: {datum.data?.number}
                        <br/>
                    </span>
                </div>
            </div>
        );
    };

    const desktopLayers = [
        "arcs",
        "arcLabels",
        "arcLinkLabels",
        "legends",
        CenteredMetric,
        Header,
        props => {
            const items = props.dataWithArc.map(d => ({
                id: d.id,
                label: d.data.label,
                value: totalValue !== 0 ? d.data.value : null,
                number: d.data.number,
                color: d.color,
            }));
            return (
                <foreignObject x={242} y={60} width={300} height={200}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <PieChartLegend chartData={items}/>
                    </div>
                </foreignObject>
            );
        }
    ];

    const mobileLayers = ["arcs", "arcLabels", "arcLinkLabels", CenteredMetric];

    return (
        <div style={{maxWidth: '700px'}}>
            <div style={{width: '100%', height: '240px'}}>
                {isMobile && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        padding: '20px 0',
                        fontWeight: 500,
                        color: '#191D25',
                    }}>
                        <div className={'flex-centered relative-container'}>
                            {t('mostViewedPositions')}
                            <PopularDishesMenuSelector top={'25px'}/>
                        </div>
                    </div>
                )}

                <ResponsivePie
                    data={dataForChart}
                    margin={
                        isMobile
                            ? {top: 35, right: 20, bottom: 35, left: 20}
                            : {top: 35, right: 450, bottom: 35, left: 0}
                    }
                    sortByValue={true}
                    innerRadius={0.75}
                    cornerRadius={5}
                    activeOuterRadiusOffset={8}
                    colors={nivoColors}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor='#333333'
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{from: 'color'}}
                    enableArcLabels={false}
                    arcLabelsRadiusOffset={0.45}
                    arcLabelsSkipAngle={4}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 2]],
                    }}
                    motionConfig='wobbly'
                    transitionMode='startAngle'
                    layers={isMobile ? mobileLayers : desktopLayers}
                    tooltip={({datum}) => <Tooltip datum={datum}/>}
                />
            </div>
            {isMobile && <PieChartLegend chartData={mobileLegendItems}/>}
        </div>
    );
};
