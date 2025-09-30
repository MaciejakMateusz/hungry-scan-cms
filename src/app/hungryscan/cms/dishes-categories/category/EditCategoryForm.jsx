import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    postCategory,
    setAvailable,
    setDishes,
    setDisplayOrder,
    setErrorData,
    setErrorMessage,
    setId,
    setName
} from "../../../../../slices/categoryFormSlice";
import {setEditCategoryFormActive, setSubmittedSuccessType} from "../../../../../slices/dishesCategoriesSlice";
import {getTranslation} from "../../../../../locales/langUtils";
import {CategoryForm} from "./CategoryForm";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";

export const EditCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories.view);
    const transformName = useTranslatableTransformer({obj: category, key: 'name'});

    useEffect(() => {
        const setFormInitialState = () => {
            dispatch(setId(category.id));
            dispatch(setName(getTranslation(category.name)));
            dispatch(setDishes(category.menuItems))
            dispatch(setAvailable(category.available));
            dispatch(setDisplayOrder({
                value: category.displayOrder,
                label: category.displayOrder
            }));
        }
        setFormInitialState();
    }, []);

    const handleFormSubmit = async e => {
        console.log('submit')
        e.preventDefault();
        const resultAction = await dispatch(postCategory({action: 'update', transformName: transformName}));
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

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(setEditCategoryFormActive(false));
    }

    const FormHeader = () => {
        return (
            <div>
                {t('editCategory')}&nbsp;
                <span style={{color: '#6940C6'}}>"{getTranslation(category.name)}"</span>
            </div>
        );
    }

    return (
        <CategoryForm formHeader={<FormHeader/>}
                      onFormSubmit={handleFormSubmit}
                      onFormDiscard={handleFormDiscard}/>
    );
}