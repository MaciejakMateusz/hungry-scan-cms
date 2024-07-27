import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setIsAdditionsViewActive} from "../../../../slices/dishFormSlice";

export const AdditionalIngredientsMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {chosenAdditions} = useSelector(state => state.dishForm.form);
    
    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-addition'} className={'form-label'}>
                    {t('additions')} <span className={'form-optional'}>{t('optional')}:</span>
                </label>
                <button id={'dish-addition'}
                        className={'form-field advanced-view'}
                        onClick={() => dispatch(setIsAdditionsViewActive(true))}>
                    {chosenAdditions.length === 0 ?
                        <span>{t('choose')}</span> :
                        <span>{t('chosenIngr')} ({chosenAdditions.length})</span>}
                </button>
            </div>
        </div>
    );
}