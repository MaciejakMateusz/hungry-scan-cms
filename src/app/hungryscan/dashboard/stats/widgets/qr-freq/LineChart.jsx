import React from "react";
import {ResponsiveLine} from "@nivo/line";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {translateX} from "../../../../../../utils/translateChartsUtils";

export const  LineChart = () => {
    const {t} = useTranslation();
    const {data} = useSelector(state => state.statistics.scanStats);
    const {period} = useSelector(state => state.statistics.view);
    const fallbackData = [
        {
            "id": "uniqueScans",
            "color": "#016DFF",
            "data": [
                {
                    "x": t('januaryShort'),
                    "y": 0
                },
                {
                    "x": t('februaryShort'),
                    "y": 0
                },
                {
                    "x": t('marchShort'),
                    "y": 0
                },
                {
                    "x": t('aprilShort'),
                    "y": 0
                },
                {
                    "x": t('mayShort'),
                    "y": 0
                },
                {
                    "x": t('juneShort'),
                    "y": 0
                },
                {
                    "x": t('julyShort'),
                    "y": 0
                },
                {
                    "x": t('augustShort'),
                    "y": 0
                },
                {
                    "x": t('septemberShort'),
                    "y": 0
                },
                {
                    "x": t('octoberShort'),
                    "y": 0
                },
                {
                    "x": t('novemberShort'),
                    "y": 0
                },
                {
                    "x": t('decemberShort'),
                    "y": 0
                }
            ]
        },
        {
            "id": "repeatedScans",
            "color": "#87CFFF",
            "data": [
                {
                    "x": t('januaryShort'),
                    "y": 0
                },
                {
                    "x": t('februaryShort'),
                    "y": 0
                },
                {
                    "x": t('marchShort'),
                    "y": 0
                },
                {
                    "x": t('aprilShort'),
                    "y": 0
                },
                {
                    "x": t('mayShort'),
                    "y": 0
                },
                {
                    "x": t('juneShort'),
                    "y": 0
                },
                {
                    "x": t('julyShort'),
                    "y": 0
                },
                {
                    "x": t('augustShort'),
                    "y": 0
                },
                {
                    "x": t('septemberShort'),
                    "y": 0
                },
                {
                    "x": t('octoberShort'),
                    "y": 0
                },
                {
                    "x": t('novemberShort'),
                    "y": 0
                },
                {
                    "x": t('decemberShort'),
                    "y": 0
                }
            ]
        }
    ];
    const lineChartData = data?.lineChart?.map(item => {
        return {
            ...item,
            data: item.data.map(point => ({
                x: translateX(period, point.x, t),
                y: point.y
            }))
        }
    }) ?? fallbackData;

    return (
        <div className={'qr-frequency-chart-container line'}>
            <span className={'legend-left-axis-name'}>{t('quantity')}</span>
            <ResponsiveLine
                data={lineChartData}
                colors={['#016DFF', '#4C97F6']}
                margin={{top: 50, right: 50, bottom: 50, left: 60}}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                curve="linear"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 20,
                    tickValues: 5,
                    tickRotation: 0,
                    truncateTickAt: 0
                }}
                enableGridX={false}
                enableGridY={true}
                gridYValues={5}
                enablePoints={true}
                pointSize={6}
                pointColor={{from: 'color', modifiers: []}}
                pointBorderColor={{theme: 'background'}}
                pointLabel="data.y"
                pointLabelYOffset={-12}
                crosshairType="x"
                useMesh={true}
                legends={[]}
                theme={{
                    grid: {
                        line: {
                            stroke: '#EFEFEF'
                        }
                    },
                    text: {
                        fontFamily: 'Lexend, sans-serif'
                    },
                    annotations: {
                        text: {
                            fontFamily: 'Lexend, sans-serif',
                        }
                    },
                    axis: {
                        ticks: {
                            line: {
                                strokeWidth: '0'
                            },
                            text: {
                                fill: '#93939E'
                            }
                        }
                    },
                    crosshair: {
                        line: {
                            stroke: '#93939E',
                        }
                    }
                }}
                enableSlices={'x'}
                sliceTooltip={({slice}) => {
                    return (
                        <div style={{
                            background: 'white',
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            padding: '8px 12px'
                        }}>
                            {slice.points.map(point => (
                                <div key={point.id} style={{color: point.serieColor}}>
                                    <strong>
                                        {point.serieId === 'uniqueScans'
                                            ? t('unique')
                                            : t('repeated')
                                        }: {point.data.y}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    )
                }}
            />
        </div>
    );
}