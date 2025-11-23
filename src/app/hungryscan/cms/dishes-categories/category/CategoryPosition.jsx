import React, {useRef, useState} from "react";
import {
    setCategory,
    setEditCategoryFormActive,
    setNewDishFormActive
} from "../../../../../slices/dishesCategoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ContentSizeIndicator} from "../../shared-components/ContentSizeIndicator";
import {RecordOptionsButton} from "../../shared-components/RecordOptionsButton";
import {useCategoryContextPositions} from "../../../../../hooks/useCategoryContextPositions";
import {useOutsideClick} from "../../../../../hooks/useOutsideClick";
import {BorderedButton} from "../../../common/BorderedButton";

export const CategoryPosition = ({category, expandHandler, expanded}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const contextRef = useRef();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const [hovered, setHovered] = useState(false);
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const [contextDetailsWindowActive, setContextDetailsWindowActive] = useState(false);
    const categoryContextPositions = useCategoryContextPositions({
            category, setContextWindowActive, setContextDetailsWindowActive, contextDetailsWindowActive
        }
    );

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    const handleEdit = () => {
        dispatch(setCategory(category));
        dispatch(setEditCategoryFormActive(true));
    };

    const handleStopPropagation = e => {
        e.stopPropagation();
    }

    if (!menu || !menu.categories) return null;

    return (
        <div className={'category-container-header'}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>
            <div className={'category-info'} onClick={handleEdit}>
                <span className={'text-ellipsis'} style={{maxWidth: '50vw'}}>
                    {category.name[restaurantLanguage]}
                </span>
                <ContentSizeIndicator size={category.menuItems.length}/>
                <div onClick={handleStopPropagation}>
                    <RecordOptionsButton className={'record-context-actions-button'}
                                         onClick={() => setContextWindowActive(!contextWindowActive)}
                                         dotsFill={hovered ? undefined : 'transparent'}
                                         contextWindowActive={contextWindowActive}
                                         contextPositions={categoryContextPositions}
                                         contextRef={contextRef}/>
                </div>
            </div>
            <div className={'expandable-container'} onClick={() => expandHandler(!expanded)}/>
            <BorderedButton text={`+ ${t('newDish')}`}
                            isBordered={true}
                            onClick={() => {
                                dispatch(setCategory(category));
                                dispatch(setNewDishFormActive(true));
                            }}/>
        </div>
    );
}