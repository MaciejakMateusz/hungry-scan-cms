import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

export const FormErrorDialog = ({ error, resetMessage }) => {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        setOpen(true);
    }, [error]);

    const handleClose = () => {
        setOpen(false);
        resetMessage(null);  // Reset the error message in the parent component
    };

    if (!open) {
        return null;
    }

    const renderMessage = (key) => {
        switch (key) {
            case 'categoryId':
                return (
                    <div key={key} className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('category')}: <span className={'error-field-value'}>{error[key]}</span>
                        </p>
                    </div>
                );
            case 'price':
                return (
                    <div key={key} className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('price')}: <span className={'error-field-value'}>{error[key]}</span>
                        </p>
                    </div>
                );
            case 'name':
                return (
                    <div key={key} className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('name')}: <span className={'error-field-value'}>{error[key]}</span>
                        </p>
                    </div>
                );
            case 'displayOrder':
                return (
                    <div key={key} className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('displayOrder')}: <span className={'error-field-value'}>{error[key]}</span>
                        </p>
                    </div>
                );
            case 'exceptionMsg':
                return (
                    <div key={key} className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('error')}: <span className={'error-field-value'}>{error[key]}</span>
                        </p>
                    </div>
                );
            default:
                return (
                    <div key={key} className={'error-field-wrapper'}>
                        <p className={'error-field-key'}>
                            {t('error')}: <span className={'error-field-value'}>{error[key]}</span>
                        </p>
                    </div>
                );
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