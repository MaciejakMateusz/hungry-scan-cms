import React from "react";
import {ConfirmationView} from "../ConfirmationView";
import {useTranslation} from "react-i18next";

export const PasswordRecoveryConfirmation = () => {
    const {t} = useTranslation();

    const confirmationCircleImg = () => {
        return (
            <div className={'confirmation-image-wrapper'}>
                <img src={`${process.env.PUBLIC_URL}/theme/images/confirmation-circle.png`}
                     alt={'Confirmation circle green'}
                     className={'confirmation-circle-image'}/>
            </div>
        );
    }

    return (
        <ConfirmationView h4={t('passwordChanged')}
                          p={t('passwordChangedMsg')}
                          image={confirmationCircleImg}/>
    );
}