import React from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../../shared-components/InformationTooltip";
import {ThemesSelect} from "./ThemesSelect";

export const ThemesField = () => {
    const {t} = useTranslation();
    return (
        <>
            <label htmlFor={'welcome-slogan'} className={'form-label-vertical'}>
                <InformationTooltip text={t('themeTooltip')} nonAbsolute={true}/>
                {t('theme')} *
            </label>
            <ThemesSelect/>
        </>
    );
}