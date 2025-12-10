import React, {useState} from "react";
import {InformationTooltip} from "../cms/shared-components/InformationTooltip";
import {useDispatch} from "react-redux";

export const GenericField = (props) => {
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);

    const resetErrorStyles = () => {
        dispatch(props.errorSetter({...props.error, [props.id]: null}))
    }

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className={'form-label'}>
                    {props.tooltip && <InformationTooltip text={props.tooltip}/>}
                    {props.name} {props.required && '*'}
                </label>
                <div className={'full-width'}>
                    <input type={props.type}
                           className={`form-field name ${props.error?.[props.id] ? 'error' : ''}`}
                           id={props.id}
                           name={props.id}
                           readOnly={props.readOnly}
                           disabled={props.disabled}
                           value={props.value ?? ''}
                           onChange={(e) => {
                               props.onChange(e);
                               resetErrorStyles();
                           }}
                           placeholder={!isFocused ? props.placeholder : ''}
                           onFocus={() => setIsFocused(true)}
                           onBlur={() => setIsFocused(false)}
                    />
                    {props.error?.[props.id] && <div className={'validation-msg'}>{props.error[props.id]}</div>}
                </div>
            </div>
        </div>
    );
}