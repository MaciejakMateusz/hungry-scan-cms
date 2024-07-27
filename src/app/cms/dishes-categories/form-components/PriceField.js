import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const PriceField = (props) => {
    const {t} = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(props.error.price);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.error.price && props.value < 1.00)
    }, [props.error, props.value]);

    const handleBlur = () => {
        setIsFocused(false);
        let value = props.value;
        if (value) {
            value = value.replace(/,/g, '.').replace(/[^\d.]/g, '');
            value = parseFloat(value);
            if (!isNaN(value)) {
                value = value.toFixed(2);
                props.setPrice(value);
            } else {
                props.setPrice('0.00');
            }
        } else {
            props.setPrice('0.00');
        }
    };

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className="form-label">
                    {t('price')}:
                </label>
                <input type={'text'}
                       id={props.id}
                       placeholder={isFocused ? '' : '0.00'}
                       name={'price'}
                       className={`form-field price ${hasError ? 'error' : ''}`}
                       value={props.value}
                       onChange={(e) => {
                           props.setPrice(e.target.value)
                           resetErrorStyles()
                       }}
                       onFocus={() => setIsFocused(true)}
                       onBlur={(e) => handleBlur(e)}
                />
            </div>
        </div>
    );
}