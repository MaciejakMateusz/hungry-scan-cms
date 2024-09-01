import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getTranslation} from "../../../../../locales/langUtils";
import {formatPrice} from "../../../../../utils";

export const Additions = () => {
    const {t} = useTranslation();
    const {chosenAdditions} = useSelector(state => state.dishAdditions.fetchIngredients);


    if (chosenAdditions?.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className={'details-definition-text'}>
                {t('additions')}
                <span className={'optional-text'}> ({t('optional')}):</span>
            </div>
            <div className={'details-list-positions-wrapper'}>
                {chosenAdditions?.map(addition => (
                    <div key={addition.value?.id} className={'details-list-position-container'}>
                        <span className={'details-list-position-text'}>{getTranslation(addition.value?.name)}</span>
                        <span className={'details-list-addition-price'}>+ {formatPrice(addition.value?.price)} zł</span>
                    </div>
                ))}
            </div>
        </>
    );
}