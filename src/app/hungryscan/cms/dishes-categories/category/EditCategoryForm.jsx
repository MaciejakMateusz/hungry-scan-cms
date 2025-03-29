import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {CategoryFormTemplate} from "./CategoryFormTemplate";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    getCategoriesDisplayOrders,
    postCategory,
    setAvailable,
    setDishes,
    setDisplayOrder,
    setDisplayOrders,
    setErrorData,
    setErrorMessage,
    setId,
    setName
} from "../../../../../slices/categoryFormSlice";
import {
    setEditCategoryFormActive,
    setSubmittedSuccessType
} from "../../../../../slices/dishesCategoriesSlice";
import {getTranslation} from "../../../../../locales/langUtils";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";

export const EditCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories.view);
    const {errorData, errorMessage} = useSelector(state => state.categoryForm.form);

    useEffect(() => {
        const prepareDisplayOrders = async () => {
            const resultAction = await dispatch(getCategoriesDisplayOrders());
            if (getCategoriesDisplayOrders.fulfilled.match(resultAction)) {
                dispatch(setDisplayOrders(resultAction.payload));
            }
        }
        prepareDisplayOrders();
    }, [dispatch]);

    useEffect(() => {
        const setFormInitialState = () => {
            dispatch(setId(category.id));
            dispatch(setName(category.name.defaultTranslation));
            dispatch(setDishes(category.menuItems))
            dispatch(setAvailable(category.available));
            dispatch(setDisplayOrder({
                value: category.displayOrder,
                label: category.displayOrder
            }));
        }
        setFormInitialState();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postCategory({action: "update"}));
        if (postCategory.fulfilled.match(resultAction)) {
            dispatch(setSubmittedSuccessType('category-edit'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setEditCategoryFormActive(false));
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
                            {t('editCategory')}&nbsp;
                            <span style={{color: '#6940C6'}}>"{getTranslation(category.name)}"</span>
                        </div>
                        <div className={'menu-item-form'}>
                            <CategoryFormTemplate/>
                        </div>
                        <div className={'form-footer category'}>
                            <div className={'general-button cancel'}
                                 onClick={() => {
                                     dispatch(clearForm());
                                     dispatch(setEditCategoryFormActive(false));
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