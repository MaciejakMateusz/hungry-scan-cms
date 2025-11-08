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
import {CategoryForm} from "./CategoryForm";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";
import {useGetTranslation} from "../../../../../hooks/useGetTranslation";

export const EditCategoryForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const getTranslation = useGetTranslation();
    const {category} = useSelector(state => state.dishesCategories.view);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {name} = useSelector(state => state.categoryForm.form);
    const transformName = useTranslatableTransformer({obj: category, key: 'name'});
    const renderConfirmation = useConfirmationMessage(setCategoryUpdated);

    useEffect(() => {
        const setFormInitialState = () => {
            const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
            dispatch(setId(category.id));
            dispatch(setName(category.name[restaurantLanguage]));
            dispatch(setDishes(category.menuItems))
            dispatch(setAvailable(category.available));
            dispatch(setDisplayOrder({
                value: category.displayOrder,
                label: category.displayOrder
            }));
        }
        setFormInitialState();
    }, [restaurant?.value.settings.language]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        const resultAction = await dispatch(postCategory({action: 'update', transformName: transformName}));
        const isNameBlank = !name || name.trim().length === 0;
        if (isNameBlank) {
            dispatch(setErrorData({name: t('constraints.NotBlank')}));
            return;
        }
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
            <div className={'text-ellipsis'} style={{maxWidth: '50vw'}}>
                {t('editCategory')}&nbsp;
                <span style={{color: '#6940C6'}}>
                    {getTranslation(category.name)}
                </span>
            </div>
        );
    }

    return (
        <CategoryForm formHeader={<FormHeader/>}
                      onFormSubmit={handleFormSubmit}
                      onFormDiscard={handleFormDiscard}/>
    );
}