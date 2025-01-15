import React, {useState} from "react";
import {FormField} from "../forms/FormField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {executeRecoveryFetch, setPassword, setRepeatedPassword} from "../../../slices/recoveryFormSlice";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {renderRepeatedPasswordMsg, validatePassword, validateRepeatedPassword} from "../../../utils/passwordValidator";

export const NewPassword = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {password, repeatedPassword} = useSelector(state => state.recovery.recoveryForm);
    const {isLoading, errorData} = useSelector(state => state.recovery.recoveryFetch);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleRecovery = (e) => {
        e.preventDefault();
        dispatch(executeRecoveryFetch());
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState)
    };

    return (
        <section className={'password-recovery-section'}>
            <form className={'password-recovery-form'}>
                <h4 className={"password-recovery-h4"}>{t('passwordChange')}</h4>
                <p className={"password-recovery-p"}>{t('typeNewPassword')}</p>
                <FormField type={'password'}
                           placeholder={t('newPassword')}
                           name={'password'}
                           value={password}
                           toggler={() => togglePasswordVisibility()}
                           visible={isPasswordVisible}
                           error={errorData?.password}
                           validator={() => validatePassword(errorData, password, t)}
                           changeHandler={(e) => dispatch(setPassword(e.target.value))}/>
                <FormField type={'password'}
                           placeholder={t('repeatPassword')}
                           name={'repeatedPassword'}
                           value={repeatedPassword}
                           visible={isPasswordVisible}
                           error={renderRepeatedPasswordMsg(errorData, password, repeatedPassword, t)}
                           validator={() => validateRepeatedPassword(errorData, password, repeatedPassword)}
                           changeHandler={(e) => dispatch(setRepeatedPassword(e.target.value))}/>
                <button className={'form-submit-button password-recovery'} onClick={handleRecovery}>
                    {isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                </button>
            </form>
        </section>
    );
}