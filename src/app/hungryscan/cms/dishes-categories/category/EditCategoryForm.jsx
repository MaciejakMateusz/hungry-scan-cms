import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    postCategory,
    setAvailable,
    setCategoryUpdated,
    setDishes,
    setDisplayOrder,
    setErrorData,
    setErrorMessage,
    setId,
    setName
} from "../../../../../slices/categoryFormSlice";
import {setEditCategoryFormActive} from "../../../../../slices/dishesCategoriesSlice";
import {getTranslation} from "../../../../../locales/langUtils";
import {CategoryForm} from "./CategoryForm";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";

export const EditCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories.view);
    const transformName = useTranslatableTransformer({obj: category, key: 'name'});
    const renderConfirmation = useConfirmationMessage(setCategoryUpdated);

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
        e.preventDefault();
        const resultAction = await dispatch(postCategory({action: 'update', transformName: transformName}));
        if (postCategory.fulfilled.match(resultAction)) {
            dispatch(setEditCategoryFormActive(false));
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