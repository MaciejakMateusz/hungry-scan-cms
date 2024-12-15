import React, {useState} from "react";
import {FormField} from "./FormField";
import {useTranslation} from "react-i18next";

export const LoginForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {t} = useTranslation();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <form className={'main-page-login-form'}>
            <FormField type={'text'} placeholder={t('typeEmail')} name={'username'}/>
            <FormField type={'password'}
                       placeholder={t('typePassword')}
                       name={'password'}
                       toggler={togglePasswordVisibility}
                       visible={isPasswordVisible}/>
            <span className={'pass-reminder-link'}>
                                    <a href={'/#'}>{t('recoverPassword')}</a>
                                </span>
            <button className={'form-submit-button'}>
                {t('logInButton')}
            </button>
        </form>
    );
}