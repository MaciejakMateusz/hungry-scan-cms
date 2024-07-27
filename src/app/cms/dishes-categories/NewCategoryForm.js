import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {FormHeader} from "./form-components/FormHeader";
import {CategoryFormTemplate} from "./form-components/CategoryFormTemplate";
import {useDispatch, useSelector} from "react-redux";
import {setNewCategoryFormActive, setSubmittedSuccessType,} from "../../../slices/dishesCategoriesSlice";
import {
    clearForm,
    getCategoriesDisplayOrders,
    postCategory,
    setAvailable,
    setDisplayOrderLabel,
    setDisplayOrders,
    setDisplayOrderValue,
    setErrorData,
    setErrorMessage
} from "../../../slices/categoryFormSlice";
import {FormErrorDialog} from "../../error/FormErrorDialog";

export const NewCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {errorData, errorMessage} = useSelector(state => state.categoryForm.form);

    useEffect(() => {
        const prepareDisplayOrders = async () => {
            const resultAction = await dispatch(getCategoriesDisplayOrders());
            if (getCategoriesDisplayOrders.fulfilled.match(resultAction)) {
                dispatch(setDisplayOrders(resultAction.payload));
                const initialDisplayOrder = resultAction.payload.length + 1;
                dispatch(setDisplayOrderValue(initialDisplayOrder));
                dispatch(setDisplayOrderLabel(initialDisplayOrder));
            }
        }
        prepareDisplayOrders();
        //todo jak ustawić pierwotny label żeby nie resetować wartości na true przy zmianie języka?
        dispatch(setAvailable({label: t('availableCategory'), value: true}));
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
        <form onSubmit={handleFormSubmit} className={'form-container'}>
            {errorMessage ? <FormErrorDialog error={errorData} resetMessage={() => dispatch(setErrorMessage(null))} /> : null}
            <div className={'form-grid'}>
                <FormHeader headerTitle={t('createNewCategory')}
                            onAdd={handleFormSubmit}
                            onCancel={() => {
                                dispatch(setNewCategoryFormActive(false));
                                dispatch(clearForm());
                            }} />
                <CategoryFormTemplate />
            </div>
        </form>
    );
}