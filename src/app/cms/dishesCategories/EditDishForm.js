import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {FormHeader} from "./formComponents/FormHeader";
import {DishFormTemplate} from "./formComponents/DishFormTemplate";
import {FormErrorDialog} from "../../error/FormErrorDialog";
import {imagesPath} from "../../../apiData";
import {DishAdditionsView} from "./DishAdditionsView";
import {
    setEditDishFormActive,
    setSubmittedSuccessType
} from "../../../slices/dishesCategoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm, postDish, postImage,
    setAvailable,
    setBanner,
    setCategory,
    setCategoryId,
    setChosenAdditions,
    setChosenAllergens,
    setChosenLabels,
    setDescription,
    setDisplayOrder,
    setErrorData,
    setErrorMessage,
    setFileName, setId,
    setName,
    setPrice,
    setVariants
} from "../../../slices/dishFormSlice";

export const EditDishForm = ({executeFilter}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        banner,
        isAdditionsViewActive,
        errorMessage,
        errorData,
    } = useSelector(state => state.dishForm.form);
    const {category, dish, filterValue} = useSelector(state => state.dishesCategories.view);
    const [file, setFile] = useState(null);

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
            console.log('initialFormState.dish', dish)
            console.log('initialFormState.category', category)
            let dishBanner;
            if (dish.bestseller) {
                dishBanner = t('isBestseller')
            } else if (dish.new) {
                dishBanner = t('isNew')
            } else {
                dishBanner = null;
            }
            dispatch(setBanner(dishBanner ? {value: dishBanner, label: dishBanner} : dishBanner));
            dispatch(setCategoryId(dish.categoryId));
            dispatch(setCategory({
                category: {value: category, label: getTranslation(category.name)},
                isNew: false
            }));
            dispatch(setDisplayOrder({value: dish.displayOrder, label: dish.displayOrder}));
            dispatch(setId(dish.id));
            dispatch(setName(dish.name.defaultTranslation));
            dispatch(setDescription(dish.description.defaultTranslation));
            dispatch(setVariants(dish.variants));
            dispatch(setPrice(dish.price.toFixed(2)));
            dispatch(setAvailable({
                value: dish.available,
                label: dish.available ? t('availableDish') : t('unavailableDish')
            }));
            dispatch(setChosenLabels(dish.labels));
            dispatch(setChosenAllergens(dish.allergens));
            dispatch(setChosenAdditions(dish.additionalIngredients));
        }
        setInitialFormState();
    }, []);

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

    if (isAdditionsViewActive) {
        return (
            <DishAdditionsView/>
        );
    }

    return (
        <form onSubmit={handleFormSubmit}
              className={'form-container'}>
            {errorMessage ? <FormErrorDialog error={errorData} resetMessage={setErrorMessage}/> : null}
            <div className={'form-grid'}>
                <FormHeader headerTitle={`${t('editDish')}${getTranslation(dish.name)}`}
                            onAdd={handleFormSubmit}
                            onCancel={() => {
                                dispatch(setEditDishFormActive(false));
                                dispatch(clearForm());
                            }}/>
                <DishFormTemplate setFile={setFile} isNewDish={false}/>
            </div>
        </form>
    );
}