import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {ActionButton} from "../hungryscan/common/ActionButton";

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
                    <div>{t('formHasErrors')}</div>
                </div>
                <div className={'error-dialog-content'}>
                    <div className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('error')}: <span className={'error-field-value'}>{exceptionMessage}</span>
                        </p>
                    </div>
                </div>
                <div className={'error-dialog-actions'}>
                    <ActionButton text={t('close')} onClick={handleClose}/>
                </div>
            </div>
        </div>
    );
};