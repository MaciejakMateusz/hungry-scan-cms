import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CustomSelect} from "./CustomSelect";
import {setChosenAllergens} from "../../../../slices/dishFormSlice";
import makeAnimated from "react-select/animated";
import {useMergeUniqueOptions} from "../../../../hooks/useMergeUniqueOptions";
import {CustomNoOptionsMessage} from "./CustomNoOptionsMessage";

export const AllergensMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {allergens, chosenAllergens} = useSelector(state => state.dishForm.fetchAllergens);
    const mergedOptions = useMergeUniqueOptions({chosenOptions: chosenAllergens, options: allergens});
    const animatedComponents = makeAnimated();

    return (
        <CustomSelect id={'dish-allergens'}
                      name={'allergens'}
                      labelName={t('allergens')}
                      closeMenuOnSelect={false}
                      onChange={(selected) => dispatch(setChosenAllergens(selected))}
                      value={chosenAllergens}
                      placeholder={t('choose')}
                      options={mergedOptions}
                      isClearable={true}
                      isMulti={true}
                      menuPlacement={'top'}
                      components={{...animatedComponents, NoOptionsMessage: CustomNoOptionsMessage}}/>
    );
}