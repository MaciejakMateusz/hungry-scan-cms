import React from "react";
import {useTranslation} from "react-i18next";
import {mainSelectTime} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "./CustomNoOptionsMessage";
import {useDayHours} from "../../../../hooks/useDayHours";
import {useDispatch} from "react-redux";
import {CustomSelect} from "./CustomSelect";

export const TimeField = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const dayHours = useDayHours();

    return (
        <CustomSelect id={props.name}
                      name={props.name}
                      value={props.value}
                      placeholder={t('choose')}
                      labelName={props.label}
                      info={props.info}
                      options={dayHours}
                      onChange={(selected) => dispatch(props.onChange(selected))}
                      error={props.error}
                      styles={mainSelectTime}
                      components={{NoOptionsMessage: CustomNoOptionsMessage}}
        />
    );
}