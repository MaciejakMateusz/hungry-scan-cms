import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../shared-components/InformationTooltip";

export const DescriptionField = (props) => {
    const {t} = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(props.error?.description);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.error?.description && props.value.length > 255)
    }, [props.error, props.value]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container description'}>
                <label htmlFor={'dish-description'} className={'form-label description'}>
                    <InformationTooltip text={t('descriptionFieldTooltip')}/>
                    {t('description')}
                </label>
                <div className={'full-width'}>
                    <textarea
                        className={`form-field description ${hasError ? 'error' : ''}`}
                        id={'dish-description'}
                        name={'description'}
                        value={props.value}
                        onChange={(e) => {
                            props.onChange(e.target.value);
                            resetErrorStyles();
                        }}
                        placeholder={isFocused ? '' : t('type')}
                        maxLength={255}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {hasError && <div className={'validation-msg'}>{props.error?.description}</div>}
                </div>
            </div>
        </div>
    );
}