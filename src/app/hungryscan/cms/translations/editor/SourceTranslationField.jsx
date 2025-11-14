import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const SourceTranslationField = ({value, type}) => {
    const {t} = useTranslation();
    const {restaurant} = useSelector(state => state.dashboard.view);

    return (
        <div className={'original-translation-box'}>
            <div className={'original-translation-header'}>
                <span className={'translation-text-label'}>
                    {t('originalText')} - {t(type)}
                </span>
                <div className={'language-label'}>
                    {t(restaurant?.value.settings.language.toLowerCase())}
                </div>
            </div>
            <div className={'translation-value-content-container'}>
                    <textarea className={'translation-textarea-input'}
                              placeholder={t('typeTranslation')}
                              id={type}
                              disabled={true}
                              name={type}
                              value={value}
                    />
            </div>
        </div>
    );
}