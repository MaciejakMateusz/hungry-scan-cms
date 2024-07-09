import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {DishAdditionsView} from "./DishAdditionsView";
import {FormHeader} from "./formComponents/FormHeader";
import {DishFormTemplate} from "./formComponents/DishFormTemplate";
import {FormErrorDialog} from "../../error/FormErrorDialog";
import {useFetchLabels} from "../../utils/hooks/useFetchLables";
import {useFetchAllergens} from "../../utils/hooks/useFetchAllergens";
import {useFormState} from "../../utils/hooks/useFormState";
import {handleSelectChange} from "../../utils/handleSelectChange";
import {uploadImage} from "../../utils/fetch/uploadImage";
import {postMenuItem} from "../../utils/fetch/postMenuItem";
import {
    getIconPath,
    handleAllergensChange,
    handleFileChange,
    handleLabelsChange,
    removeFile
} from "../../utils/formUtils";

export const NewDishForm = ({setMenuItemFormActive, setSubmittedSuccessfullyType, categories}) => {
    const {t} = useTranslation();
    const [displayOrders, setDisplayOrders] = useState([]);
    const [errorData, setErrorData] = useState({});
    const [chosenCategory, setChosenCategory] = useState(null);
    const [chosenAdditions, setChosenAdditions] = useState([]);
    const [chosenLabels, setChosenLabels] = useState([]);
    const [chosenAllergens, setChosenAllergens] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null)
    const [isAdditionsViewActive, setIsAdditionsViewActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const labels = useFetchLabels(setErrorMessage);
    const allergens = useFetchAllergens(setErrorMessage);
    const [form, setForm, handleInputChange] = useFormState({
        category: null,
        displayOrder: 0,
        banner: '',
        name: '',
        description: '',
        variants: [],
        price: "0.00",
        file: {},
        available: {value: true, label: t('availableDish')}
    }, labels, allergens);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(null);

        uploadImage().then(() => {
            const requestBody = JSON.stringify({
                categoryId: form.category && form.category.value.id,
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
