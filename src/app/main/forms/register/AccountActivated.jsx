import React from "react";
import {MainDialog} from "../../MainDialog";
import {useTranslation} from "react-i18next";

export const AccountActivated = () => {
    const {t} = useTranslation();

    return (
        <MainDialog h4={t('accountActivated')}
                    p={t('accountActivatedMsg')}/>
    );
}