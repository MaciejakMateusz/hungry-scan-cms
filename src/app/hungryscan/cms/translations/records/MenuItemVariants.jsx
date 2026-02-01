import React from "react";
import {TranslationContainer} from "../TranslationsList.style";
import {TranslationRecord} from "../TranslationRecord";
import {setActiveRecord, setActiveRecordId} from "../../../../../slices/translationsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

export const MenuItemVariants = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {variants} = useSelector(state => state.translations.view);

    if (!variants || variants.length === 0) {
        return (<p className={'text-center'}>{t('noRecordsFound')}</p>);
    }

    return variants.map(menuItem => (
        <TranslationContainer key={menuItem.id} $hasParent={true}>
            <TranslationRecord record={menuItem}
                               isParent={true}
                               parentTranslatableKey={'name'}
                               childrenKey={'variants'}
                               setActive={() => {
                                   dispatch(setActiveRecordId('p' + menuItem.id));
                                   dispatch(setActiveRecord(menuItem));
                               }}
            />
            <div className={'draggable-position-separator'}/>
            {menuItem.variants && menuItem.variants.map(variant => (
                <div key={variant.id}>
                    <TranslationRecord record={variant}
                                       childTranslatableKey={'name'}
                                       setActive={() => {
                                           dispatch(setActiveRecordId('c' + variant.id));
                                           dispatch(setActiveRecord(variant));
                                       }}
                    />
                    <div className={'draggable-position-separator'}/>
                </div>
            ))}
        </TranslationContainer>
    ));
}