import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

export const QrCode = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("qrCode")}</title>
            </Helmet>
            <div>Kod QR</div>
        </>
    );
}