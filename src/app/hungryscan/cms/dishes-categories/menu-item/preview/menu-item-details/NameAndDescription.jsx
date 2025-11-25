import React from "react";
import {useSelector} from "react-redux";
import {Tooltip} from "./Tooltip.jsx";
import {ReactSVG} from "react-svg";
import {Allergens} from "./Allergens.jsx";
import {DetailsDescription, DetailsName, InlineBlock} from "./NameAndDescription.style";

export const NameAndDescription = () => {
    const {name, description} = useSelector(state => state.dishForm.form);
    const {chosenAllergens} = useSelector(state => state.dishForm.fetchAllergens);
    const {chosenBanners} = useSelector(state => state.dishForm.fetchBanners);
    const {chosenLabels} = useSelector(state => state.dishForm.fetchLabels);
    const hasBanners = chosenBanners
        ?.filter((banner) => banner.value.id !== 'promo').length > 0;
    const hasLabels = chosenLabels?.length > 0;
    const hasNoAllergens = !chosenAllergens || chosenAllergens?.length === 0;
    const info = document.getElementById('info-icon');

    const renderTooltip = () => {
        if (hasNoAllergens) return null;
        return (
            <Tooltip content={<Allergens/>} appendTo={info || undefined}>
                <InlineBlock>
                    <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/info.svg`}
                              id={'info-icon'}
                              className={'info-icon'}/>
                </InlineBlock>
            </Tooltip>
        );
    }

    return (
        <>
            <DetailsName style={hasBanners || hasLabels ? {marginTop: '15px'} : {}}>
                <span>
                    {name}
                    {renderTooltip()}
                </span>
            </DetailsName>
            <DetailsDescription>
                {description}
            </DetailsDescription>
        </>
    );
}