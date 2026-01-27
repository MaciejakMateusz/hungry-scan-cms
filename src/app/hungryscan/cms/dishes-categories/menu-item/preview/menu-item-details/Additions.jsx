import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {MenuItemDetailsPosition} from "./MenuItemDetailsPosition.jsx";
import {useGetTranslation} from "../../../../../../../hooks/useGetTranslation";
import {formatPrice} from "../../../../../../../utils/utils";
import {DefinitionText, OptionalText, PositionsWrapper} from "./Additions.style";

export const Additions = () => {
    const {t} = useTranslation();
    const {chosenAdditions} = useSelector(state => state.dishAdditions.fetchIngredients);
    const getTranslation = useGetTranslation();
    const filteredAdditions = chosenAdditions?.filter(addition => addition.value.available);

    if (filteredAdditions.length === 0) {
        return null;
    }

    return (
        <>
            <DefinitionText>
                {t('additions')}
                <OptionalText> ({t('optional')}):</OptionalText>
            </DefinitionText>
            <PositionsWrapper>
                {filteredAdditions.map(addition => (
                    <MenuItemDetailsPosition name={getTranslation(addition.value.name)}
                                             price={`+${formatPrice(addition.value.price)} zł`}
                                             key={addition.value.id}
                    />
                ))}
            </PositionsWrapper>
        </>
    );
}