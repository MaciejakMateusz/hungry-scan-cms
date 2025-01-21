import React from "react";
import {MainDialog} from "../../MainDialog";
import {useTranslation} from "react-i18next";
import {apiHost} from "../../../../apiData";
import {urlParamValue} from "../../../../utils/utils";

export const AccountActivationLinkSent = () => {
    const {t} = useTranslation();

    return (
        <MainDialog h4={t('registrationThanks')}
                    p={t('checkActivationEmail')}
                    skipLoginBtn={true}
                    link={`${apiHost}/api/user/resend-activation/${urlParamValue('target')}`}
                    resend={urlParamValue('resend')}/>
    );
}