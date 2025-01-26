import React, {useEffect} from "react";
import Select from "react-select";
import {DateService} from "../../../../utils/DateService";
import {
    setChosenDay,
    setChosenMonth,
    setChosenWeek,
    setChosenYear, setInitialMonth, setInitialWeek,
    setInitialYear, setPeriod
} from "../../../../slices/statisticsSlice";
import {dateStyles} from "../../../../styles";
import {CustomNoOptionsMessage} from "../../cms/form-components/CustomNoOptionsMessage";
import DatePicker, {registerLocale} from "react-datepicker";
import {getLanguage} from "../../../../locales/langUtils";
import pl from "date-fns/locale/pl";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import 'react-datepicker/dist/react-datepicker.css';

export const PeriodSelectors = () => {
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

    const renderPeriodSelector = () => {
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

    return renderPeriodSelector();
}