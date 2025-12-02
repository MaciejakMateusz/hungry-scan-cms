import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {formatPrice} from "../../../../utils/utils";
import {useDispatch} from "react-redux";

export const PriceField = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);

    const resetErrorStyles = () => {
        dispatch(props.errorSetter({...props.error, [props.id]: null}));
    }

    const handlePriceChange = (e) => {
        if (e.target.value.length > 5) {
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
            <div className={'form-field-container price'}>
                <label htmlFor={props.id} className="form-label">
                    {props.priceLabel || t('price')} *
                </label>
                <span className={'price-input-wrapper'}>
                    <div>
                        <input type={'text'}
                               id={props.id}
                               placeholder={isFocused ? '' : '0.00'}
                               name={'price'}
                               className={`form-field price ${props.error?.[props.id] ? 'error' : ''}`}
                               value={props.value}
                               onChange={handlePriceChange}
                               onFocus={() => setIsFocused(true)}
                               onBlur={(e) => handleBlur(e)}
                        />
                        {props.error?.[props.id] && <div className={'validation-msg'}>{props.error[props.id]}</div>}
                    </div>
                    <span className={'price-input-currency'}>PLN</span>
                </span>
            </div>
        </div>
    );
}