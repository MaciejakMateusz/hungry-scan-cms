import React from "react";
import {TranslationStatus} from "../TranslationStatus";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    getAutoTranslation,
    setErrorData,
    setRecordDescription,
    setRecordName
} from "../../../../slices/translationsSlice";

export const TranslateToField = ({value, renderButton, type}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeRecord} = useSelector(state => state.translations.view);

    const handleFieldChange = (value) => {
        if (t('name') === type) {
            dispatch(setRecordName(value));
            return;
        }
        dispatch(setRecordDescription(value));
    }

    const handleFieldTranslation = async () => {
        const textToTranslate = t('name') === type ?
            activeRecord.name.defaultTranslation :
            activeRecord.description?.defaultTranslation;
        const resultAction = await dispatch(getAutoTranslation({text: textToTranslate}));
        if (getAutoTranslation.fulfilled.match(resultAction)) {
            const translatedText = resultAction.payload?.translations[0].text;
            handleFieldChange(translatedText);
        } else if (getAutoTranslation.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload));
        }
    }

    return (
        <div className={'translate-to-box'}>
            <div className={'translate-to-header'}>
                                        <span className={'translation-text-label'}>
                                            {t('translation')}
                                        </span>
                <div className={'translation-status-label-group'}>
                    <div className={'translate-to-translation-status'}>
                        <TranslationStatus translated={value?.length > 0}/>
                    </div>
                    <div className={'language-label'}>
                        {t('english')}
                    </div>
                </div>
            </div>
            <div className={'translate-to-content-container'}>
                                        <textarea className={'translation-textarea-input'}
                                                  placeholder={t('typeTranslation')}
                                                  id={type}
                                                  name={type}
                                                  value={value}
                                                  onChange={(e) => handleFieldChange(e.target.value)}/>
            </div>
            <div className={'translate-to-footer'}>
                <div className={'auto-translation-group'} onClick={handleFieldTranslation}>
                    <span className={'translate-icon'}>#<sub>A</sub></span>
                    <span className={'automatic-translation-text'}>
                            {t('automaticTranslation')}
                    </span>
                </div>
                {renderButton ?
                    <button type={'submit'} className={'translations-general-button'}>{t('save')}</button> : <></>}
            </div>
        </div>
    );
}