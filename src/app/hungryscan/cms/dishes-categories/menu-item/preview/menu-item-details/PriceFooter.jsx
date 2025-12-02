import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {formatPrice} from "../../../../../../../utils/utils";
import {FixedContainer, PriceLabel, PriceText} from "./PriceFooter.style";

export const PriceFooter = () => {
    const {t} = useTranslation();
    const {price} = useSelector(state => state.dishForm.form);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);

    return (
        <FixedContainer>
            <PriceLabel style={{background: activeMenu?.value?.theme}}>
                        <PriceText>
                            {t('price')} &nbsp; &#x2022; &nbsp; {formatPrice(price, true)} zł
                        </PriceText>
            </PriceLabel>
        </FixedContainer>
    );
}