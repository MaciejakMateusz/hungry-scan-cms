import React from "react";
import {CustomSelect} from "./CustomSelect";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setChosenLabels} from "../../../../slices/dishFormSlice";
import makeAnimated from "react-select/animated";

export const LabelsMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {labels, chosenLabels} = useSelector(state => state.dishForm.fetchLabels);
    const animatedComponents = makeAnimated();

    return (
        <CustomSelect id={'dish-labels'}
                      name={'labels'}
                      labelName={t('labels')}
                      closeMenuOnSelect={false}
                      onChange={(selected) => dispatch(setChosenLabels(selected))}
                      value={chosenLabels}
                      placeholder={t('choose')}
                      options={labels}
                      isClearable={true}
                      isMulti={true}
                      components={animatedComponents}/>
    );
}