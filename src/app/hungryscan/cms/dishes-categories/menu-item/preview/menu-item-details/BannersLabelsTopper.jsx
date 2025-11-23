import React from "react";
import {Labels} from "./Labels.jsx";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Banner} from "./Banner";
import {DetailsHeader, WrapperDetail} from "./BannersLabelsTopper.style";

export const BannersLabelsTopper = () => {
    const {t} = useTranslation();
    const {chosenBanners} = useSelector(state => state.dishForm.fetchBanners);
    const {chosenLabels} = useSelector(state => state.dishForm.fetchLabels);
    const banners = chosenBanners?.filter(banner => banner.value.id !== 'promo');
    const shouldNotRender = (!banners || banners.value?.length === 0) && (!chosenLabels || chosenLabels.length === 0);

    if (shouldNotRender) {
        return null;
    }

    return (
        <DetailsHeader>
            <WrapperDetail>
                {banners?.map(banner => (
                    <Banner key={banner.value.id}
                            name={t(banner.value.id)}
                            iconPath={`${process.env.PUBLIC_URL}/theme/icons/${banner.value.id}-small.svg`}/>
                ))}
            </WrapperDetail>
            <Labels/>
        </DetailsHeader>
    );
}