import React from "react";
import {useTranslation} from "react-i18next";

export const DescriptionField = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <div className={'form-field-container'}>
                    <label htmlFor={'dish-description'} className={'form-label'}>
                        {t('description')}:
                    </label>
                    <textarea
                        className={'form-field description'}
                        id={'dish-description'}
                        name={'description'}
                        value={props.form}
                        onChange={props.onChange}
                        placeholder={`${t('type')}`}/>
                </div>
            </div>
        </div>
    );
}