import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const Banner = () => {
    const {t} = useTranslation();
    const {fileName, banner} = useSelector(state => state.dishForm.form);

    if (banner?.value === t('isBestseller')) {
        return (<span className={`details-banner ${!fileName ? 'no-image' : ''}`}>{t('bannerBestseller')}</span>);
    } else if (banner?.value === t('isNew')) {
        return (<span className={`details-banner ${!fileName ? 'no-image' : ''}`}>{t('bannerNew')}</span>);
    }

    return (<></>);
}