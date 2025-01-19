import React from "react";
import {useTranslation} from "react-i18next";

export const MainDialog = (props) => {
    const {t} = useTranslation();

    const renderResendLink = () => {
        if (!props.link) {
            return (<></>);
        } else if (props.resend) {
            return (
                <div className={'activation-resend'}>
                    {t('resendActivation')}
                </div>
            );
        }
        return (
            <div className={'repeat-password-recovery'}>
                {t('resendLinkText')}<a href={props.link}><span className={'a-branded'}>{t('resendLink')}</span></a>
            </div>
        );
    }

    return (
        <div className={'main-page-dialog'}>
            <h4 className={'main-page-dialog-h4'}>{props.h4}</h4>
            <p className={'main-page-dialog-p'}>{props.p}</p>
            {(!props.skipLoginBtn) &&
                <div className={'go-login-btn-wrapper'}>
                    <button className={'form-submit-button confirmation'}
                            onClick={() => window.location.href = '/sign-in'}>
                        {t('goToLogin')}
                    </button>
                </div>
            }
            {renderResendLink()}
        </div>
    );
}