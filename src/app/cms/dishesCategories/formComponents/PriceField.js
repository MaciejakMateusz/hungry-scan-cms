import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const PriceField = (props) => {
    const {t} = useTranslation();
    const [hasError, setHasError] = useState(props.error.price);

    const resetErrorStyles = () => {
        setHasError(null);
    }

    useEffect(() => {
        setHasError(props.error.price && props.value < 1.00)
    }, [props.error, props.value]);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={props.id} className="form-label">
                    {t('price')}:
                </label>
                <input type={'number'}
                       id={props.id}
                       min={'0.00'}
                       step={'0.01'}
                       placeholder={'0.00'}
                       name={'price'}
                       className={`form-field price ${hasError ? 'error' : ''}`}
                       value={props.value}
                       onChange={(e) => {
                           props.onChange(e)
                           resetErrorStyles()
                       }}/>
            </div>
        </div>
    );
}