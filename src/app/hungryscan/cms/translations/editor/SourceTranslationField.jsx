import React from "react";
import {useTranslation} from "react-i18next";
import {getLanguage} from "../../../../../locales/langUtils";
import {useDispatch} from "react-redux";

export const SourceTranslationField = ({value, type, handleFieldChange}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const currentSystemLanguage = getLanguage();

    return (
        <div className={'original-translation-box'}>
            <div className={'original-translation-header'}>
                <span className={'translation-text-label'}>
                    {t('originalText')} - {t(type)}
                </span>
                <div className={'language-label'}>
                    {t(currentSystemLanguage)}
                </div>
            </div>
            <div className={'translation-value-content-container'}>
                    <textarea className={'translation-textarea-input'}
                              placeholder={t('typeTranslation')}
                              id={type}
                              name={type}
                              value={value}
                              onChange={(e) => dispatch(handleFieldChange(e.target.value))}
                    />
            </div>
        </div>
    );
}