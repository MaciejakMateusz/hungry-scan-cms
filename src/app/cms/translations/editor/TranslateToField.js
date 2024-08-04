import React from "react";
import {TranslationStatus} from "../TranslationStatus";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setRecordDescription, setRecordName} from "../../../../slices/translationsSlice";

export const TranslateToField = ({value, renderButton, type}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleFieldChange = (e) => {
        if(t('name') === type) {
            dispatch(setRecordName(e.target.value));
            return;
        }
        dispatch(setRecordDescription(e.target.value));
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
                                                  onChange={handleFieldChange}/>
            </div>
            <div className={'translate-to-footer'}>
                <div className={'auto-translation-group'}>
                    <span className={'translate-icon'}>#<sub>A</sub></span>
                    <span
                        className={'automatic-translation-text'}>{t('automaticTranslation')}</span>
                </div>
                {renderButton ? <button type={'submit'} className={'translations-general-button'}>{t('save')}</button> : <></>}
            </div>
        </div>
    );
}