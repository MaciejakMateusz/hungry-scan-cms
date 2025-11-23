import React from "react";
import {ReactSVG} from "react-svg";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useGetTranslation} from "../../../../../../../hooks/useGetTranslation";
import {Position, TooltipHeader} from "./Allergens.style";

export const Allergens = () => {
    const {t} = useTranslation();
    const {chosenAllergens} = useSelector(state => state.dishForm.fetchAllergens);
    const getTranslation = useGetTranslation();

    return (
        <div>
            <TooltipHeader>{t('canContain')}</TooltipHeader>
            {chosenAllergens?.map(a => (
                <Position key={a.value.id}>
                    <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/${a.value.iconName}`}/>
                    <span>{getTranslation(a.value.name)}</span>
                </Position>
            ))}
        </div>
    );
}