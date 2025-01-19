import React from "react";
import {ConfirmationView} from "../ConfirmationView";
import {useTranslation} from "react-i18next";

export const PasswordRecoveryConfirmation = () => {
    const {t} = useTranslation();

    return (
        <ConfirmationView h4={t('passwordChanged')}
                          p={t('passwordChangedMsg')}/>
    );
}