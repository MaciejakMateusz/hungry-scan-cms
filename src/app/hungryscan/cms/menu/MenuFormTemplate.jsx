import {NameField} from "../form-components/NameField";
import {setName} from "../../../../slices/menuSlice";
import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

export const MenuFormTemplate = ({formHeader, discardHandler, submitHandler, errorData}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.menu.form);

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'variant-form-dialog '}>
                <div className={'variant-form-dialog-content'}>
                    <h4>{formHeader}</h4>
                    <NameField id={'menu-name'}
                               value={name}
                               onChange={(e) => dispatch(setName(e))}
                               error={errorData}
                    />
                </div>
                <div className={'variant-dialog-footer'}>
                    <button className={'general-button cancel'} onClick={discardHandler}>
                        {t('cancel')}
                    </button>
                    <form style={{all: 'unset'}} onSubmit={submitHandler}>
                        <button type="submit" className={'general-button'}>{t('save')}</button>
                    </form>
                </div>
            </div>
        </>
    );
}