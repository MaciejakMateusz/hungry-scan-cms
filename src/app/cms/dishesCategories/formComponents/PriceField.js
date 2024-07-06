import React from "react";
import {useTranslation} from "react-i18next";

export const PriceField = (props) => {
    const {t} = useTranslation();
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
                       className={'form-field price'}
                       value={props.form.price}
                       onChange={props.onChange}/>
            </div>
        </div>
    );
}