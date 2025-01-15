import React from "react";
import {ConfirmationView} from "../../ConfirmationView";
import {useTranslation} from "react-i18next";
import {apiHost} from "../../../../apiData";
import {urlParamValue} from "../../../../utils/utils";

export const AccountActivationLinkSent = () => {
    const {t} = useTranslation();

    const confirmationLetterImg = () => {
        return (
            <div className={'confirmation-image-wrapper'}>
                <img src={`${process.env.PUBLIC_URL}/theme/images/letter.png`}
                     alt={'Register confirmation letter'}
                     className={'letter-image'}/>
            </div>
        );
    }

    return (
        <ConfirmationView h4={t('registrationThanks')}
                          p={t('checkActivationEmail')}
                          skipLoginBtn={true}
                          link={`${apiHost}/api/user/resend-activation/${urlParamValue('target')}`}
                          resend={urlParamValue('resend')}
                          image={confirmationLetterImg}/>
    );
}