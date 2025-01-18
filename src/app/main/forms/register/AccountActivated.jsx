import React from "react";
import {ConfirmationView} from "../../ConfirmationView";
import {useTranslation} from "react-i18next";

export const AccountActivated = () => {
    const {t} = useTranslation();

    return (
        <ConfirmationView h4={t('accountActivated')}
                          p={t('accountActivatedMsg')}/>
    );
}