import React from "react";
import {getTranslation} from "../../../../../locales/langUtils";
import {
    setActiveRemovalType,
    setCategory,
    setCategoryForAction,
    setEditCategoryFormActive,
    setNewDishFormActive, setReorderCategoriesDialogActive
} from "../../../../../slices/dishesCategoriesSlice";
import {EditIconNew} from "../../../../icons/EditIconNew";
import {DeleteIconNew} from "../../../../icons/DeleteIconNew";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {ReorderIcon} from "../../../../icons/ReorderIcon";

export const CategoryPosition = ({category}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    return (
        <div className={'category-container-header'}>
            <div className={'category-info'}>
                {getTranslation(category.name)} ({category.menuItems.length})
                <span className={'clickable-icon'}
                      onClick={() => dispatch(setReorderCategoriesDialogActive(true))}>
                    <ReorderIcon/>
                </span>
                <span className={'clickable-icon'}
                      onClick={() => {
                          dispatch(setCategory(category));
                          dispatch(setEditCategoryFormActive(true));
                      }}>
                    <EditIconNew/>
                </span>
                <span className={'clickable-icon'}
                      onClick={() => {
                          dispatch(setCategoryForAction(category));
                          dispatch(setActiveRemovalType('category'));
                      }}>
                    <DeleteIconNew/>
                </span>
            </div>
            <div className={'new-dish-button'} onClick={() => {
                dispatch(setCategory(category));
                dispatch(setNewDishFormActive(true));
            }}>
                + &nbsp;{t('newDish')}
            </div>
        </div>
    );
}