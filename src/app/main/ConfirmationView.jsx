import React from "react";
import {LogoGroup} from "../icons/LogoGroup";
import {NavMenu} from "./NavMenu";
import {useTranslation} from "react-i18next";

export const ConfirmationView = (props) => {
    const {t} = useTranslation();

    const goToLogin = () => {
        window.location.href = '/';
    }

    const renderResendLink = () => {
        if(!props.link) {
            return (<></>);
        } else if(props.resend) {
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
        <div className={'main-page-grid'}>
            <LogoGroup/>
            <NavMenu/>
            <div className={'main-page-content'}>
                <div className={'register-confirmation-thanks-wrapper'}>
                    <div className={'register-confirmation-thanks'}>
                        <h4 className={'promo-header'}>{props.h4}</h4>
                        <p style={{fontWeight: '300'}}>{props.p}
                        </p>
                        {(!props.skipLoginBtn) &&
                            <div className={'go-login-btn-wrapper'}>
                                <button className={'go-login-btn'} onClick={() => goToLogin()}>{t('goToLogin')}</button>
                            </div>
                        }
                    </div>
                </div>
                {props.image()}
            </div>
            {renderResendLink()}
        </div>
    );
}