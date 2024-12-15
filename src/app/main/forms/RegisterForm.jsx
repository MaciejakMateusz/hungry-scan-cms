import React, {useState} from "react";
import {FormField} from "./FormField";
import {useTranslation} from "react-i18next";

export const RegisterForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRepeatedVisible, setIsRepeatedVisible] = useState(false);
    const {t} = useTranslation();

    const togglePasswordVisibility = (mode) => {
        mode === 'password' ?
            setIsPasswordVisible(prevState => !prevState) :
            setIsRepeatedVisible(prevState => !prevState)
    };

    return (
        <form className={'main-page-login-form'}>
            <FormField type={'text'} placeholder={t('firstname')} name={'surname'}/>
            <FormField type={'text'} placeholder={t('surname')} name={'lastname'}/>
            <FormField type={'text'} placeholder={t('email')} name={'username'}/>
            <FormField type={'password'}
                       placeholder={t('password')}
                       name={'password'}
                       toggler={() => togglePasswordVisibility('password')}
                       visible={isPasswordVisible}/>
            <FormField type={'password'}
                       placeholder={t('repeatPassword')}
                       name={'repeatedPassword'}
                       toggler={() => togglePasswordVisibility('repeated')}
                       visible={isRepeatedVisible}/>
            <button className={'form-submit-button'}>
                {t('registerButton')}
            </button>
            <span className={'register-terms-of-use-info'}>
                <div>{t('acceptTerms')}</div>
                <div><a href={'/#'}> {t('termsOfUse')}</a> {t('and')} <a href={'/#'}>{t('privacyPolicy')}</a></div>
            </span>
        </form>
    );
}