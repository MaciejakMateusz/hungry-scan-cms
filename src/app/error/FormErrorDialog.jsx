import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

export const FormErrorDialog = ({errorData, setErrorData}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const exceptionMessage = errorData?.exceptionMsg;

    const handleClose = () => {
        dispatch(setErrorData({
            ...errorData,
            exceptionMsg: null
        }));
    };

    if (!exceptionMessage) {
        return null;
    }

    return (
        <div className={'error-dialog-overlay'}>
            <div className={'error-dialog'}>
                <div className={'error-dialog-title'}>
                    <h2>{t('formHasErrors')}</h2>
                </div>
                <div className={'error-dialog-content'}>
                    <div className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('error')}: <span className={'error-field-value'}>{exceptionMessage}</span>
                        </p>
                    </div>
                </div>
                <div className={'error-dialog-actions'}>
                    <button onClick={handleClose}>
                        {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};