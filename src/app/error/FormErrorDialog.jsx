import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";

export const FormErrorDialog = ({error, resetMessage}) => {
    const [open, setOpen] = useState(true);
    const {t} = useTranslation();

    useEffect(() => {
        setOpen(true);
    }, [error]);

    const handleClose = () => {
        setOpen(false);
        resetMessage(null);
    };

    if (!open) {
        return null;
    }

    const renderErrorChunk = (key, name) => {
        return (
            <div key={key} className={'error-field-wrapper'}>
                <p className={'error-field-key'}>
                    {t(name)}: <span className={'error-field-value'}>{error[key]}</span>
                </p>
            </div>
        );
    }

    const renderMessage = (key) => {
        switch (key) {
            case 'categoryId':
                return renderErrorChunk(key, 'category');
            case 'price':
                return renderErrorChunk(key, 'price');
            case 'name':
                return renderErrorChunk(key, 'name');
            case 'displayOrder':
                return renderErrorChunk(key, 'displayOrder');
            case 'password':
                return renderErrorChunk(key, 'password');
            case 'newPassword':
                return renderErrorChunk(key, 'newPassword');
            case 'repeatedPassword':
                return renderErrorChunk(key, 'repeatedPassword');
            case 'exceptionMsg':
                return renderErrorChunk(key, 'error');
            default:
                return renderErrorChunk(key, 'error');
        }
    };

    return (
        <div className={'error-dialog-overlay'}>
            <div className={'error-dialog'}>
                <div className={'error-dialog-title'}>
                    <h2>{t('formHasErrors')}</h2>
                </div>
                <div className={'error-dialog-content'}>
                    {Object.keys(error).map((key) => renderMessage(key))}
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