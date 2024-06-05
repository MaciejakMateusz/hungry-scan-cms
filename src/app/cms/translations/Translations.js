import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const Translations = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("translations")}</title>
            </Helmet>
            <div>Tłumaczenia</div>
        </>
    );
}