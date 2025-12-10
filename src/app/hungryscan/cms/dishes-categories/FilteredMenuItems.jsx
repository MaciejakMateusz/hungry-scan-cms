import React from "react";
import {useSelector} from "react-redux";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";
import {useTranslation} from "react-i18next";

export const FilteredMenuItems = () => {
    const {t} = useTranslation();
    const {filteredItems} = useSelector(state => state.dishesCategories.view);

    if (!filteredItems || filteredItems.length === 0) {
        return <p className={'text-center'}>{t('noPositionsFound')}</p>
    }

    return (
        <>
            {filteredItems?.map(item => (
                <div key={item.id} className={'category-container-new filtered'}>
                    <MenuItemPosition key={`${item.id}-${item.displayOrder}`}
                                      menuItem={item}
                                      filtered={true}/>
                </div>
            ))}
        </>
    );
}