import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const PriceFooter = () => {
    const {t} = useTranslation();
    const {price} = useSelector(state => state.dishForm.form);

    return (
        <div className={'details-fixed-footer'}>
            <div className={'details-price-label'}>
                        <span className={'details-price-text'}>
                            {t('price')} &nbsp; &#x2022; &nbsp; {price} zł
                        </span>
            </div>
        </div>
    );
}