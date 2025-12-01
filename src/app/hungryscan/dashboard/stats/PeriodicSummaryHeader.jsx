import React from "react";
import {setPeriod} from "../../../../slices/statisticsSlice";
import {PeriodSelectors} from "./PeriodSelectors";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";
import Select from "react-select";
import {PeriodModeSelectors} from "./PeriodModeSelectors";
import {dateStyles} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../cms/form-components/CustomNoOptionsMessage";
import {usePeriodModes} from "../../../../hooks/usePeriodModes";

export const PeriodicSummaryHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {period} = useSelector(state => state.statistics.view);
    const width = useWindowWidth();
    const isWide = width > 1300;
    const periodModes = usePeriodModes();

    return (
        <header className={'statistics-periodic-summary'}>
            <div className={'period-mode-wrapper'}>
                <span className={'summary-text'}>{t('summary')}</span>
                {isWide && <PeriodModeSelectors/>}
                {!isWide &&
                    <Select id={'period-mode'}
                            name={'period-mode'}
                            value={period}
                            placeholder={t('choose')}
                            options={periodModes}
                            onChange={(selected) => dispatch(setPeriod(selected))}
                            styles={dateStyles}
                            components={{NoOptionsMessage: CustomNoOptionsMessage}}
                    />
                }
            </div>
            <div className={'period-picker-wrapper'}>
                <PeriodSelectors/>
            </div>
        </header>
    );
}