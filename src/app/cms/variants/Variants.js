import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const Variants = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("variants")}</title>
            </Helmet>
            <div>Wariaty</div>
        </>
    );
}