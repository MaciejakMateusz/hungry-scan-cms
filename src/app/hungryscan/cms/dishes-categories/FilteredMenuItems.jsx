import React from "react";
import {useSelector} from "react-redux";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";

export const FilteredMenuItems = () => {
    const {filteredItems} = useSelector(state => state.dishesCategories.view);

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