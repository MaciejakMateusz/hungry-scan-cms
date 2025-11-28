import React from "react";
import {useTranslation} from "react-i18next";

export const LogicalToggleField = ({
                                       id,
                                       name,
                                       value,
                                       onChange,
                                       customMessageFalse,
                                       customMessageTrue}) => {
    const {t} = useTranslation();

    const renderLabel = () => {
        if (!name) return;
        return (
            <label htmlFor={id} className={'form-label'}>
                {name}
            </label>
        );
    }

    const renderMessage = () => {
        if (!customMessageTrue || !customMessageFalse) {
            return value ? t('visibleInMenu') : t('invisibleInMenu');
        }
        return value ? customMessageTrue : customMessageFalse;
    }

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                {renderLabel()}
                <div className={'flex-centered'}>
                    <div className="toggle-switch">
                        <input type="checkbox"
                               id={id}
                               name={id}
                               value={value}
                               onChange={onChange}
                               checked={value}/>
                        <label htmlFor={id} className="toggle-label"></label>
                    </div>
                    <span className={'menu-visibility-msg'}>
                    {renderMessage()}
                </span>
                </div>
            </div>
        </div>
    );
}