import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const AdPopUps = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("adPopUps")}</title>
            </Helmet>
            <div>Pop-upy reklamowe</div>
        </>
    );
}