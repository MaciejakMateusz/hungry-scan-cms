import React from "react";
import {setPeriod} from "../../../../slices/statisticsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {usePeriodModes} from "../../../../hooks/usePeriodModes";

export const PeriodModeSelectors = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {period} = useSelector(state => state.statistics.view);
    const periodModes = usePeriodModes();

    return (
        <>
            <div className={`period-button ${period?.value === 'year' ? 'active' : ''}`}
                 onClick={() => dispatch(setPeriod(periodModes[0]))}>
                {t('year')}
            </div>
            <div className={`period-button ${period?.value === 'month' ? 'active' : ''}`}
                 onClick={() => dispatch(setPeriod(periodModes[1]))}>
                {t('month')}
            </div>
            <div className={`period-button ${period?.value === 'week' ? 'active' : ''}`}
                 onClick={() => dispatch(setPeriod(periodModes[2]))}>
                {t('week')}
            </div>
            <div className={`period-button ${period?.value === 'day' ? 'active' : ''}`}
                 onClick={() => dispatch(setPeriod(periodModes[3]))}>
                {t('day')}
            </div>
        </>
    );
}