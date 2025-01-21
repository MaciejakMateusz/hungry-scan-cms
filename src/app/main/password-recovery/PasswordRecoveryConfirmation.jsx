import React from "react";
import {MainDialog} from "../MainDialog";
import {useTranslation} from "react-i18next";

export const PasswordRecoveryConfirmation = () => {
    const {t} = useTranslation();

    return (
        <MainDialog h4={t('passwordChanged')}
                    p={t('passwordChangedMsg')}/>
    );
}