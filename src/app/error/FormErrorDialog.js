import React from 'react';
import {useTranslation} from "react-i18next";

export const FormErrorDialog = (props) => {
    const [open, setOpen] = React.useState(true);
    const {t} = useTranslation();

    const handleClose = () => {
        setOpen(false);
    };

    if (!open) {
        return null;
    }

    const renderMessage = (key) => {
            switch (key) {
                case 'categoryId':
                    return (
                        <div className={'error-field-wrapper'}>
                            <p key={key} className={'error-field-key'}>
                                {t('category')}: <span className={'error-field-value'}>{props.error[key]}</span>
                            </p>
                        </div>
                    );
                case 'price':
                    return (
                        <div className={'error-field-wrapper'}>
                            <p key={key} className={'error-field-key'}>
                                {t('price')}: <span className={'error-field-value'}>{props.error[key]}</span>
                            </p>
                        </div>
                    );
                case 'name':
                    return (
                        <div className={'error-field-wrapper'}>
                        <p key={key} className={'error-field-key'}>
                                {t('name')}: <span className={'error-field-value'}>{props.error[key]}</span>
                            </p>
                        </div>
                    );
                case 'displayOrder':
                    return (
                        <div className={'error-field-wrapper'}>
                        <p key={key} className={'error-field-key'}>
                                {t('displayOrder')}: <span className={'error-field-value'}>{props.error[key]}</span>
                            </p>
                        </div>
                    );
                default:
                    return (
                        <div className={'error-field-wrapper'}>
                        <p key={key} className={'error-field-key'}>
                                {key}: <span className={'error-field-value'}>{props.error[key]}</span>
                            </p>
                        </div>
                    );
            }
    }

    return (
        <div className={'error-dialog-overlay'}>
            <div className={'error-dialog'}>
                <div className={'error-dialog-title'}>
                    <h2>{t('formHasErrors')}</h2>
                </div>
                <div className={'error-dialog-content'}>
                    {Object.keys(props.error).map((key) => renderMessage(key))}
                </div>
                <div className={'error-dialog-actions'}>
                    <button onClick={() => {
                        handleClose()
                        props.resetMessage(null)
                    }}>
                        {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};