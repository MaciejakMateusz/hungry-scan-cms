import React from "react";
import {useTranslation} from "react-i18next";
import {CategoryFormTemplate} from "./CategoryFormTemplate";
import {useDispatch, useSelector} from "react-redux";
import {setErrorMessage} from "../../../../../slices/categoryFormSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {LoadingSpinner} from "../../../../icons/LoadingSpinner";

export const CategoryForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {errorData, errorMessage} = useSelector(state => state.categoryForm.form);
    const {isLoading} = useSelector(state => state.categoryForm.postCategory);


    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                {errorMessage && <FormErrorDialog error={errorData}
                                                  resetMessage={() => dispatch(setErrorMessage(null))}/>}
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
                            <div className={'general-button'}
                                 onClick={onFormSubmit}>
                                {isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                            </div>
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