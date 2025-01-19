import React from "react";
import {ConfirmationView} from "../ConfirmationView";
import {useTranslation} from "react-i18next";

export const PasswordRecoveryLinkSent = () => {
    const {t} = useTranslation();

    return (
        <ConfirmationView h4={t('linkSent')}
                          p={t('checkRecoveryEmail')}
                          skipLoginBtn={true}
                          link={'/password-recovery'}/>
    );
}