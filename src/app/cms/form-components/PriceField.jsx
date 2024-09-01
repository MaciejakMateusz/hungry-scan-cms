import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {formatPrice} from "../../../utils";

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

    const handlePriceChange = (e) => {
        if(e.target.value.length > 5) {
            return;
        }
        props.setPrice(e.target.value)
        resetErrorStyles()
    }

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
                props.setPrice(formatPrice(0, true));
            }
        } else {
            props.setPrice(formatPrice(0, true));
        }
    };

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className="form-label">
                    {t('price')} *
                </label>
                <span className={'price-input-wrapper'}>
                    <input type={'text'}
                           id={props.id}
                           placeholder={isFocused ? '' : '0.00'}
                           name={'price'}
                           className={`form-field price ${hasError ? 'error' : ''}`}
                           value={props.value}
                           onChange={handlePriceChange}
                           onFocus={() => setIsFocused(true)}
                           onBlur={(e) => handleBlur(e)}
                    />
                    <span className={'price-input-currency'}>PLN</span>
                </span>
            </div>
        </div>
    );
}