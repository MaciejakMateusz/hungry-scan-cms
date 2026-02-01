import React from "react";
import {TranslationContainer} from "../TranslationsList.style";
import {TranslationRecord} from "../TranslationRecord";
import {setActiveRecord, setActiveRecordId} from "../../../../../slices/translationsSlice";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

export const Additions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {additions} = useSelector(state => state.translations.view);

    if (!additions || additions.length === 0) {
        return (<p className={'text-center'}>{t('noRecordsFound')}</p>);
    }

    return additions.map(addition => (
        <TranslationContainer key={addition.id} $hasParent={false}>
            <TranslationRecord record={addition}
                               childTranslatableKey={'name'}
                               setActive={() => {
                                   dispatch(setActiveRecordId('c' + addition.id));
                                   dispatch(setActiveRecord(addition));
                               }}
            />
            <div className={'draggable-position-separator'}/>
        </TranslationContainer>
    ));
}