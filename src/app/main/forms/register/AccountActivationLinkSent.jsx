import React from "react";
import {ConfirmationView} from "../../ConfirmationView";
import {useTranslation} from "react-i18next";
import {apiHost} from "../../../../apiData";
import {urlParamValue} from "../../../../utils/utils";

export const AccountActivationLinkSent = () => {
    const {t} = useTranslation();

    return (
        <ConfirmationView h4={t('registrationThanks')}
                          p={t('checkActivationEmail')}
                          skipLoginBtn={true}
                          link={`${apiHost}/api/user/resend-activation/${urlParamValue('target')}`}
                          resend={urlParamValue('resend')}/>
    );
}