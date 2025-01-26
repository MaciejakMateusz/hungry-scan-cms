import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    setChosenDay,
    setChosenMonth,
    setChosenWeek,
    setChosenYear,
    setInitialMonth,
    setInitialWeek,
    setInitialYear,
    setPeriod,
} from "../../../../slices/statisticsSlice";
import {DateService} from "../../../../utils/DateService";
import Select from "react-select";
import {dateStyles} from "../../../../styles";
import {CustomNoOptionsMessage} from "../../cms/form-components/CustomNoOptionsMessage";
import DatePicker, {registerLocale} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import {getLanguage} from "../../../../locales/langUtils";


export const Statistics = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        period, 
        initialYear,
        chosenYear,
        initialMonth,
        chosenMonth,
        initialWeek,
        chosenWeek,
        chosenDay,
        restaurant
    } = useSelector(state => state.statistics.view);
    const restaurantCreation = new Date(restaurant.created);

    useEffect(() => {
        if('pl' === getLanguage()) {
            registerLocale('pl', pl);
        }
        dispatch(setInitialYear({
            value: new Date().getFullYear(),
            label: new Date().getFullYear()
        }));
        dispatch(setInitialMonth({
            value: new Date().getMonth() + 1,
            label: DateService.getMonth(new Date().getMonth() + 1, t)
        }));
        dispatch(setInitialWeek({
            value: DateService.getISOWeekNumber(),
            label: `${DateService.getISOWeekNumber()} ${t('week')}`
        }));
        dispatch(setChosenDay(new Date().toISOString()));
        dispatch(setPeriod('month'));
    }, [dispatch, t]);

    const renderPeriodButton = () => {
        switch (period) {
            case 'year':
                return (
                    <Select id={'period-year'}
                            name={'period-year'}
                            value={chosenYear}
                            placeholder={t('choose')}
                            options={DateService.getYearsCollection(restaurantCreation?.getFullYear())}
                            defaultValue={initialYear}
                            onChange={(selected) => dispatch(setChosenYear(selected))}
                            styles={dateStyles}
                            components={{NoOptionsMessage: CustomNoOptionsMessage}}
                    />
                );
            case 'month':
                return (
                    <>
                        <Select id={'period-month'}
                                name={'period-month'}
                                value={chosenMonth}
                                placeholder={t('choose')}
                                options={DateService.getMonthsCollection(chosenYear, t)}
                                defaultValue={chosenMonth}
                                onChange={(selected) => dispatch(setChosenMonth(selected))}
                                styles={dateStyles}
                                components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        />
                        <Select id={'period-year-month'}
                                name={'period-year-month'}
                                value={chosenYear}
                                placeholder={t('choose')}
                                options={DateService.getYearsCollection(restaurantCreation?.getFullYear())}
                                defaultValue={initialYear}
                                onChange={(selected) => dispatch(setChosenYear(selected))}
                                styles={dateStyles}
                                components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        />
                    </>
                );
            case 'week':
                return (
                    <>
                        <Select id={'period-week'}
                                name={'period-week'}
                                value={chosenWeek}
                                placeholder={t('choose')}
                                options={DateService.getWeeksCollection(chosenYear, t)}
                                defaultValue={initialWeek}
                                onChange={(selected) => dispatch(setChosenWeek(selected))}
                                styles={dateStyles}
                                components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        />
                        <Select id={'period-year-week'}
                                name={'period-year-week'}
                                value={chosenYear}
                                placeholder={t('choose')}
                                options={DateService.getYearsCollection(restaurantCreation?.getFullYear())}
                                defaultValue={initialYear}
                                onChange={(selected) => dispatch(setChosenYear(selected))}
                                styles={dateStyles}
                                components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        />
                    </>
                );
            case 'day':
                return (<DatePicker selected={new Date(chosenDay)}
                                    onChange={(date) => dispatch(setChosenDay(date.toISOString()))}
                                    locale={getLanguage() === 'pl' ? 'pl' : 'en'}
                                    dateFormat="d MMMM yyyy"
                                    className="datepicker-custom-input"
                                    calendarClassName="datepicker-custom-calendar"
                                    popperClassName="datepicker-custom-popper"
                                    maxDate={new Date()}
                                    minDate={new Date(restaurantCreation)}
                    />
                );

            default:
                return (
                    <Select id={'period-month'}
                            name={'period-month'}
                            value={chosenMonth}
                            placeholder={t('choose')}
                            options={DateService.getMonthsCollection(chosenYear, t)}
                            defaultValue={initialMonth}
                            onChange={(selected) => dispatch(setChosenMonth(selected))}
                            styles={dateStyles}
                            components={{NoOptionsMessage: CustomNoOptionsMessage}}
                    />
                );
        }
    }

    return (
        <div className={'statistics-content'}>
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
                    {renderPeriodButton()}
                </div>
            </header>
            <div className={'statistics-grid'}>
                <div>QR Code block</div>
                <div>QR frequency block</div>
                <div>Package block</div>
                <div>Popular dishes block</div>
            </div>
        </div>
    );
}