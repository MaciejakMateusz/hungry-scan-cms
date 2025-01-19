import React from "react";
import {useTranslation} from "react-i18next";

export const LoginRegisterToggle = ({toggleForm, activeForm}) => {
    const {t} = useTranslation();

    return (
        <div className={'login-register-toggle'}>
            <div className={'form-mode'}>
                <div className={'toggle-form login'} onClick={() => toggleForm('login')}>
                    <span>{t('logIn')}</span>
                </div>
                <div className={'toggle-form register'} onClick={() => toggleForm('register')}>
                    <span>{t('register')}</span>
                </div>
                <div
                    className={`form-mode-indicator ${activeForm === 'register' ? 'register' : ''}`}/>
                <div className={'form-mode-indicator-strip'}/>
            </div>
        </div>
    );
}