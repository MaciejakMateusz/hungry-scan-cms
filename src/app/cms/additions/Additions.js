import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const Additions = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("additions")}</title>
            </Helmet>
            <div>Dodatki</div>
        </>
    );
}