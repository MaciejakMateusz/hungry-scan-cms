import React from "react";
import {useTranslation} from "react-i18next";

export const LogicalToggleField = ({id, name, value, onChange}) => {
    const {t} = useTranslation();

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={id} className={'form-label'}>
                    {name}
                </label>
                <div className="toggle-switch">
                    <input type="checkbox" id={id} name={id} value={value} onChange={onChange} checked={value}/>
                    <label htmlFor={id} className="toggle-label"></label>
                </div>
                <span className={'menu-visibility-msg'}>{value ? t('visibleInMenu') : t('invisibleInMenu')}</span>
            </div>
        </div>
    );
}