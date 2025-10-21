import React, {useEffect, useState} from "react";
import {InformationTooltip} from "../cms/shared-components/InformationTooltip";

export const GenericField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(props.error);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.error);
    }, [props.error]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className={'form-label'}>
                    {props.tooltip && <InformationTooltip text={props.tooltip}/>}
                    {props.name} {props.required && '*'}
                </label>
                <div className={'full-width'}>
                    <input type={props.type}
                           className={`form-field name ${hasError ? 'error' : ''}`}
                           id={props.id}
                           name={props.id}
                           readOnly={props.readOnly}
                           disabled={props.disabled}
                           value={props.value}
                           onChange={(e) => {
                               props.onChange(e.target.value)
                               resetErrorStyles()
                           }}
                           placeholder={!isFocused && props.placeholder}
                           onFocus={() => setIsFocused(true)}
                           onBlur={() => setIsFocused(false)}
                    />
                    {hasError && <div className={'validation-msg'}>{props.error}</div>}
                </div>
            </div>
        </div>
    );
}