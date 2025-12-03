import React, {useState} from "react";
import {BarChart} from "./BarChart";
import {useTranslation} from "react-i18next";
import {LineChart} from "./LineChart";
import Select from "react-select";
import {chartStyles} from "../../../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../../../cms/form-components/CustomNoOptionsMessage";

export const QrFrequencyWidget = () => {
    const {t} = useTranslation();
    const charts = [{value: 'bar', label: t('barChart')}, {value: 'line', label: t('lineChart')},]
    const [chosenChart, setChosenChart] = useState(charts[0]);

    const renderChart = () => {
        if (chosenChart.value === 'line') {
            return <LineChart/>
        }
        return <BarChart/>
    }

    return (
        <div className={'statistic-widget qr-frequency'}>
            <div className={'qr-frequency-grid'}>
                <div className={'qr-frequency-header-wrapper'}>
                    <div className={'qr-frequency-header'}>
                        <p className={'scan-frequency-p'}>{t('scanFrequency')}</p>
                        <span className={'scan-frequency-span'}>{t('qrCode')}</span>
                        <div className={'widget-mode-selector'}>
                            <Select id={'chart-selector'}
                                    name={'chart-selector'}
                                    value={chosenChart}
                                    placeholder={t('choose')}
                                    options={charts}
                                    defaultValue={charts[0]}
                                    onChange={(selected) => setChosenChart(selected)}
                                    styles={chartStyles}
                                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                                    isSearchable={false}/>
                        </div>
                    </div>
                </div>
                {renderChart()}
            </div>
        </div>
    );
}