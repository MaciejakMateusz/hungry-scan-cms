import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {DishAdditionsView} from "./DishAdditionsView";
import {FormHeader} from "./formComponents/FormHeader";
import {DishFormTemplate} from "./formComponents/DishFormTemplate";
import {FormErrorDialog} from "../../error/FormErrorDialog";
import {useDispatch, useSelector} from "react-redux";
import {setNewDishFormActive, setSubmittedSuccessType} from "../../../slices/dishesCategoriesSlice";
import {
    clearForm,
    postDish,
    postImage,
    setAvailable,
    setErrorData,
    setErrorMessage, setFileName
} from "../../../slices/dishFormSlice";

export const NewDishForm = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {
        banner,
        isAdditionsViewActive,
        errorMessage,
        errorData,
    } = useSelector(state => state.dishForm.form);
    const [file, setFile] = useState(null);

    useEffect(() => {
        dispatch(setAvailable({label: t('availableDish'), value: true}));
    }, [dispatch, t]);

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
                <FormHeader headerTitle={t('createNewDish')}
                            onAdd={handleFormSubmit}
                            onCancel={() => {
                                dispatch(setNewDishFormActive(false))
                                dispatch(clearForm())
                            }}/>
                <DishFormTemplate setFile={setFile} isNewDish={true}/>
            </div>
        </form>
    );
}