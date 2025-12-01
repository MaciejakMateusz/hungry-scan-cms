import React from "react";
import {TopDishesChart} from "./TopDishesChart";
import {PopularDishesMenuSelector} from "./PopularDishesMenuSelector";
import {useWindowWidth} from "../../../../../../hooks/useWindowWidth";

export const PopularDishesWidget = () => {
    const windowWidth = useWindowWidth();
    const isWide = windowWidth > 730;

    return (
        <div className={'statistic-widget popular-dishes'}>
            {isWide && <PopularDishesMenuSelector/>}
            <TopDishesChart/>
        </div>
    );
}