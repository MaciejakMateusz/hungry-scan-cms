import React from "react";
import {ConfirmationView} from "../../ConfirmationView";
import {useTranslation} from "react-i18next";

export const AccountActivated = () => {
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
        <ConfirmationView h4={t('accountActivated')}
                          p={t('accountActivatedMsg')}
                          image={confirmationLetterImg}/>
    );
}