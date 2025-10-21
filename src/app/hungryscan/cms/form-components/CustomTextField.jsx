import React, {useEffect, useState} from "react";
import {InformationTooltip} from "../shared-components/InformationTooltip";

export const CustomTextField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(props.errorField);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.errorField && (!props.value || props.value.length > 255))
    }, [props.errorField, props.value]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className={'form-label'}>
                    {props.tooltip && <InformationTooltip text={props.tooltipText}/>}
                    {props.label} {props.required && '*'}
                </label>
                <div className={'full-width'}>
                    <input type={'text'}
                           className={`form-field name ${hasError ? 'error' : ''}`}
                           id={props.id}
                           name={props.name}
                           value={props.value}
                           onChange={(e) => {
                               props.onChange(e.target.value)
                               resetErrorStyles()
                           }}
                           placeholder={isFocused ? '' : props.placeholder}
                           onFocus={() => setIsFocused(true)}
                           onBlur={() => setIsFocused(false)}/>
                    {hasError && <div className={'validation-msg'}>{props.errorField}</div>}
                </div>
            </div>
        </div>
    );
}