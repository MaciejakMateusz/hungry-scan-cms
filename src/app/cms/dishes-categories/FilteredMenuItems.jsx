import React from "react";
import {useSelector} from "react-redux";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";

export const FilteredMenuItems = ({spinner, fetchCategories}) => {
    const {filteredItems} = useSelector(state => state.dishesCategories.view);

    if (spinner) {
        return spinner;
    }

    return (
        <>
            {filteredItems?.map(item => (
                <div key={item.id} className={'category-container-new filtered'}>
                    <MenuItemPosition key={`${item.id}-${item.displayOrder}`}
                                      menuItem={item}
                                      fetchCategories={fetchCategories}
                                      filtered={true}/>
                </div>
            ))}
        </>
    );
}