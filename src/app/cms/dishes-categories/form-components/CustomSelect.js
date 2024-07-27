import React, {useEffect, useState} from "react";
import Select from "react-select";
import {customSelect} from "../../../../styles";
import {useTranslation} from "react-i18next";
import {CustomNoOptionsMessage} from "./CustomNoOptionsMessage";

export const CustomSelect = (props) => {
    const {t} = useTranslation();
    const [chosenValue, setChosenValue] = useState(props.value);

    const errorStyles = {
        control: () => ({
            border: '2px solid rgba(255, 0, 0, 0.5)',
            animation: 'shake 0.5s ease-in-out'
        })
    };

    const mergeStyles = (baseStyles, errorStyles) => {
        return {
            ...baseStyles,
            control: (provided, state) => ({
                ...baseStyles.control(provided, state),
                ...(props.error && !chosenValue ? props.error.categoryId && errorStyles.control(provided) : {})
            })
        };
    };

    useEffect(() => {
        setChosenValue(props.value);
    }, [props.value]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className={'form-label'}>
                    {props.labelName} {props.isOptional ?
                    <span className={'form-optional'}>{t('optional')}:</span> : ':'}
                </label>
                <Select id={props.id}
                        name={props.name}
                        styles={mergeStyles(customSelect, errorStyles)}
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