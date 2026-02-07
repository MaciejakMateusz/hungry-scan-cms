import React, {useCallback, useEffect, useState} from "react";
import Select from "react-select";
import {DateService} from "../../../../utils/DateService";
import {
    getScanStats,
    setChosenDay,
    setChosenMonth,
    setChosenWeek,
    setChosenYear,
    setPeriodData
} from "../../../../slices/statisticsSlice";
import {dateStyles} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../cms/form-components/CustomNoOptionsMessage";
import DatePicker, {registerLocale} from "react-datepicker";
import {getLanguage} from "../../../../locales/langUtils";
import pl from "date-fns/locale/pl";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import 'react-datepicker/dist/react-datepicker.css';
import debounce from "lodash/debounce";

export const PeriodSelectors = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        period: periodObject,
        initialYear, chosenYear,
        initialMonth, chosenMonth,
        chosenWeek, chosenDay
    } = useSelector(state => state.statistics.view);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const [restaurantCreation, setRestaurantCreation] = useState(new Date());
    const period = periodObject?.value;

    const fetchStatistics = () => {
        if (!period) return;
        if (period === "year" && !chosenYear) return;
        if (period === "month" && (!chosenYear || !chosenMonth)) return;
        if (period === "week" && (!chosenYear || !chosenWeek)) return;
        if (period === "day" && !chosenDay) return;
        const params = {
            year: chosenYear,
            month: chosenMonth,
            week: chosenWeek,
            day: chosenDay,
        };
        dispatch(getScanStats({period, params}));
    };

    const debouncedFetchStatistics = useCallback(
        debounce(() => {
            if (
                (period === "year" && chosenYear) ||
                (period === "month" && chosenYear && chosenMonth) ||
                (period === "week" && chosenYear && chosenWeek) ||
                (period === "day" && chosenDay)
            ) {
                fetchStatistics();
            }
        }, 150), [period, chosenYear, chosenMonth, chosenWeek, chosenDay]
    );

    useEffect(() => {
        debouncedFetchStatistics();
        return () => debouncedFetchStatistics.cancel();
    }, [chosenYear, chosenMonth, chosenWeek, chosenDay, period, debouncedFetchStatistics]);

    useEffect(() => {
        if ('pl' === getLanguage()) {
            registerLocale('pl', pl);
        }
        setRestaurantCreation(restaurant ? new Date(restaurant.value.created) : new Date());
        dispatch(setPeriodData({
            chosenYear: {
                value: new Date().getFullYear(),
                label: new Date().getFullYear()
            },
            chosenMonth: {
                value: new Date().getMonth() + 1,
                label: DateService.getMonth(new Date().getMonth() + 1, t)
            },
            chosenWeek: {
                value: DateService.getCurrentWeekNumber(),
                label: `${DateService.getCurrentWeekNumber()} ${t('week')}`
            },
            chosenDay: new Date().toISOString(),
            period: {value: 'month', label: t('month')}
        }));
    }, [dispatch, restaurant, t]);

    useEffect(() => {
        if (period !== 'week' || !chosenYear) return;

        const options = DateService.getWeeksCollection(restaurantCreation, chosenYear, t);
        const currentWeek = DateService.getCurrentWeekNumber();

        const currentWeekOption = options.find(o => o.value === currentWeek);
        const chosenStillValid = chosenWeek && options.some(o => o.value === chosenWeek.value);

        if (!chosenStillValid) {
            dispatch(setChosenWeek(currentWeekOption ?? options[0]));
        }
    }, [period, chosenYear, restaurantCreation, t, chosenWeek, dispatch]);

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
                            isSearchable={false}
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
                                options={DateService.getMonthsCollection(restaurantCreation, chosenYear, t)}
                                onChange={(selected) => dispatch(setChosenMonth(selected))}
                                styles={dateStyles}
                                isSearchable={false}
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
                                isSearchable={false}
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
                                options={DateService.getWeeksCollection(restaurantCreation, chosenYear, t)}
                                onChange={(selected) => dispatch(setChosenWeek(selected))}
                                styles={dateStyles}
                                isSearchable={false}
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
                                isSearchable={false}
                                components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        />
                    </>
                );
            case 'day':
                return (<DatePicker selected={new Date(chosenDay)}
                                    onChange={(date) => dispatch(setChosenDay(date.toISOString()))}
                                    locale={getLanguage() === 'pl' ? 'pl' : 'en'}
                                    dateFormat="d MMMM yyyy"
                                    className={'datepicker-custom-input'}
                                    calendarClassName={'datepicker-custom-calendar'}
                                    popperClassName={'datepicker-custom-popper'}
                                    maxDate={new Date()}
                                    minDate={restaurantCreation}
                                    showMonthYearDropdown={false}
                    />
                );
            default:
                return (
                    <Select id={'period-month'}
                            name={'period-month'}
                            value={chosenMonth}
                            placeholder={t('choose')}
                            options={DateService.getMonthsCollection(restaurantCreation, chosenYear, t)}
                            defaultValue={initialMonth}
                            onChange={(selected) => dispatch(setChosenMonth(selected))}
                            styles={dateStyles}
                            isSearchable={false}
                            components={{NoOptionsMessage: CustomNoOptionsMessage}}
                    />
                );
        }
    }

    return renderPeriodSelector();
}