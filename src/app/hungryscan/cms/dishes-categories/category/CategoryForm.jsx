import React from "react";
import {useTranslation} from "react-i18next";
import {CategoryFormTemplate} from "./CategoryFormTemplate";
import {useDispatch, useSelector} from "react-redux";
import {setErrorMessage} from "../../../../../slices/categoryFormSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";

export const CategoryForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {errorData, errorMessage} = useSelector(state => state.categoryForm.form);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                {errorMessage ?
                    <FormErrorDialog error={errorData}
                                     resetMessage={() => dispatch(setErrorMessage(null))}/>
                    : null}
                <div className={'functions-header'}>
                    <div className={'section-heading'}>
                        {formHeader}
                    </div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'form-footer'}>
                            <div className={'general-button cancel'}
                                 onClick={onFormDiscard}>
                                {t('cancel')}
                            </div>
                            <div className={'general-button'} onClick={onFormSubmit}>{t('save')}</div>
                        </div>
                    </div>
                </div>
                <div className={'form-grid category'}>
                    <form className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {formHeader}
                        </div>
                        <div className={'padded-form-container'}>
                            <CategoryFormTemplate/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}