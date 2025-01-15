import React, {useState} from "react";
import {LoginRegisterToggle} from "./LoginRegisterToggle";
import {GoogleIconColor} from "../../icons/GoogleIconColor";
import {LoginForm} from "./login/LoginForm";
import {RegisterForm} from "./register/RegisterForm";
import {useTranslation} from "react-i18next";
import {PasswordRecovery} from "../password-recovery/PasswordRecovery";
import {NewPassword} from "../password-recovery/NewPassword";

export const Forms = ({mode}) => {
    const [activeForm, setActiveForm] = useState('login');
    const {t} = useTranslation();

    const toggleForm = (formName) => {
        setActiveForm(formName);
    }

    const renderForms = () => {
        if (mode === "forgotPassword") {
            return (<PasswordRecovery/>);
        } else if (mode === "newPassword") {
            return (<NewPassword/>);
        }

        return (
            <div className={'main-page-forms'}>
                <div className={'main-page-forms-wrapper'}>
                    <LoginRegisterToggle toggleForm={toggleForm} activeForm={activeForm}/>
                    <div className={'use-google-button'}>
                        <GoogleIconColor/>
                        <span>{t('useGoogleAccount')}</span>
                    </div>
                    <div className={'login-else'}>
                        <span className={'login-else-line left'}/>
                        <span>lub</span>
                        <span className={'login-else-line right'}/>
                    </div>
                    {activeForm === 'login' ? <LoginForm/> : <RegisterForm/>}
                </div>
            </div>
        );
    }

    return renderForms();
}