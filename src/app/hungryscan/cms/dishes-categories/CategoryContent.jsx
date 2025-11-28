import React, {useState} from "react";
import {CategoryPosition} from "./category/CategoryPosition";
import {DndContext} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";
import {updateMenuItemsOrder} from "../../../../slices/dishesCategoriesSlice";
import {useDispatch} from "react-redux";
import {useCustomSensors} from "../../../../hooks/useCustomSensors";

export const CategoryContent = ({category, localCategories, setLocalCategories}) => {
    const dispatch = useDispatch();
    const menuItemIds = category.menuItems.map(item => item.id.toString());
    const [categoryExpanded, setCategoryExpanded] = useState(true);
    const sensors = useCustomSensors();

    const handleDragEnd = async (event, category) => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;

        const oldIndex = category.menuItems.findIndex(item => item.id.toString() === active.id);
        const newIndex = category.menuItems.findIndex(item => item.id.toString() === over.id);

        const newMenuItemsOrdered = arrayMove(category.menuItems, oldIndex, newIndex);
        const newMenuItems = newMenuItemsOrdered.map((item, index) => ({
            ...item,
            displayOrder: index + 1,
        }));

        const newLocalCategories = localCategories.map(c => {
            if (c.id === category.id) {
                return {...c, menuItems: newMenuItems};
            }
            return c;
        });
        setLocalCategories(newLocalCategories);
        await dispatch(updateMenuItemsOrder({menuItems: newMenuItems}));
    };

    return (
        <div key={category.id} className={'category-container-new'}>
            <CategoryPosition category={category} expandHandler={setCategoryExpanded} expanded={categoryExpanded}/>
            {category.menuItems.length > 0 && <div className={'draggable-position-separator'}/>}
            <div className={'scrollable-x-wrapper'}>
                {categoryExpanded &&
                    <DndContext sensors={sensors}
                                onDragEnd={(event) => handleDragEnd(event, category)}>
                        <SortableContext items={menuItemIds}>
                            {category.menuItems.map(menuItem => (
                                <MenuItemPosition key={`${menuItem.id}-${menuItem.displayOrder}`}
                                                  id={menuItem.id.toString()}
                                                  category={category}
                                                  menuItem={menuItem}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                }
            </div>
        </div>
    );
}