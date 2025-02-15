import React from "react";
import {setPeriod} from "../../../../slices/statisticsSlice";
import {PeriodSelectors} from "./PeriodSelectors";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

export const PeriodicSummary = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {period} = useSelector(state => state.statistics.view);

    return (
        <header className={'statistics-periodic-summary'}>
            <div className={'period-mode-wrapper'}>
                <span className={'summary-text'}>{t('summary')}</span>
                <div className={`period-button ${period === 'year' ? 'active' : ''}`}
                     onClick={() => dispatch(setPeriod('year'))}>
                    {t('year')}
                </div>
                <div className={`period-button ${period === 'month' ? 'active' : ''}`}
                     onClick={() => dispatch(setPeriod('month'))}>
                    {t('month')}
                </div>
                <div className={`period-button ${period === 'week' ? 'active' : ''}`}
                     onClick={() => dispatch(setPeriod('week'))}>
                    {t('week')}
                </div>
                <div className={`period-button ${period === 'day' ? 'active' : ''}`}
                     onClick={() => dispatch(setPeriod('day'))}>
                    {t('day')}
                </div>
            </div>
            <div className={'period-picker-wrapper'}>
                <PeriodSelectors/>
            </div>
        </header>
    );
}