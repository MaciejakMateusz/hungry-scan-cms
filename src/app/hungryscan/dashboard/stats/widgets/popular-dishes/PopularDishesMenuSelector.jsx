import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPopularItemsStats, setChosenMenu} from "../../../../../../slices/statisticsSlice";
import Select from "react-select";
import {chartStyles} from "../../../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../../../cms/form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";

export const PopularDishesMenuSelector = ({top = '40px'}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {
        period: periodObject,
        chosenYear,
        chosenMonth,
        chosenWeek,
        chosenDay,
        chosenMenu
    } = useSelector(state => state.statistics.view);
    const [menus, setMenus] = useState([]);
    const period = periodObject?.value;

    useEffect(() => {
        if (!period) return;
        if (period === "year" && !chosenYear) return;
        if (period === "month" && (!chosenYear || !chosenMonth)) return;
        if (period === "week" && (!chosenYear || !chosenWeek)) return;
        if (period === "day" && !chosenDay) return;
        if (!chosenMenu) return;
        const params = {
            year: chosenYear,
            month: chosenMonth,
            week: chosenWeek,
            day: chosenDay,
            menu: chosenMenu
        };
        dispatch(getPopularItemsStats({period, params}));
    }, [chosenDay, chosenMenu, chosenMonth, chosenWeek, chosenYear, dispatch, period]);

    useEffect(() => {
        const menus = restaurant?.value.menus;
        const mappedMenus = menus?.map(menu => ({
            value: menu.id,
            label: menu.name,
        }));
        setMenus(mappedMenus);
        if (mappedMenus?.length > 0) {
            dispatch(setChosenMenu(mappedMenus[0]));
        }
    }, [dispatch, restaurant?.value.menus]);

    return (
        <div className={'widget-mode-selector'} style={{top: top}}>
            <Select id={'menu-popular-dishes-selector'}
                    name={'menu-popular-dishes-selector'}
                    value={chosenMenu}
                    placeholder={t('choose')}
                    options={menus}
                    onChange={(selected) => dispatch(setChosenMenu(selected))}
                    styles={chartStyles}
                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                    isSearchable={false}/>
        </div>
    );
}