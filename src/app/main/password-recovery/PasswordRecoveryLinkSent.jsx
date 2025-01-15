import React from "react";
import {ConfirmationView} from "../ConfirmationView";
import {useTranslation} from "react-i18next";

export const PasswordRecoveryLinkSent = () => {
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
        <ConfirmationView h4={t('linkSent')}
                          p={t('checkRecoveryEmail')}
                          skipLoginBtn={true}
                          link={'/password-recovery'}
                          image={confirmationLetterImg}/>
    );
}