import React from "react";
import {FormField} from "../forms/FormField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {executeRecoveryInitFetch, setUsername} from "../../../slices/recoveryFormSlice";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {validateUsername} from "../../../utils/usernameValidator";

export const PasswordRecovery = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {username} = useSelector(state => state.recovery.recoveryInitForm);
    const {isLoading, errorData} = useSelector(state => state.recovery.recoveryInitFetch);

    const handleRecoveryInit = (e) => {
        e.preventDefault();
        dispatch(executeRecoveryInitFetch());
    };

    return (
        <section className={'password-recovery-section'}>
            <form className={'password-recovery-form'}>
                <h4 className={"password-recovery-h4"}>Nie pamiętasz hasła?</h4>
                <p className={"password-recovery-p"}>Wpisz swój e-mail, a my wyślemy Ci link do zmiany hasła.</p>
                <FormField type={'text'}
                           placeholder={t('email')}
                           name={'username'}
                           value={username}
                           error={errorData?.username}
                           validator={() => validateUsername(errorData, username, t)}
                           changeHandler={(e) => dispatch(setUsername(e.target.value))}/>
                <button className={'form-submit-button password-recovery'} onClick={handleRecoveryInit}>
                    {isLoading ? <LoadingSpinner buttonMode={true}/> : t('send')}
                </button>
            </form>
        </section>
    );
}