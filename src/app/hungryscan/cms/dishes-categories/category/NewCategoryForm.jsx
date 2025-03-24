import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {CategoryFormTemplate} from "./CategoryFormTemplate";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    getCategoriesDisplayOrders, postCategory, setDisplayOrderLabel,
    setDisplayOrders,
    setDisplayOrderValue, setErrorData, setErrorMessage
} from "../../../../../slices/categoryFormSlice";
import {
    setNewCategoryFormActive,
    setSubmittedSuccessType
} from "../../../../../slices/dishesCategoriesSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";

export const NewCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {errorData, errorMessage} = useSelector(state => state.categoryForm.form);

    useEffect(() => {
        const prepareDisplayOrders = async () => {
            const resultAction = await dispatch(getCategoriesDisplayOrders());
            if (getCategoriesDisplayOrders.fulfilled.match(resultAction)) {
                dispatch(setDisplayOrders([...resultAction.payload, resultAction.payload.length + 1]));
                const initialDisplayOrder = resultAction.payload.length + 1;
                dispatch(setDisplayOrderValue(initialDisplayOrder));
                dispatch(setDisplayOrderLabel(initialDisplayOrder));
            }
        }
        prepareDisplayOrders();
    }, [dispatch, t]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postCategory());
        if (postCategory.fulfilled.match(resultAction)) {
            dispatch(setSubmittedSuccessType('category-save'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setNewCategoryFormActive(false));
            dispatch(clearForm());
        } else if (postCategory.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload));
            dispatch(setErrorMessage(resultAction.payload));
        }
    };

    return (
        <div className={'background'}>
            <div className={'translations-padded-view-container'}>
                {errorMessage ? <FormErrorDialog error={errorData} resetMessage={() => dispatch(setErrorMessage(null))} /> : null}
                <div className={'form-grid category'}>
                    <form className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {t('createNewCategory')}
                        </div>
                        <div className={'menu-item-form'}>
                            <CategoryFormTemplate/>
                        </div>
                        <div className={'form-footer category'}>
                            <div className={'general-button cancel'}
                                 onClick={() => {
                                     dispatch(clearForm());
                                     dispatch(setNewCategoryFormActive(false));
                                 }}>
                                {t('cancel')}
                            </div>
                            <div className={'general-button submit'} onClick={handleFormSubmit}>{t('save')}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}