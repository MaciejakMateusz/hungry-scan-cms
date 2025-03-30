import React from "react";
import {useSelector} from "react-redux";

export const Banner = () => {
    const {fileName, banner} = useSelector(state => state.dishForm.form);
    const bannerValue = banner?.value;
    const bannerLabel = banner?.label;

    if (bannerValue === 'isBestseller') {
        return (<span className={`details-banner ${!fileName ? 'no-image' : ''}`}>{bannerLabel}</span>);
    } else if (bannerValue === 'isNew') {
        return (<span className={`details-banner ${!fileName ? 'no-image' : ''}`}>{bannerLabel}</span>);
    }

    return (<></>);
}