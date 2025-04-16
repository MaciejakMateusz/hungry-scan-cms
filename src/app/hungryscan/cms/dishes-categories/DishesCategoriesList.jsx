import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {FailureMessage} from "../dialog-windows/FailureMessage";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";
import {CategoryPosition} from "./category/CategoryPosition";
import {FilteredMenuItems} from "./FilteredMenuItems";
import {remove} from "../../../../slices/objectRemovalSlice";
import {
    setActiveRemovalType,
    setCategoryForAction,
    setMenuItemForAction,
    updateMenuItemsOrder
} from "../../../../slices/dishesCategoriesSlice";
import {DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';
import {ReorderCategoriesDialog} from "../dialog-windows/ReorderCategoriesDialog";

export const DishesCategoriesList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        categoryForAction,
        reorderCategoriesDialogActive,
        menuItemForAction,
        filterValue,
        activeRemovalType
    } = useSelector(state => state.dishesCategories.view);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const [confirmedRemovalType, setConfirmedRemovalType] = useState(null);
    const [errorData, setErrorData] = useState({});
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const [errorTimeoutId, setErrorTimeoutId] = useState(null);
    const [localCategories, setLocalCategories] = useState([]);

    useEffect(() => {
        if (menu?.categories) {
            setLocalCategories(menu.categories);
        }
    }, [menu]);

    const handleRemoval = async (e) => {
        e.preventDefault();

        const actionType = categoryForAction ? 'categories' : 'items';
        const id = categoryForAction ? categoryForAction.id : menuItemForAction.id;

        const resultAction = await dispatch(remove({id: id, path: actionType}));
        if (remove.fulfilled.match(resultAction)) {
            if ('categories' === actionType) {
                dispatch(setActiveRemovalType(null));
                dispatch(setCategoryForAction(null));
                setConfirmedRemovalType('category');

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setConfirmedRemovalType(null);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);
            } else {
                dispatch(setActiveRemovalType(null));
                dispatch(setMenuItemForAction(null));
                setConfirmedRemovalType('dish');

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setConfirmedRemovalType(null);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);
            }
        } else if (remove.rejected.match(resultAction)) {
            if ('categories' === actionType) {
                dispatch(setActiveRemovalType(null));

                if (errorTimeoutId) {
                    clearTimeout(errorTimeoutId);
                    setErrorData({})
                }

                setErrorData(resultAction.payload);

                const newErrorTimeoutId = setTimeout(() => {
                    setErrorData({});
                }, 4000);
                setErrorTimeoutId(newErrorTimeoutId);
            } else {
                dispatch(setActiveRemovalType(null));

                if (errorTimeoutId) {
                    clearTimeout(errorTimeoutId);
                    setErrorData({})
                }

                setErrorData(resultAction.payload);

                const newErrorTimeoutId = setTimeout(() => {
                    setErrorData({});
                }, 4000);
                setErrorTimeoutId(newErrorTimeoutId);
            }
        }
    }

    const discardDeletion = () => {
        dispatch(setActiveRemovalType(null));
        dispatch(setCategoryForAction(null));
        dispatch(setMenuItemForAction(null));
    };

    const renderRemovalDialog = () => {
        if(!['category', 'dish'].includes(activeRemovalType)) return;
        const msg = activeRemovalType === 'category' ? t('confirmCategoryRemoval') : t('confirmDishRemoval');
        const objName = activeRemovalType === 'category' ? categoryForAction.name : menuItemForAction.name;
        return <DecisionDialog msg={msg}
                               objName={objName}
                               onSubmit={handleRemoval}
                               onCancel={discardDeletion}/>
    };

    const renderReorderCategoriesDialog = () => {
        return <ReorderCategoriesDialog/>
    };

    const renderConfirmationDialog = () => {
        if (confirmedRemovalType === 'category') {
            return (<SuccessMessage text={t('categoryRemovalSuccess')}/>);
        } else if (confirmedRemovalType === 'dish') {
            return (<SuccessMessage text={t('dishRemovalSuccess')}/>);
        }
    }

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

    const renderCategories = () => {
        return localCategories?.map(category => {
            const menuItemIds = category.menuItems.map(item => item.id.toString());
            return (
                <div key={category.id} className={'category-container-new'}>
                    <CategoryPosition category={category}/>
                    {category.menuItems.length > 1 && <div className={'menu-item-position-separator'}/>}
                    <DndContext onDragEnd={(event) => handleDragEnd(event, category)}>
                        <SortableContext items={menuItemIds}>
                            {category.menuItems.map(menuItem => (
                                <MenuItemPosition
                                    key={`${menuItem.id}-${menuItem.displayOrder}`}
                                    id={menuItem.id.toString()}
                                    category={category}
                                    menuItem={menuItem}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            );
        });
    };

    return (
        <div className={'scrollable-wrapper'}>
            {filterValue ?
                <FilteredMenuItems/> :
                renderCategories()}
            {activeRemovalType && renderRemovalDialog()}
            {confirmedRemovalType && renderConfirmationDialog()}
            {reorderCategoriesDialogActive && renderReorderCategoriesDialog()}
            {errorData.exceptionMsg && (<FailureMessage text={errorData.exceptionMsg}/>)}
        </div>
    );
}