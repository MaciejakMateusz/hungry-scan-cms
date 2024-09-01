import React from "react";
import {useSelector} from "react-redux";
import {ReactSVG} from "react-svg";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../../../locales/langUtils";
import {Tooltip} from "../../../Tooltip";

export const Allergens = () => {
    const {chosenAllergens} = useSelector(state => state.dishForm.fetchAllergens);
    const {t} = useTranslation();

    if (chosenAllergens?.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className={'details-definition-text'}>{t('allergens')}:</div>
            <div className={'details-allergens-container'}>
                {chosenAllergens?.map(allergen => (
                    <Tooltip content={getTranslation(allergen.value?.description)}
                             key={allergen.value?.id}>
                        <ReactSVG className={'details-allergen-icon'}
                                  src={`${process.env.PUBLIC_URL}/theme/preview-icons/${allergen.value?.iconName}`}
                        />
                    </Tooltip>
                ))}
            </div>
        </>
    );
}