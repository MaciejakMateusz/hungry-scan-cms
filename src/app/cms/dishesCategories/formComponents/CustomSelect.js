import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import {customSelect} from "../../../../styles";
import {useTranslation} from "react-i18next";

export const CustomSelect = (props) => {
    const {t} = useTranslation();
    const [chosenValue, setChosenValue] = useState(props.value)

    useEffect(() => {
        setChosenValue(props.value)
    }, [props.value]);

    const CustomNoOptionsMessage = (props) => {
        return (
            <components.NoOptionsMessage {...props}>
                <div>
                    {t('noOptionsMsg')}
                </div>
            </components.NoOptionsMessage>
        );
    };

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className={'form-label'}>
                    {props.labelName} {props.isOptional ? <span className={'form-optional'}>{t('optional')}:</span> : ':'}
                </label>
                <Select id={props.id}
                        name={props.name}
                        styles={customSelect}
                        isDisabled={props.isDisabled}
                        value={chosenValue}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        isClearable={props.isClearable}
                        options={props.options}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </div>
        </div>
    );
}