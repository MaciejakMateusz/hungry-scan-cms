import React from "react";
import {CheckIcon} from "../../../icons/CheckIcon";
import {useTranslation} from "react-i18next";
import {CloseIcon} from "../../../icons/CloseIcon";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";

export const TranslationStatus = ({translated}) => {
    const {t} = useTranslation();
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 550;

    return (
        <div className={`translation-status-box ${translated ? 'translated' : ''}`}>
            {translated ?
                <CheckIcon width={'15'} height={'15'} stroke={'#006724'}/>
                : <CloseIcon width={'15'} height={'15'} fill={'grey'}/>
            }
            {!isMobile &&
                <span className={`translation-status-text ${translated ? 'translated' : ''}`}>
                    {translated ? t('translation') : t('noTranslations')}
                </span>
            }

        </div>
    );
}