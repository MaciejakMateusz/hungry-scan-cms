import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {urlParamValue} from "../../utils";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {executeLoginFetch, setPassword, setUsername} from "../../slices/loginFormSlice";
import {LoadingSpinner} from "../icons/LoadingSpinner";

export const LoginForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {username, password} = useSelector((state) => state.login.loginForm);
    const {notAuthorized, isLoading} = useSelector((state) => state.login.loginFetch);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        setIsLoggedOut(Boolean(urlParamValue("logout")))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(executeLoginFetch());
    };

    const renderMessage = () => {
        if (notAuthorized) {
            return validationFail();
        } else if (isLoggedOut) {
            return logoutSuccess();
        } else {
            return <></>
        }
    }

    const validationFail = () => {
        return (
            <p className={'login-validation-msg'}>
                {t('invalidCredentials')}
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
        <>
            <div className={'login-form-header'}>
                <h1 className="">{t('cmsLogin')}</h1>
            </div>
            <form className={'login-form'} onSubmit={handleSubmit}>
                <div className={'login-input-container username-grid'}>
                    <input type={'text'}
                           className={'login-input'}
                           placeholder={t('typeLogin')}
                           name={'username'}
                           value={username}
                           onChange={(e) => dispatch(setUsername(e.target.value))}/>

                </div>
                <div className={'login-input-container password-grid'}>
                    <input type={'password'}
                           className={'login-input'}
                           placeholder={t('typePassword')}
                           value={password}
                           name={'password'}
                           onChange={(e) => dispatch(setPassword(e.target.value))}/>
                    {renderMessage()}
                </div>
                <div className={'login-btn-container'}>
                    <button className={'login-btn'}
                            style={{fontSize: '1.1rem'}}
                            disabled={isLoading}>
                        {isLoading ? <LoadingSpinner buttonMode={true}/> : t('logIn')}
                    </button>
                </div>
            </form>
            <div className={'login-form-footer'}>
                    <span className="">{t('loginProblems')}
                        <Link to="/#"> {t('recoverPassword')}</Link>
                    </span>
            </div>
        </>
    );
}