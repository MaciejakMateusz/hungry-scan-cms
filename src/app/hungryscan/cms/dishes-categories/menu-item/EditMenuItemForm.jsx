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
    setErrorMessage,
    setId,
    setName,
    setPrice,
    setVariants
} from "../../../../../slices/dishFormSlice";
import {setEditDishFormActive, setSubmittedSuccessType} from "../../../../../slices/dishesCategoriesSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {MenuItemMobilePreview} from "./MenuItemMobilePreview";
import {fetchIngredients, setChosenAdditions} from "../../../../../slices/dishAdditionsSlice";
import {useClearForm} from "../../../../../hooks/useClearForm";

export const EditMenuItemForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category, dish} = useSelector(state => state.dishesCategories.view);
    const clearForm = useClearForm();
    const {data} = useSelector(state => state.dishForm.fetchMenuItem);
    const item = data?.menuItemFormDTO
    const [file, setFile] = useState(null);
    const {errorMessage, errorData} = useSelector(state => state.dishForm.form);

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
            dispatch(setName(item.name.defaultTranslation));
            dispatch(setDescription(item.description.defaultTranslation));
            dispatch(setVariants(item.variants));
            dispatch(setPrice(item.price.toFixed(2)));
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
        }
        setInitialFormState();
    }, [dispatch, item]);

    const handleFormDiscard = () => {
        clearForm();
        dispatch(setEditDishFormActive(false));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        const dishAction = await dispatch(postDish({action: "update", file: file}));
        if (postDish.fulfilled.match(dishAction)) {
            dispatch(setSubmittedSuccessType('dish-edit'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setEditDishFormActive(false));
            clearForm();
        } else if (postDish.rejected.match(dishAction)) {
            dispatch(setErrorData(dishAction.payload));
            dispatch(setErrorMessage(dishAction.payload));
        }
    };

    return (
        <div className={'background'}>
            {errorMessage ? <FormErrorDialog error={errorData} resetMessage={setErrorMessage}/> : null}
            <div className={'translations-padded-view-container'}>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {t('editingDishInCategory')}:&nbsp;&nbsp;
                            <span style={{color: '#6940C6'}}> "{getTranslation(category?.name)}"</span>
                        </div>
                        <form className={'menu-item-form'}>
                            <MenuItemFormTemplate setFile={setFile} isNewPosition={true}/>
                            <div className={'form-footer'}>
                                <div className={'general-button cancel'}
                                     onClick={handleFormDiscard}>
                                    {t('cancel')}
                                </div>
                                <div className={'general-button submit'} onClick={handleFormSubmit}>{t('save')}</div>
                            </div>
                        </form>
                    </div>
                    <MenuItemMobilePreview image={file}/>
                </div>
            </div>
        </div>
    );
}