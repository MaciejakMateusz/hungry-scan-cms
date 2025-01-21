import React from "react";
import {MainDialog} from "../MainDialog";
import {useTranslation} from "react-i18next";

export const PasswordRecoveryLinkSent = () => {
    const {t} = useTranslation();

    return (
        <MainDialog h4={t('linkSent')}
                    p={t('checkRecoveryEmail')}
                    skipLoginBtn={true}
                    link={'/password-recovery'}/>
    );
}