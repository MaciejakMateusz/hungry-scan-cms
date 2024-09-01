import React from "react";
import {useTranslation} from "react-i18next";

export const OriginalTranslation = ({value, type}) => {
    const {t} = useTranslation();

    return (
        <div className={'original-translation-box'}>
            <div className={'original-translation-header'}>
                <span className={'translation-text-label'}>
                    {t('originalText')} - {type}
                </span>
                <div className={'language-label'}>
                    {t('polish')}
                </div>
            </div>
            <div className={'original-text-content-container'}>
                <span className={'original-text-content'}>
                    {value}
                </span>
            </div>
        </div>
    );
}