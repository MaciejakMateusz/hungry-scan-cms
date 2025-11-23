import React, {useEffect, useState} from "react";
import Select from "react-select";
import {customSelect} from "../../../../selectStyles";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../shared-components/InformationTooltip";

export const CustomSelect = (props) => {
    const {t} = useTranslation();
    const [chosenValue, setChosenValue] = useState(props.value);

    const errorStyles = {
        control: () => ({
            border: '1px solid rgba(255, 0, 0, 0.5)',
            animation: 'shake 0.5s ease-in-out'
        })
    };

    const mergeStyles = (baseStyles, errorStyles) => {
        return {
            ...baseStyles,
            control: (provided, state) => ({
                ...baseStyles.control(provided, state),
                ...(props.error?.[props.id] ? errorStyles.control(provided) : {})
            })
        };
    };

    useEffect(() => {
        setChosenValue(props.value);
    }, [props.value]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={`${props.disableFieldContainer ? '' : 'form-field-container'}`}>
                <label htmlFor={props.id} className={'form-label'}>
                    {props.info && <InformationTooltip text={props.info}/>}
                    {props.labelName} {props.isRequired && ' *'} {props.isOptional ?
                    <span className={'form-optional'}>{t('optional')}:</span> : ''}
                </label>
                <div className={'full-width'}>
                    <Select id={props.id}
                            name={props.name}
                            styles={mergeStyles({...customSelect, ...props.styles}, errorStyles)}
                            isDisabled={props.isDisabled}
                            value={chosenValue}
                            defaultValue={props.defaultValue}
                            onChange={props.onChange}
                            placeholder={props.placeholder}
                            isClearable={props.isClearable}
                            options={props.options}
                            components={{ ...(props.components || {})}}
                            isMulti={props.isMulti}
                            closeMenuOnSelect={props.closeMenuOnSelect}
                            menuPlacement={props.menuPlacement}
                    />
                    {props.error?.[props.id] &&
                        <div className={'validation-msg'}>
                            {props.error[props.id]}
                        </div>}
                </div>
            </div>
        </div>
    );
}