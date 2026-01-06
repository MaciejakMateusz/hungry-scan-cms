import React from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {MenuItemDetailsPosition} from "./MenuItemDetailsPosition.jsx";
import {useGetTranslation} from "../../../../../../../hooks/useGetTranslation";
import {formatPrice} from "../../../../../../../utils/utils";
import {DefinitionText, PositionsWrapper} from "./Variants.style";

export const Variants = () => {
    const {t} = useTranslation();
    const {variants, price, promoPrice} = useSelector(state => state.dishForm.form);
    const preparedVariants = variants
        ?.filter(v => v.available)
        .sort((a, b) => a.displayOrder - b.displayOrder);
    const getTranslation = useGetTranslation();

    if (preparedVariants.length === 0) {
        return null;
    }

    return (
        <>
            <DefinitionText>{t('variants')}:</DefinitionText>
            <PositionsWrapper>
                {preparedVariants.map(variant => (
                    <MenuItemDetailsPosition name={getTranslation(variant.name)}
                                             price={`${formatPrice(variant.price + Number(promoPrice ?? price))} zł`}
                                             key={variant.id}
                    />
                ))}
            </PositionsWrapper>
        </>
    );
}