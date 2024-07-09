import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {FormHeader} from "./formComponents/FormHeader";
import {DishFormTemplate} from "./formComponents/DishFormTemplate";
import {useFetchLabels} from "../../utils/hooks/useFetchLables";
import {useFetchAllergens} from "../../utils/hooks/useFetchAllergens";
import {useFormState} from "../../utils/hooks/useFormState";
import {FormErrorDialog} from "../../error/FormErrorDialog";
import {useGetDisplayOrders} from "../../utils/hooks/useGetDisplayOrders";
import {handleSelectChange} from "../../utils/handleSelectChange";
import {uploadImage} from "../../utils/fetch/uploadImage";
import {postMenuItem} from "../../utils/fetch/postMenuItem";
import {imagesPath} from "../../../apiData";
import {
    getIconPath,
    handleAllergensChange, handleFileChange,
    handleLabelsChange,
    removeFile
} from "../../utils/formUtils";
import {DishAdditionsView} from "./DishAdditionsView";

export const EditDishForm = ({setMenuItemFormActive, setSubmittedSuccessfullyType, categories, menuItem, category}) => {
    const {t} = useTranslation();
    const [displayOrders, setDisplayOrders] = useState(useGetDisplayOrders(category));
    const [errorData, setErrorData] = useState({});
    const [chosenCategory, setChosenCategory] = useState({value: category, label: getTranslation(category.name)});
    const [chosenAdditions, setChosenAdditions] = useState(menuItem.additionalIngredients);
    const [chosenLabels, setChosenLabels] = useState(menuItem.labels);
    const [chosenAllergens, setChosenAllergens] = useState(menuItem.allergens);
    const [file, setFile] = useState({});
    const [fileName, setFileName] = useState(menuItem.imageName)
    const [isAdditionsViewActive, setIsAdditionsViewActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const labels = useFetchLabels(setErrorMessage);
    const allergens = useFetchAllergens(setErrorMessage)
    const [form, setForm, handleInputChange] = useFormState(() => {
        let menuItemBanner;
        if (menuItem.bestseller) {
            menuItemBanner = t('isBestseller')
        } else if (menuItem.new) {
            menuItemBanner = t('isNew')
        } else {
            menuItemBanner = null;
        }

        return {
            category: {value: category, label: getTranslation(category.name)},
            displayOrder: {value: menuItem.displayOrder, label: menuItem.displayOrder},
            banner: menuItemBanner ? {value: menuItemBanner, label: menuItemBanner} : menuItemBanner,
            name: menuItem.name.defaultTranslation,
            description: menuItem.description.defaultTranslation,
            variants: menuItem.variants,
            price: menuItem.price.toFixed(2),
            file: file,
            available: {
                value: menuItem.available,
                label: menuItem.available ? t('availableDish') : t('unavailableDish')
            }
        }
    }, labels, allergens);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(`${imagesPath}/${menuItem.imageName}`);
            if(response.ok) {
                const blob = await response.blob();
                const file = new File([blob], menuItem.imageName, {type: blob.type});
                setFile(file)
            }
        };
        fetchImage().catch(error => console.log(error));
    }, [menuItem, setForm]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(null);

        uploadImage().then(() => {
            const requestBody = JSON.stringify({
                id: menuItem.id,
                categoryId: form.category.value.id,
                displayOrder: form.displayOrder.value,
                new: form.banner && form.banner.value === t("isNew"),
                bestseller: form.banner && form.banner.value === t("isBestseller"),
                name: {
                    defaultTranslation: form.name,
                    translationEn: ''
                },
                description: {
                    defaultTranslation: form.description,
                    translationEn: ''
                },
                labels: chosenLabels,
                allergens: chosenAllergens,
                variants: form.variants,
                additionalIngredients: chosenAdditions,
                price: form.price,
                imageName: file ? file.name : null,
                available: form.available.value,
            });
            postMenuItem(requestBody, setSubmittedSuccessfullyType, setMenuItemFormActive, setErrorData, setErrorMessage)
        });
    };

    if (isAdditionsViewActive) {
        return (
            <DishAdditionsView
                setAdditions={setChosenAdditions}
                chosenAdditions={chosenAdditions}
                isActive={setIsAdditionsViewActive}
            />
        );
    }

    return (
        <form onSubmit={handleFormSubmit}
              className={'form-container'}>
            {errorMessage ? <FormErrorDialog error={errorData} resetMessage={setErrorMessage}/> : null}
            <div className={'form-grid'}>
                <FormHeader headerTitle={t('createNewDish')}
                            onAdd={() => setMenuItemFormActive(false)}
                            onCancel={handleFormSubmit}/>
                <DishFormTemplate chosenCategory={chosenCategory}
                                  setChosenCategory={setChosenCategory}
                                  categories={categories}
                                  onSelectChange={handleSelectChange}
                                  errorData={errorData}
                                  form={form}
                                  setForm={setForm}
                                  displayOrders={displayOrders}
                                  setDisplayOrders={setDisplayOrders}
                                  handleInputChange={handleInputChange}
                                  labels={labels}
                                  getIconPath={(obj, type) => getIconPath(chosenLabels, chosenAllergens, obj, type)}
                                  handleLabelsChange={(label) => handleLabelsChange(chosenLabels, setChosenLabels, label)}
                                  allergens={allergens}
                                  handleAllergensChange={(allergen) => handleAllergensChange(chosenAllergens, setChosenAllergens, allergen)}
                                  setIsAdditionsViewActive={setIsAdditionsViewActive}
                                  chosenAdditions={chosenAdditions}
                                  file={file}
                                  fileName={fileName}
                                  handleFileChange={(e) => handleFileChange(setFileName, setFile, e)}
                                  removeFile={() => removeFile(setFile, setFileName)}
                />
            </div>
        </form>
    );
}