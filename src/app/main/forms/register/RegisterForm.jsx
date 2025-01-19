import React, {useState} from "react";
import {FormField} from "../FormField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    executeRegisterFetch,
    setForename,
    setPassword,
    setRepeatedPassword,
    setSurname,
    setUsername
} from "../../../../slices/registerFormSlice";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {
    renderRepeatedPasswordMsg,
    validatePassword,
    validateRepeatedPassword
} from "../../../../utils/passwordValidator";
import {validateUsername} from "../../../../utils/usernameValidator";
import {validateForename, validateSurname} from "../../../../utils/forenameSurnameValidator";
import {BackPurpleIcon} from "../../../icons/BackPurpleIcon";

export const RegisterForm = () => {
    const dispatch = useDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {
        forename,
        surname,
        username,
        password,
        repeatedPassword
    } = useSelector(state => state.register.registerForm);
    const {isLoading, errorData} = useSelector(state => state.register.registerFetch);
    const {t} = useTranslation();
    const checkForename = validateForename(errorData, forename, t);
    const checkSurname = validateSurname(errorData, surname, t);
    const checkUsername = validateUsername(errorData, username, t);
    const checkPassword = validatePassword(errorData, password, t);
    const checkRepeatedPassword = validateRepeatedPassword(errorData, password, repeatedPassword);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(executeRegisterFetch());
    };

    return (
        <div className={'main-page-dialog'}>
            <BackPurpleIcon onClick={() => window.location.href = '/sign-in'}/>
            <h3 className={'register-header'}>{t('signUp')}</h3>
            <h4 className={'register-subheader'}>{t('signUpHc')}</h4>
            <form className={'main-page-login-form'}>
                <FormField type={'text'}
                           placeholder={t('forename')}
                           name={'forename'}
                           value={forename}
                           error={errorData?.forename}
                           hasError={checkForename}
                           changeHandler={(e) => dispatch(setForename(e.target.value))}/>
                <FormField type={'text'}
                           placeholder={t('surname')}
                           name={'surname'}
                           value={surname}
                           error={errorData?.surname}
                           hasError={checkSurname}
                           changeHandler={(e) => dispatch(setSurname(e.target.value))}/>
                <FormField type={'text'}
                           placeholder={t('email')}
                           name={'username'}
                           value={username}
                           error={errorData?.username}
                           hasError={checkUsername}
                           changeHandler={(e) => dispatch(setUsername(e.target.value))}/>
                <FormField type={'password'}
                           placeholder={t('password')}
                           name={'password'}
                           toggler={() => togglePasswordVisibility('password')}
                           visible={isPasswordVisible}
                           value={password}
                           error={errorData?.password}
                           hasError={checkPassword}
                           changeHandler={(e) => dispatch(setPassword(e.target.value))}/>
                <FormField type={'password'}
                           placeholder={t('repeatPassword')}
                           name={'repeatedPassword'}
                           toggler={() => togglePasswordVisibility('password')}
                           visible={isPasswordVisible}
                           value={repeatedPassword}
                           error={renderRepeatedPasswordMsg(errorData, password, repeatedPassword, t)}
                           hasError={checkRepeatedPassword}
                           changeHandler={(e) => dispatch(setRepeatedPassword(e.target.value))}/>
                <button className={'form-submit-button'} onClick={handleSignUp}>
                    {isLoading ? <LoadingSpinner buttonMode={true}/> : t('signUp')}
                </button>
                <span className={'register-terms-of-use-info'}>
                    <div>{t('acceptTerms')}</div>
                    <div>
                        <a href={'/#'}> {t('termsOfUse')}</a> {t('and')} <a href={'/#'}>{t('privacyPolicy')}</a>
                    </div>
                </span>

            </form>
        </div>
    );
}