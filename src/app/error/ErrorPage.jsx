import React from "react";
import {useTranslation} from "react-i18next";

export const ErrorPage = ({title, message}) => {
    const {t} = useTranslation();

    const goBack = () => {
        window.history.back();
    }

    return (
        <div className={'card o-hidden border-0 shadow-lg my-5'}>
            <div className={'card-body p-2'}>
                <div className="row">
                    <div className={'col-lg-12'}>
                        <div className={'p-5'} id={'root'}>
                            <div className={'text-center'}>
                                <h1 className={'h4 text-gray-900 mb-4'}>{title}</h1>
                            </div>
                            <div className={'user'}>
                                <p>{message}</p>
                            </div>
                            <button className={'btn btn-primary btn-user btn-block'}
                                    style={{fontSize: '1.1rem'}} onClick={goBack}>{t('back')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};