import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CustomSelect} from "./CustomSelect";
import {setChosenAdditions} from "../../../../slices/dishAdditionsSlice";
import makeAnimated from 'react-select/animated';
import {useMergeUniqueOptions} from "../../../../hooks/useMergeUniqueOptions";

export const AdditionsMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {ingredients, chosenAdditions} = useSelector(state => state.dishAdditions.fetchIngredients);
    const mergedOptions = useMergeUniqueOptions({chosenOptions: chosenAdditions, options: ingredients});
    const animatedComponents = makeAnimated();

    return (
        <CustomSelect id={'dish-additions'}
                      name={'additions'}
                      labelName={t('additions')}
                      closeMenuOnSelect={false}
                      onChange={(selected) => dispatch(setChosenAdditions(selected))}
                      value={chosenAdditions}
                      placeholder={t('choose')}
                      options={mergedOptions}
                      isClearable={true}
                      isMulti={true}
                      menuPlacement={'top'}
                      components={animatedComponents}/>
    );
}