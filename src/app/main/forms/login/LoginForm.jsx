import React, {useEffect, useState} from "react";
import {FormField} from "../FormField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {executeLoginFetch, setPassword, setUsername} from "../../../../slices/loginFormSlice";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {urlParamValue} from "../../../../utils/utils";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {username, password} = useSelector((state) => state.login.loginForm);
    const {notAuthorized, isLoading, errorData} = useSelector((state) => state.login.loginFetch);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        setIsLoggedOut(Boolean(urlParamValue("logout")))
    }, []);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(executeLoginFetch());
    };

    const renderMessage = () => {
        if (errorData?.message === 'notActivated') {
            return notActivatedMsg();
        } else if (isLoggedOut) {
            return logoutSuccess();
        } else if (notAuthorized) {
            return validationFail(t('invalidCredentials'));
        } else {
            return <></>
        }
    }

    const notActivatedMsg = () => {
        return (
            <p className={'login-validation-msg'}>
                {t('accountNotActivated')}
                <a href={'/password-recovery'}>
                    {t('resendActivationLink')}
                </a>
            </p>
        );
    }

    const validationFail = (message) => {
        return (
            <p className={'login-validation-msg'}>
                {message}
            </p>
        );
    }

    const logoutSuccess = () => {
        return (
            <p className={'logout-success-msg'}>
                {t('logoutSuccess')}
            </p>
        );
    }

    return (
        <form className={'main-page-login-form'}>
            <FormField type={'text'}
                       placeholder={t('typeEmail')}
                       name={'username'}
                       value={username}
                       changeHandler={(e) => dispatch(setUsername(e.target.value))}/>
            <FormField type={'password'}
                       placeholder={t('typePassword')}
                       name={'password'}
                       value={password}
                       toggler={togglePasswordVisibility}
                       visible={isPasswordVisible}
                       changeHandler={(e) => dispatch(setPassword(e.target.value))}/>
            <span className={'pass-reminder-link'}>
                                    <a href={'/password-recovery'}>{t('recoverPassword')}</a>
                                </span>
            <button className={'form-submit-button'} onClick={handleSignIn}>
                {isLoading ? <LoadingSpinner buttonMode={true}/> : t('logInButton')}
            </button>
            {renderMessage()}
        </form>
    );
}