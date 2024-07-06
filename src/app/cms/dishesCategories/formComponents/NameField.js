import React from "react";
import {useTranslation} from "react-i18next";

export const NameField = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'form-field-wrapper'}>
            <div className="form-field-container">
                <label htmlFor={props.id} className="form-label">
                    {t('name')}:
                </label>
                <textarea className="form-field name"
                          id={props.id}
                          name={'name'}
                          value={props.value}
                          onChange={props.onChange}
                          placeholder={`${t('name')}...`}/>
            </div>
        </div>
    );
}