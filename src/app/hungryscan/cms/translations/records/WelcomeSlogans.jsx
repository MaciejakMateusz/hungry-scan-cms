import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {TranslationContainer} from "../TranslationsList.style";
import {TranslationRecord} from "../TranslationRecord";
import {setActiveRecord, setActiveRecordId} from "../../../../../slices/translationsSlice";

export const WelcomeSlogans = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menus} = useSelector(state => state.translations.view);

    if (!menus || menus.length === 0) {
        return (<p className={'text-center'}>{t('noRecordsFound')}</p>);
    }

    return menus.map(menu => (
        <TranslationContainer key={menu.id} $hasParent={false}>
            <TranslationRecord record={menu}
                               childTranslatableKey={'message'}
                               setActive={() => {
                                   dispatch(setActiveRecordId('c' + menu.id));
                                   dispatch(setActiveRecord(menu));
                               }}
            />
            <div className={'draggable-position-separator'}/>
        </TranslationContainer>
    ))
}