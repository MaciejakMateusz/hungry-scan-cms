import React from "react";
import {FormField} from "../FormField";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {validateUsername} from "../../../../utils/usernameValidator";
import {executeReactivateFetch, setUsername} from "../../../../slices/reactivateFormSlice";
import {renderOtherErrors} from "../../../../utils/errorUtils";

export const ActivationError = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {username} = useSelector(state => state.reactivate.reactivateForm);
    const {isLoading, errorData} = useSelector(state => state.reactivate.reactivateFetch);
    const checkUsername = validateUsername(errorData, username, t);

    const handleRecovery = (e) => {
        e.preventDefault();
        dispatch(executeReactivateFetch());
    };

    return (
        <div className={'main-page-dialog'}>
            <section className={'password-recovery-section'}>
                <form>
                    <h4 className={"password-recovery-h4"}>{t('activationFailed')}</h4>
                    <p className={"password-recovery-p"}>{t('typeEmailToReactivate')}</p>
                    <FormField type={'text'}
                               placeholder={t('email')}
                               name={'username'}
                               value={username}
                               error={errorData?.username}
                               hasError={checkUsername}
                               changeHandler={(e) => dispatch(setUsername(e.target.value))}
                               customWrapper={'short'}/>
                    {renderOtherErrors(errorData)}
                    <button className={'form-submit-button short'} onClick={handleRecovery}>
                        {isLoading ? <LoadingSpinner buttonMode={true}/> : t('send')}
                    </button>
                    <span className={'register-terms-of-use-info'}>
                        <div>{t('activationProblems')} <a href={'/contact'}>{t('contactUs')}</a></div>
                    </span>
                </form>
            </section>
        </div>
    );
}