import React from "react";
import {useTranslation} from "react-i18next";

export const FormHeader = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'form-header'}>
            <div className={'form-header-title'}>{props.headerTitle}</div>
            <div className={'form-header-top-buttons'}>
                <button className={'add-new-button cancel'}
                        onClick={props.onAdd}>
                    {t('cancel')}
                </button>
                <button className={'add-new-button submit'}
                        onClick={props.onCancel}>
                    {t('save')}
                </button>
            </div>
        </div>
    );
}