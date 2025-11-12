import React, {useRef, useState} from "react";
import {setCategory, setNewDishFormActive} from "../../../../../slices/dishesCategoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ContentSizeIndicator} from "../../shared-components/ContentSizeIndicator";
import {RecordOptionsButton} from "../../shared-components/RecordOptionsButton";
import {useCategoryContextPositions} from "../../../../../hooks/useCategoryContextPositions";
import {useOutsideClick} from "../../../../../hooks/useOutsideClick";

export const CategoryPosition = ({category}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const contextRef = useRef();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const [contextDetailsWindowActive, setContextDetailsWindowActive] = useState(false);
    const categoryContextPositions = useCategoryContextPositions({
            category, setContextWindowActive, setContextDetailsWindowActive, contextDetailsWindowActive
        }
    );

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    if (!menu || !menu.categories) return null;

    return (
        <div className={'category-container-header'}>
            <div className={'category-info'}>
                <span className={'text-ellipsis'} style={{maxWidth: '50vw'}}>
                    {category.name[restaurantLanguage]}
                </span>
                <ContentSizeIndicator size={category.menuItems.length}/>
                <RecordOptionsButton className={'record-context-actions-button'}
                                     onClick={() => setContextWindowActive(!contextWindowActive)}
                                     contextWindowActive={contextWindowActive}
                                     contextPositions={categoryContextPositions}
                                     obj={category}
                                     contextRef={contextRef}/>
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