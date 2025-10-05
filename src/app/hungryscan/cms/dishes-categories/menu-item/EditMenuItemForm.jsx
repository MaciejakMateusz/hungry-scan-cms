import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "../../../../../locales/langUtils";
import {MenuItemFormTemplate} from "../../form-components/MenuItemFormTemplate";
import {
    fetchMenuItem,
    getAllergens,
    getBanners,
    getLabels,
    postDish,
    setAvailable,
    setCategory,
    setCategoryId,
    setChosenAllergens,
    setChosenBanners,
    setChosenLabels,
    setCreated,
    setCreatedBy,
    setDescription,
    setDisplayOrder,
    setErrorData,
    setErrorMessage, setHasImage,
    setId,
    setName,
    setPrice,
    setPromoPrice, setUpdated,
    setVariants
} from "../../../../../slices/dishFormSlice";
import {setEditDishFormActive, setSubmittedSuccessType} from "../../../../../slices/dishesCategoriesSlice";
import {fetchIngredients, setChosenAdditions} from "../../../../../slices/dishAdditionsSlice";
import {useClearForm} from "../../../../../hooks/useClearForm";
import {MenuItemFormWrapper} from "./MenuItemFormWrapper";
import {Variants} from "./variants/Variants";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";
import {useImageExists} from "../../../../../hooks/useImageExists";

export const EditMenuItemForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category, dish} = useSelector(state => state.dishesCategories.view);
    const {activeTab} = useSelector(state => state.dishForm.form);
    const clearForm = useClearForm();
    const {data} = useSelector(state => state.dishForm.fetchMenuItem);
    const item = data?.menuItemFormDTO;
    const [file, setFile] = useState(null);
    const imageExists = useImageExists(dish?.id ?? 0);
    const translatableTransformers = {
        transformName: useTranslatableTransformer({obj: dish, key: 'name'}),
        transformDescription: useTranslatableTransformer({obj: dish, key: 'description'})
    };

    useEffect(() => {
        dispatch(fetchMenuItem({id: dish?.id}));
    }, [dispatch, dish]);

    useEffect(() => {
        const setInitialFormState = () => {
            if (!item) return;

            dispatch(fetchIngredients());
            dispatch(getAllergens());
            dispatch(getLabels());
            dispatch(getBanners());

            dispatch(setId(item.id));
            dispatch(setCategoryId(item.categoryId));
            dispatch(setCategory(category));
            dispatch(setDisplayOrder(item.displayOrder));
            dispatch(setName(getTranslation(item.name)));
            dispatch(setDescription(getTranslation(item.description)));
            dispatch(setVariants(item.variants));
            dispatch(setPrice(item.price.toFixed(2)));
            dispatch(setPromoPrice(item.promoPrice?.toFixed(2)));
            dispatch(setAvailable(item.available));
            dispatch(setChosenBanners(item.banners?.map(banner => ({
                value: banner,
                label: getTranslation(banner.name)
            }))));
            dispatch(setChosenLabels(item.labels?.map(label => ({
                value: label,
                label: getTranslation(label.name)
            }))));
            dispatch(setChosenAllergens(item.allergens?.map(allergen => ({
                value: allergen,
                label: getTranslation(allergen.name)
            }))));
            dispatch(setChosenAdditions(item.additionalIngredients?.map(addition => ({
                value: addition,
                label: getTranslation(addition.name)
            }))));
            dispatch(setCreated(item.created));
            dispatch(setCreatedBy(item.createdBy));
            dispatch(setUpdated(item.updated));
            dispatch(setHasImage(imageExists));
        }
        setInitialFormState();
    }, [dispatch, item, category, imageExists]);

    const handleFormDiscard = () => {
        clearForm();
        setFile(null);
        dispatch(setEditDishFormActive(false));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        dispatch(setErrorMessage(null));

        const dishAction = await dispatch(postDish({
            action: 'update',
            file: file,
            translatableTransformers: translatableTransformers
        }));
        if (postDish.fulfilled.match(dishAction)) {
            dispatch(setSubmittedSuccessType('dish-edit'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setEditDishFormActive(false));
            clearForm();
            setFile(null);
        } else if (postDish.rejected.match(dishAction)) {
            dispatch(setErrorData(dishAction.payload));
            dispatch(setErrorMessage(dishAction.payload));
        }
    };

    const renderFormView = () => {
        switch (activeTab) {
            case 'information':
                return (<MenuItemFormTemplate setFile={setFile} file={file}/>);
            case 'variants':
                return (<Variants/>);
            default:
                return (<MenuItemFormTemplate setFile={setFile} file={file}/>);
        }
    }

    return (
        <MenuItemFormWrapper title={t('editingDishInCategory')}
                             onFormSubmit={handleFormSubmit}
                             onFormDiscard={handleFormDiscard}>
            {renderFormView()}
        </MenuItemFormWrapper>
    );
}