import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../shared-components/InformationTooltip";

export const NameField = (props) => {
    const {t} = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(props.error?.name);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.error?.name && (!props.value || props.value.length > 255))
    }, [props.error, props.value]);

    return (
        <>
            <div className={'form-field-wrapper'}>
                <div className={'form-field-container'}>
                    <label htmlFor={props.id} className={'form-label'}>
                        <InformationTooltip text={t('nameFieldTooltip')}/>
                        {t('name')} *
                    </label>
                    <div className={'full-width'}>
                        <input type={'text'}
                               className={`form-field name ${hasError && 'error'}`}
                               id={props.id}
                               name={'name'}
                               value={props.value}
                               onChange={(e) => {
                                   props.onChange(e.target.value)
                                   resetErrorStyles()
                               }}
                               placeholder={isFocused ? '' : t('addName')}
                               maxLength={255}
                               onFocus={() => setIsFocused(true)}
                               onBlur={() => setIsFocused(false)}/>
                        {hasError && <div className={'validation-msg'}>{props.error?.name}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}