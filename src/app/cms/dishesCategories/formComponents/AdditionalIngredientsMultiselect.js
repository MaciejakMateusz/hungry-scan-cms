import React from "react";
import {useTranslation} from "react-i18next";

export const AdditionalIngredientsMultiselect = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-addition'} className={'form-label'}>
                    {t('additions')} <span className={'form-optional'}>{t('optional')}:</span>
                </label>
                <button id={'dish-addition'}
                        className={'form-field advanced-view'}
                        onClick={() => props.onClick(true)}>
                    {props.chosenAdditions.length === 0 ?
                        <span>{t('choose')}</span> :
                        <span>{t('chosenIngr')} ({props.chosenAdditions.length})</span>}
                </button>
            </div>
        </div>
    );
}