import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const NameField = (props) => {
    const {t} = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(props.error.name);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.error.name && !props.value)
    }, [props.error, props.value]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className={'form-label'}>
                    {t('name')}:
                </label>
                <textarea className={`form-field name ${hasError ? 'error' : ''}`}
                          id={props.id}
                          name={'name'}
                          value={props.value}
                          onChange={(e) => {
                              props.onChange(e)
                              resetErrorStyles()
                          }}
                          placeholder={isFocused ? '' : `${t('name')}...`}
                          onFocus={handleFocus}
                          onBlur={handleBlur}/>
            </div>
        </div>
    );
}