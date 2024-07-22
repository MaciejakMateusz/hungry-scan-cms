import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const Interface = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("interface")}</title>
            </Helmet>
            <div>Interfejs</div>
        </>
    );
}