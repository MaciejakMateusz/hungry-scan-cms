import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "../../../../locales/langUtils";
import {MenuItemFormTemplate} from "../../form-components/MenuItemFormTemplate";
import {
    clearAllergens,
    clearForm, clearLabels,
    getAllergens,
    getLabels,
    postDish,
    postImage,
    setAvailable,
    setBanner,
    setCategory,
    setCategoryId,
    setChosenAllergens,
    setChosenLabels,
    setDescription,
    setDisplayOrder,
    setErrorData,
    setErrorMessage,
    setFileName,
    setId,
    setName,
    setPrice,
    setVariants
} from "../../../../slices/dishFormSlice";
import {
    setEditDishFormActive,
    setSubmittedSuccessType
} from "../../../../slices/dishesCategoriesSlice";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {imagesPath} from "../../../../apiData";
import {MenuItemMobilePreview} from "./MenuItemMobilePreview";
import {clearAdditions, fetchIngredients, setChosenAdditions} from "../../../../slices/dishAdditionsSlice";

export const EditMenuItemForm = ({executeFilter}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category, dish, filterValue} = useSelector(state => state.dishesCategories.view);
    const [file, setFile] = useState(null);
    const {
        banner,
        errorMessage,
        errorData
    } = useSelector(state => state.dishForm.form);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(`${imagesPath}/${dish.imageName}`);
            if (response.ok) {
                const blob = await response.blob();
                const file = new File([blob], dish.imageName, {type: blob.type});
                setFile(file);
                dispatch(setFileName(file.name));
            }
        };
        fetchImage().catch(error => console.log(error));
    }, [dish, dispatch]);

    useEffect(() => {
        const setInitialFormState = () => {
            let dishBanner;
            if (dish.bestseller) {
                dishBanner = t('isBestseller')
            } else if (dish.new) {
                dishBanner = t('isNew')
            } else {
                dishBanner = null;
            }

            dispatch(fetchIngredients());
            dispatch(getAllergens());
            dispatch(getLabels());

            dispatch(setBanner(dishBanner ? {value: dishBanner, label: dishBanner} : dishBanner));
            dispatch(setCategoryId(dish.categoryId));
            dispatch(setCategory(category));
            dispatch(setDisplayOrder(dish.displayOrder));
            dispatch(setId(dish.id));
            dispatch(setName(dish.name.defaultTranslation));
            dispatch(setDescription(dish.description.defaultTranslation));
            dispatch(setVariants(dish.variants));
            dispatch(setPrice(dish.price.toFixed(2)));
            dispatch(setAvailable(dish.available));
            dispatch(setChosenLabels(dish.labels?.map(label => ({value: label, label: getTranslation(label.name)}))));
            dispatch(setChosenAllergens(dish.allergens?.map(allergen => ({value: allergen, label: getTranslation(allergen.name)}))));
            dispatch(setChosenAdditions(dish.additionalIngredients?.map(addition => ({value: addition, label: getTranslation(addition.name)}))));
        }
        setInitialFormState();
    }, []);

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(clearAllergens());
        dispatch(clearAdditions());
        dispatch(clearLabels());
        dispatch(setEditDishFormActive(false));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        const imageAction = await dispatch(postImage({file: file}));
        if(postImage.fulfilled.match(imageAction)) {
            dispatch(setFileName(file && file.name));
        } else if(postImage.rejected.match(imageAction)) {
            dispatch(setErrorData(imageAction.payload));
            dispatch(setErrorMessage(imageAction.payload));
            return;
        }

        const newBanner = banner && banner.value === t("isNew");
        const bestsellerBanner = banner && banner.value === t("isBestseller");
        const dishAction = await dispatch(postDish({new: newBanner, bestseller: bestsellerBanner}));
        if(postDish.fulfilled.match(dishAction)) {
            dispatch(setSubmittedSuccessType('dish-edit'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setEditDishFormActive(false));
            dispatch(clearForm());
            executeFilter(filterValue);
        } else if(postDish.rejected.match(dishAction)) {
            dispatch(setErrorData(dishAction.payload));
            dispatch(setErrorMessage(dishAction.payload));
        }
    };

    return (
        <div className={'translation-background'}>
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
                    <MenuItemMobilePreview/>
                </div>
            </div>
        </div>
    );
}