import React from "react";
import {ResponsiveBar} from '@nivo/bar'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {translateX} from "../../../../../../utils/translateChartsUtils";
import {ConditionalTotalsLayer} from "./ConditionalTotalsLayer";

export const BarChart = () => {
    const {t} = useTranslation();
    const {data} = useSelector(state => state.statistics.scanStats);
    const {period} = useSelector(state => state.statistics.view);
    const fallbackData = [
        {
            "x": t('januaryShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('februaryShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('marchShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('aprilShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('mayShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('juneShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('julyShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('augustShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('septemberShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('octoberShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('novemberShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        },
        {
            "x": t('decemberShort'),
            "repeatedScans": 0,
            "uniqueScans": 0,
        }
    ];
    const barChartData = data?.barChart?.map(data => {
        return {
            ...data,
            x: translateX(period.value, data.x, t)
        }
    }) ?? fallbackData;

    return (
        <div className={'qr-frequency-chart-wrapper'}>
            <div className={'qr-frequency-chart-container'}>
                <span className={'legend-left-axis-name'}>{t('quantity')}</span>
                <ResponsiveBar data={barChartData}
                               keys={['uniqueScans', 'repeatedScans']}
                               indexBy="x"
                               margin={{top: 50, right: 60, bottom: 50, left: 60}}
                               pixelRatio={1.25}
                               padding={0.25}
                               innerPadding={0}
                               minValue="auto"
                               maxValue="auto"
                               groupMode="stacked"
                               layout="vertical"
                               reverse={false}
                               valueScale={{type: 'linear'}}
                               indexScale={{type: 'band', round: true}}
                               colors={['#016DFF', '#4C97F6']}
                               colorBy="id"
                               borderWidth={0}
                               borderRadius={0}
                               borderColor={{
                                   from: 'color',
                                   modifiers: [
                                       [
                                           'darker',
                                           1.6
                                       ]
                                   ]
                               }}
                               defs={[
                                   {
                                       id: 'lines',
                                       type: 'patternLines',
                                       background: 'inherit',
                                       color: '#016DFF',
                                       rotation: -45,
                                       lineWidth: 6,
                                       spacing: 10
                                   }]}
                               fill={[
                                   {
                                       match: {
                                           id: 'scans'
                                       },
                                       id: 'lines'
                                   }]}
                               axisTop={null}
                               axisRight={null}
                               axisBottom={{
                                   tickSize: 5,
                                   tickPadding: 5,
                                   tickRotation: 0,
                                   legendOffset: 36,
                                   truncateTickAt: 0
                               }}
                               axisLeft={{
                                   tickSize: 5,
                                   tickPadding: 20,
                                   tickRotation: 0,
                                   tickValues: 5,
                                   truncateTickAt: 0
                               }}
                               enableGridX={false}
                               enableGridY={true}
                               gridYValues={5}
                               enableLabel={false}
                               enableTotals={false}
                               totalsOffset={6}
                               layers={[
                                   'grid',
                                   'axes',
                                   'bars',
                                   'markers',
                                   'legends',
                                   ConditionalTotalsLayer,
                               ]}
                               labelSkipWidth={12}
                               labelSkipHeight={12}
                               labelTextColor={{
                                   from: 'color',
                                   modifiers: [
                                       [
                                           'darker',
                                           1.6
                                       ]
                                   ]
                               }}
                               labelPosition="middle"
                               labelOffset={0}
                               isInteractive={true}
                               legends={[]}
                               theme={{
                                   grid: {
                                       line: {
                                           stroke: '#efefef'
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
                                   }
                               }}
                               tooltip={({id, value, color}) => (
                                   <div
                                       style={{
                                           background: 'white',
                                           color,
                                           padding: '8px 12px',
                                           border: '1px solid #ccc',
                                           borderRadius: 4
                                       }}>
                                       <strong>{id === 'repeatedScans' ? t('repeated') : t('unique')}: {value}</strong>
                                   </div>
                               )}
                />
            </div>
        </div>
    );
}