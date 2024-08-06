import React from "react";
import {useTranslation} from "react-i18next";

export const TranslationsEditorHeader = () => {
    const {t} = useTranslation();
    return (
        <header className={'translations-vertical-split-header-right'}>
            <button className={'translations-chosen-lang active'}>
                {t('english')}
            </button>
        </header>
    );
}