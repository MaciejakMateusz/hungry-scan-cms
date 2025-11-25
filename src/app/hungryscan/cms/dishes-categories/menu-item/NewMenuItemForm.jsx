import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {MenuItemFormTemplate} from "../../form-components/MenuItemFormTemplate";
import {
    postDish,
    setCategory,
    setErrorData,
    setErrorMessage,
    setMenuItemCreated
} from "../../../../../slices/dishFormSlice";
import {setNewDishFormActive} from "../../../../../slices/dishesCategoriesSlice";
import {useClearForm} from "../../../../../hooks/useClearForm";
import {MenuItemFormWrapper} from "./MenuItemFormWrapper";
import {Variants} from "./variants/Variants";
import {useTranslatableTransformer} from "../../../../../hooks/useTranslatableTransformer";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";
import {useFetchMenuItemFormCollections} from "../../../../../hooks/useFetchMenuItemFormCollections";
import {MenuItemMobilePreview} from "./preview/menu-item-details/MenuItemMobilePreview";

export const NewMenuItemForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeTab, name} = useSelector(state => state.dishForm.form);
    const {category} = useSelector(state => state.dishesCategories.view);
    const clearForm = useClearForm();
    const [file, setFile] = useState(null);
    const translatableTransformers = {
        transformName: useTranslatableTransformer({obj: null, key: 'name'}),
        transformDescription: useTranslatableTransformer({obj: null, key: 'description'})
    };
    const renderConfirmation = useConfirmationMessage(setMenuItemCreated);
    const getFormCollections = useFetchMenuItemFormCollections();

    useEffect(() => {
        dispatch(setCategory(category));
        getFormCollections();
    }, [category, dispatch]);

    const handleFormDiscard = () => {
        clearForm();
        setFile(null);
        dispatch(setNewDishFormActive(false));
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        dispatch(setErrorMessage(null));

        const isNameBlank = !name || name.trim().length === 0;
        if (isNameBlank) {
            dispatch(setErrorData({name: t('constraints.NotBlank')}));
            return;
        }

        const dishAction = await dispatch(postDish({
            action: "add",
            file: file,
            translatableTransformers: translatableTransformers
        }));
        if (postDish.fulfilled.match(dishAction)) {
            dispatch(setNewDishFormActive(false));
            clearForm();
            setFile(null);
            renderConfirmation();
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
        <MenuItemFormWrapper title={t('addingNewDishToCategory')}
                             onFormDiscard={handleFormDiscard}
                             onFormSubmit={handleFormSubmit}
                             previewContent={<MenuItemMobilePreview image={file}/>}>
            {renderFormView()}
        </MenuItemFormWrapper>
    );
}