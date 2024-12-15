import React from "react";
import {Lightning} from "../icons/Lightning";
import {useTranslation} from "react-i18next";

export const Promo = () => {
    const {t} = useTranslation();

    return (<div className={'main-page-promo'}>
        <div className={'promo-wrapper'}>
            <span className={'promo-header'}>{t('promoHeader')}</span>
            <span className={'promo-slogan'}><Lightning/> {t('createFast')}</span>
            <span className={'promo-slogan'}><Lightning/> {t('spareTime')}</span>
            <span className={'promo-slogan'}><Lightning/> {t('speedUpService')}</span>
            <span className={'promo-slogan'}><Lightning/> {t('surpriseModernMenu')}</span>
        </div>
    </div>);
}