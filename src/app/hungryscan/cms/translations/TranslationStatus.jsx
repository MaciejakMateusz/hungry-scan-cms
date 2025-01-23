import React from "react";
import {AvailableIcon} from "../../../icons/AvailableIcon";
import {useTranslation} from "react-i18next";

export const TranslationStatus = ({translated}) => {
    const {t} = useTranslation();

    return (
        <div className={`translation-status-box ${translated ? 'translated' : ''}`}>
            {translated ?
                <span className={'translation-status-icon'}>
                    <AvailableIcon width={'19'} height={'19'} fill={'#FFF'}/>
                </span> : <></>}
            <span className={`translation-status-text ${translated ? 'translated' : ''}`}>
                {translated ? t('translation') : t('noTranslations')}
            </span>
        </div>
    );
}