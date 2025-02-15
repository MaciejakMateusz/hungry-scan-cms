import React, {useCallback, useEffect} from "react";
import {PieChart} from "./PieChart";
import {useDispatch, useSelector} from "react-redux";
import {getPopularItemsStats, setChosenMenu} from "../../../../../../slices/statisticsSlice";
import Select from "react-select";
import {chartStyles} from "../../../../../../styles";
import {CustomNoOptionsMessage} from "../../../../cms/form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";
import debounce from "lodash/debounce";
import {getTranslation} from "../../../../../../locales/langUtils";

export const PopularDishesWidget = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
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
                        options={restaurant?.value?.menus.map(menu => {return {value: menu.id, label: getTranslation(menu.name)}})}
                        defaultValue={restaurant?.value?.menus[0]}
                        onChange={(selected) => setChosenMenu(selected)}
                        styles={chartStyles}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                        isSearchable={false}/>
            </div>
            <PieChart/>
        </div>
    );
}