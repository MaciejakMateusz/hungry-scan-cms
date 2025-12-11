import React from "react";
import {useTranslation} from "react-i18next";

export const PreviewFallback = () => {
    const {t} = useTranslation();
    return (
        <div className="iframe-fallback">
            <p className="iframe-fallback__title">
                {t('preview.errorTitle')}
            </p>
            <p className="iframe-fallback__text">
                {t('preview.errorDescription')}
            </p>
            <p className="iframe-fallback__text">
                {t('preview.errorDescription2')}
            </p>
        </div>
    );
}