import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {CategoryFormTemplate} from "./formComponents/CategoryFormTemplate";
import {FormHeader} from "./formComponents/FormHeader";
import {getTranslation} from "../../../locales/langUtils";
import {useDispatch, useSelector} from "react-redux";
import {setEditCategoryFormActive, setSubmittedSuccessType} from "../../../slices/dishesCategoriesSlice";
import {
    clearForm, getCategoriesDisplayOrders,
    postCategory,
    setAvailable,
    setDisplayOrder,
    setDisplayOrders,
    setErrorData,
    setId,
    setName
} from "../../../slices/categoryFormSlice";

export const EditCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories);

    useEffect(() => {
        console.log('No sie renderuje sie no')
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
            dispatch(setAvailable({
                value: category.available,
                label: category.available ? t('availableCategory') : t('unavailableCategory')
            }));
            dispatch(setDisplayOrder({
                value: category.displayOrder,
                label: category.displayOrder
            }));
        }
        setFormInitialState();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postCategory());
        if (postCategory.fulfilled.match(resultAction)) {
            dispatch(setSubmittedSuccessType('category-edit'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setEditCategoryFormActive(false));
            dispatch(clearForm());
        } else if (postCategory.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload))
        }
    };

    return (
        <form onSubmit={handleFormSubmit}
              className={'form-container'}>
            <div className={'form-grid'}>
                <FormHeader headerTitle={`${t('editCategory')}"${getTranslation(category.name)}"`}
                            onAdd={handleFormSubmit}
                            onCancel={() => dispatch(setEditCategoryFormActive(false))}/>
                <CategoryFormTemplate/>
            </div>
        </form>
    );
}