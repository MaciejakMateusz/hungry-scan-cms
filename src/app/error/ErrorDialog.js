import React from 'react';
import {useTranslation} from "react-i18next";

export const ErrorDialog = ({ error, errorInfo }) => {
    const [open, setOpen] = React.useState(true);
    const {t} = useTranslation();

    const handleClose = () => {
        setOpen(false);
    };

    if (!open) {
        return null;
    }

    return (
        <div className="error-dialog-overlay">
            <div className="error-dialog">
                <div className="error-dialog-title">
                    <h2>{t('errorOccurred')}</h2>
                </div>
                <div className="error-dialog-content">
                    <p>{error && error.toString()}</p>
                    <details className="error-details">
                        <summary>{t('errorSummary')}</summary>
                        {errorInfo && errorInfo.componentStack.toString()}
                    </details>
                </div>
                <div className="error-dialog-actions">
                    <button onClick={handleClose}>{t('close')}</button>
                </div>
            </div>
        </div>
    );
};