import React from "react";
import {Widgets} from "./widgets/Widgets";
import {PeriodicSummary} from "./PeriodicSummary";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const Statistics = () => {
    const {t} = useTranslation();

    return (
        <div className={'statistics-content'}>
            <Helmet>
                <title>{t('dashboard')} - {t('statistics')}</title>
            </Helmet>
            <PeriodicSummary/>
            <Widgets/>
        </div>
    );
}