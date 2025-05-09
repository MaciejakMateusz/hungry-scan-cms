import React from "react";
import {CustomSelect} from "./CustomSelect";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import makeAnimated from "react-select/animated";
import {setChosenBanners} from "../../../../slices/dishFormSlice";
import {useMergeUniqueOptions} from "../../../../hooks/useMergeUniqueOptions";

export const BannersMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {banners, chosenBanners} = useSelector(state => state.dishForm.fetchBanners);
    const mergedOptions = useMergeUniqueOptions({chosenOptions: chosenBanners, options: banners});
    const animatedComponents = makeAnimated();

    return (
        <CustomSelect id={'dish-banner'}
                      name={'banner'}
                      labelName={t('banner')}
                      value={chosenBanners}
                      onChange={(selected) => dispatch(setChosenBanners(selected))}
                      placeholder={t('choose')}
                      isClearable={true}
                      isMulti={true}
                      options={mergedOptions}
                      components={animatedComponents}
                      closeMenuOnSelect={false}
        />
    );
}