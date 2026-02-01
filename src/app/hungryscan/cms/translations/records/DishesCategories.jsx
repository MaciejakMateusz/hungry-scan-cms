import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {TranslationContainer} from "../TranslationsList.style";
import {TranslationRecord} from "../TranslationRecord";
import {setActiveRecord, setActiveRecordId} from "../../../../../slices/translationsSlice";

export const DishesCategories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {dishesCategories} = useSelector(state => state.translations.view);

    if (!dishesCategories || dishesCategories.length === 0) {
        return (<p className={'text-center'}>{t('noRecordsFound')}</p>);
    }

    return dishesCategories.map((category) => (
        <TranslationContainer key={category.id} $hasParent={true}>
            <TranslationRecord record={category}
                               isParent={true}
                               childrenKey={'menuItems'}
                               parentTranslatableKey={'name'}
                               setActive={() => {
                                   dispatch(setActiveRecordId('p' + category.id));
                                   dispatch(setActiveRecord(category));
                               }}
            />
            <div className={'draggable-position-separator'}/>
            {category.menuItems && category.menuItems.map(menuItem => (
                <div key={menuItem.id}>
                    <TranslationRecord record={menuItem}
                                       childTranslatableKey={'name'}
                                       setActive={() => {
                                           dispatch(setActiveRecord(menuItem));
                                           dispatch(setActiveRecordId('c' + menuItem.id));
                                       }}
                    />
                    <div className={'draggable-position-separator'}/>
                </div>
            ))}
        </TranslationContainer>
    ));
}