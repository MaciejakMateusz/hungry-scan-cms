import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "../../../../../locales/langUtils";
import {MenuItemFormTemplate} from "../../form-components/MenuItemFormTemplate";
import {
    clearAllergens,
    clearForm, clearLabels, getAllergens, getLabels,
    postDish,
    postImage, setCategory,
    setErrorData,
    setErrorMessage,
    setFileName
} from "../../../../../slices/dishFormSlice";
import {
    setNewDishFormActive,
    setSubmittedSuccessType
} from "../../../../../slices/dishesCategoriesSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {MenuItemMobilePreview} from "./MenuItemMobilePreview";
import {clearAdditions, fetchIngredients} from "../../../../../slices/dishAdditionsSlice";

export const NewMenuItemForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories.view);
    const [file, setFile] = useState(null);
    const {
        banner,
        errorMessage,
        errorData,
    } = useSelector(state => state.dishForm.form);

    useEffect(() => {
        dispatch(setCategory(category));
        dispatch(fetchIngredients());
        dispatch(getAllergens());
        dispatch(getLabels());
    }, []);

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(clearAllergens());
        dispatch(clearAdditions());
        dispatch(clearLabels());
        dispatch(setNewDishFormActive(false));
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
        }

        const newBanner = banner && banner.value === t("isNew");
        const bestsellerBanner = banner && banner.value === t("isBestseller");
        const dishAction = await dispatch(postDish({new: newBanner, bestseller: bestsellerBanner}));
        if(postDish.fulfilled.match(dishAction)) {
            dispatch(setSubmittedSuccessType('dish-save'));
            setTimeout(() => {
                dispatch(setSubmittedSuccessType(null));
            }, 4000);
            dispatch(setNewDishFormActive(false));
            dispatch(clearForm());
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
                            {t('addingNewDishToCategory')}:&nbsp;&nbsp;
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