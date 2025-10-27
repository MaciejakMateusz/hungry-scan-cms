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
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ReorderIcon} from "../../../../icons/ReorderIcon";

export const CategoryPosition = ({category}) => {
    const {t} = useTranslation();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const dispatch = useDispatch();

    const renderReorderIcon = () => {
        if (menu?.categories.length === 1) return;

        return (
            <span className={'clickable-icon'}
                  onClick={() => dispatch(setReorderCategoriesDialogActive(true))}>
                <ReorderIcon/>
            </span>
        );
    }

    return (
        <div className={'category-container-header'}>
            <div className={'category-info'}>
                <span className={'text-ellipsis'} style={{maxWidth: '50vw'}}>
                    {getTranslation(category.name)}
                </span>
                ({category.menuItems.length})
                {renderReorderIcon()}
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
            <div className={'new-position-button'} onClick={() => {
                dispatch(setCategory(category));
                dispatch(setNewDishFormActive(true));
            }}>
                + &nbsp;{t('newDish')}
            </div>
        </div>
    );
}