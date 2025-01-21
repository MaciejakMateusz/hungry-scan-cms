import React from "react";
import {FormField} from "../forms/FormField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {executeRecoveryInitFetch, setUsername} from "../../../slices/recoveryFormSlice";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {validateUsername} from "../../../utils/usernameValidator";
import {BackPurpleIcon} from "../../icons/BackPurpleIcon";

export const PasswordRecovery = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {username} = useSelector(state => state.recovery.recoveryInitForm);
    const {isLoading, errorData} = useSelector(state => state.recovery.recoveryInitFetch);
    const checkUsername = validateUsername(errorData, username ,t);

    const handleRecoveryInit = (e) => {
        e.preventDefault();
        dispatch(executeRecoveryInitFetch());
    };

    const renderOtherErrors = () => {
        if(!errorData) {
            return (<></>);
        }
        if(errorData.status === 500) {
            return (
                <div className={'login-validation-msg'}>
                    <span>{t('somethingWentWrong')}</span>
                </div>

            );
        }
    }

    return (
        <div className={'main-page-dialog'}>
            <BackPurpleIcon onClick={() => window.location.href = '/sign-in'}/>
            <section className={'password-recovery-section'}>
                <form>
                    <h4 className={"password-recovery-h4"}>{t('forgotPassword')}</h4>
                    <p className={"password-recovery-p"}>{t('forgotPasswordSub')}</p>
                    <FormField type={'text'}
                               placeholder={t('email')}
                               name={'username'}
                               value={username}
                               error={errorData?.username}
                               hasError={checkUsername}
                               changeHandler={(e) => dispatch(setUsername(e.target.value))}
                               customWrapper={'short'}/>
                    <button className={'form-submit-button short'}
                            onClick={handleRecoveryInit}>
                        {isLoading ? <LoadingSpinner buttonMode={true}/> : t('send')}
                    </button>
                    {renderOtherErrors()}
                </form>
            </section>
        </div>
    );
}