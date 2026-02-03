import React from "react";
import {CustomSelect} from "./CustomSelect";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import makeAnimated from "react-select/animated";
import {setChosenBanners, setPromoPrice} from "../../../../slices/dishFormSlice";
import {useMergeUniqueOptions} from "../../../../hooks/useMergeUniqueOptions";
import {CustomNoOptionsMessage} from "./CustomNoOptionsMessage";
import {CustomMultivalueRemove} from "./CustomMultivalueRemove";

export const BannersMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {banners, chosenBanners} = useSelector(state => state.dishForm.fetchBanners);
    const mergedOptions = useMergeUniqueOptions({chosenOptions: chosenBanners, options: banners});
    const animatedComponents = makeAnimated();

    const handleBannersChange = (selected) => {
        dispatch(setChosenBanners(selected));
        const selectedValues = selected?.map(banner => banner.value.id);
        if (!selectedValues.includes('promo')) {
            dispatch(setPromoPrice(null));
        }
    }

    return (
        <CustomSelect id={'dish-banner'}
                      name={'banner'}
                      labelName={t('banner')}
                      value={chosenBanners}
                      onChange={(selected) => handleBannersChange(selected)}
                      placeholder={t('choose')}
                      isClearable={true}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      isSearchable={false}
                      options={mergedOptions}
                      components={{
                          ...animatedComponents,
                          NoOptionsMessage: CustomNoOptionsMessage,
                          MultiValueRemove: CustomMultivalueRemove}}
        />
    );
}