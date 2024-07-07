import React, {useState} from "react";
import {useTranslation} from "react-i18next";

export const DescriptionField = (props) => {
    const {t} = useTranslation();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-description'} className={'form-label'}>
                    {t('description')}:
                </label>
                <textarea
                    className={'form-field description'}
                    id={'dish-description'}
                    name={'description'}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={isFocused ? '' : t('type')}
                    onFocus={handleFocus}
                    onBlur={handleBlur}/>
            </div>
        </div>
    );
}