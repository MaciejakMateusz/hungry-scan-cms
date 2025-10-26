import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    postCategory,
    setCategoryCreated,
    setErrorData,
    setErrorMessage
} from "../../../../../slices/categoryFormSlice";
import {setNewCategoryFormActive} from "../../../../../slices/dishesCategoriesSlice";
import {CategoryForm} from "./CategoryForm";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";

export const NewCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.categoryForm.form);
    const transformName = useTranslatableTransformer({obj: null, key: 'name'});
    const renderConfirmation = useConfirmationMessage(setCategoryCreated);

    const handleFormSubmit = async e => {
        e.preventDefault();
        const isNameBlank = !name || name.trim().length === 0;
        if (isNameBlank) {
            dispatch(setErrorData({name: t('constraints.NotBlank')}));
            return;
        }
        const resultAction = await dispatch(postCategory({action: 'add', transformName: transformName}));
        if (postCategory.fulfilled.match(resultAction)) {
            dispatch(setNewCategoryFormActive(false));
            dispatch(clearForm());
            dispatch(setErrorData(null));
            renderConfirmation();
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