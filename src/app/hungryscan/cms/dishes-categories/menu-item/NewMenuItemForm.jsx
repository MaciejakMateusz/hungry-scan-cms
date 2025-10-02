import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {MenuItemFormTemplate} from "../../form-components/MenuItemFormTemplate";
import {
    getAllergens,
    getBanners,
    getLabels,
    postDish,
    setCategory,
    setErrorData,
    setErrorMessage
} from "../../../../../slices/dishFormSlice";
import {setNewDishFormActive, setSubmittedSuccessType} from "../../../../../slices/dishesCategoriesSlice";
import {fetchIngredients} from "../../../../../slices/dishAdditionsSlice";
import {useClearForm} from "../../../../../hooks/useClearForm";
import {MenuItemFormWrapper} from "./MenuItemFormWrapper";
import {Variants} from "./variants/Variants";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";

export const NewMenuItemForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeTab} = useSelector(state => state.dishForm.form);
    const {category} = useSelector(state => state.dishesCategories.view);
    const clearForm = useClearForm();
    const [file, setFile] = useState(null);
    const translatableTransformers = {
        transformName: useTranslatableTransformer({obj: null, key: 'name'}),
        transformDescription: useTranslatableTransformer({obj: null, key: 'description'})
    };

    useEffect(() => {
        dispatch(setCategory(category));
        dispatch(fetchIngredients());
        dispatch(getAllergens());
        dispatch(getLabels());
        dispatch(getBanners());
    }, [category, dispatch]);

    const handleFormDiscard = () => {
        clearForm();
        dispatch(setNewDishFormActive(false));
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        dispatch(setErrorMessage(null));

        const dishAction = await dispatch(postDish({
            action: "add",
            file: file,
            translatableTransformers: translatableTransformers
        }));
        if (postDish.fulfilled.match(dishAction)) {
            dispatch(setSubmittedSuccessType('dish-save'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setNewDishFormActive(false));
            clearForm();
        } else if (postDish.rejected.match(dishAction)) {
            dispatch(setErrorData(dishAction.payload));
            dispatch(setErrorMessage(dishAction.payload));
        }
    };

    const renderFormView = () => {
        switch (activeTab) {
            case 'information':
                return (<MenuItemFormTemplate setFile={setFile}/>);
            case 'variants':
                return (<Variants/>);
            default:
                return (<MenuItemFormTemplate setFile={setFile}/>);
        }
    }

    return (
        <MenuItemFormWrapper title={t('addingNewDishToCategory')}
                             onFormDiscard={handleFormDiscard}
                             onFormSubmit={handleFormSubmit}>
            {renderFormView()}
        </MenuItemFormWrapper>
    );
}