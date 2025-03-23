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
        } else if (errorData?.error) {
            return validationFail(errorData.error);
        }
        return <></>
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
        <div className={'main-page-dialog'}>
            <h3 className={'register-header'}>{t('signIn')}</h3>
            <h4 className={'register-subheader'}>{t('signInSub')}</h4>
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
                <button className={'form-submit-button'}
                        onClick={handleSignIn}>
                    {isLoading ? <LoadingSpinner buttonMode={true}/> : t('logInButton')}
                </button>
                {renderMessage()}
            </form>
            <div className={'login-else'}>
                <span className={'login-else-line left'}/>
                <span>lub</span>
                <span className={'login-else-line right'}/>
            </div>
            <button className={'form-submit-button register-redirect'}
                    onClick={() => window.location.href = '/sign-up'}>
                {t('signUp')}
            </button>
            <div className={'pass-reminder'}>
                <span className={'pass-reminder-link'}>
                    <a href={'/password-recovery'}>{t('loginProblems')}</a>
                </span>
            </div>

        </div>
    );
}