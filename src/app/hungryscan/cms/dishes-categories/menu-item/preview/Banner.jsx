import React from "react";
import {useSelector} from "react-redux";

export const Banner = () => {
    const {fileName} = useSelector(state => state.dishForm.form);
    const {chosenBanners} = useSelector(state => state.dishForm.fetchBanners);

    if (chosenBanners?.length === 0) {
        return (<></>);
    }

    return (chosenBanners.map(banner => (
        <span className={`details-banner ${!fileName ? 'no-image' : ''}`}>{banner.label}</span>
    )));
}