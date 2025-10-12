import React from 'react';
import {useTranslation} from "react-i18next";

export const ErrorMessageDialog = ({dismissHandler, errorMessage}) => {
    const {t} = useTranslation();

    return (
        <div className={'error-dialog-overlay'}>
            <div className={'error-dialog'}>
                <div className={'error-dialog-content'}>
                    <p>{errorMessage}</p>
                </div>
                <div className={'error-dialog-actions'}>
                    <button onClick={() => dismissHandler()}>{t('close')}</button>
                </div>
            </div>
        </div>
    );
};