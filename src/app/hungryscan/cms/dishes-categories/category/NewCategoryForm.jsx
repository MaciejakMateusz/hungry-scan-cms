import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {clearForm, postCategory, setErrorData, setErrorMessage, setName} from "../../../../../slices/categoryFormSlice";
import {setNewCategoryFormActive, setSubmittedSuccessType} from "../../../../../slices/dishesCategoriesSlice";
import {CategoryForm} from "./CategoryForm";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";

export const NewCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories.view);
    const transformName = useTranslatableTransformer({obj: category, key: 'name'});

    const handleFormSubmit = async e => {
        e.preventDefault();
        const resultAction = await dispatch(postCategory({action: 'add', transformName: transformName}));
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

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(setNewCategoryFormActive(false));
    }

    return (
        <CategoryForm formHeader={t('createNewCategory')}
                      onFormSubmit={handleFormSubmit}
                      onFormDiscard={handleFormDiscard}/>
    );
}