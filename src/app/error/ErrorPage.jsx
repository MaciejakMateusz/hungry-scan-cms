import React from "react";
import {useTranslation} from "react-i18next";

export const ErrorPage = (props) => {
    const {t} = useTranslation();

    return (

        <div className={'standalone-error-view'}>
            <div>
                <div className={'error-code'}>
                    <span>{props.code}</span>
                </div>
                <div className={'main-page-dialog-wrapper error'}>
                    <div className={'main-page-dialog'}>
                        <h4 className={'main-page-dialog-h4'}>{props.h4}</h4>
                        <p className={'main-page-dialog-p'}>{props.p}</p>
                        <div className={'go-login-btn-wrapper'}>
                            <button className={'form-submit-button error'}
                                    onClick={() => window.location.href = '/'}>
                                {t('mainPage')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};