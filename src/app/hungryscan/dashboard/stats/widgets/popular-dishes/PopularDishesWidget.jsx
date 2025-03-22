import React, {useCallback, useEffect} from "react";
import {PieChart} from "./PieChart";
import {useDispatch, useSelector} from "react-redux";
import {getPopularItemsStats, setChosenMenu} from "../../../../../../slices/statisticsSlice";
import Select from "react-select";
import {chartStyles} from "../../../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../../../cms/form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";
import debounce from "lodash/debounce";

export const PopularDishesWidget = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        period,
        chosenYear,
        chosenMonth,
        chosenWeek,
        chosenDay,
        chosenMenu
    } = useSelector(state => state.statistics.view);

    const fetchPopularDishes = useCallback(() => {
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
            menuId: chosenMenu
        };
        dispatch(getPopularItemsStats({period, params}));
    }, [period, chosenYear, chosenMonth, chosenWeek, chosenDay, chosenMenu])
    
    const debouncedFetchPopularDishes = useCallback(() => {
        debounce(() => {
            fetchPopularDishes();
        })
    }, [fetchPopularDishes]);

    useEffect(() => {
        debouncedFetchPopularDishes();
    }, [debouncedFetchPopularDishes]);

    return (
        <div className={'statistic-widget popular-dishes'}>
            <div className={'widget-mode-selector'}>
                <Select id={'menu-popular-dishes-selector'}
                        name={'menu-popular-dishes-selector'}
                        value={chosenMenu}
                        placeholder={t('choose')}
                        options={[]}
                        defaultValue={undefined}
                        onChange={(selected) => setChosenMenu(selected)}
                        styles={chartStyles}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        isSearchable={false}/>
            </div>
            <PieChart/>
        </div>
    );
}