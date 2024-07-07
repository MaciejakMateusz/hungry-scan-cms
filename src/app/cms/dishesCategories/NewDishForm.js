import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {DishAdditionsView} from "./DishAdditionsView";
import {CustomSelect} from "./formComponents/CustomSelect";
import {NameField} from "./formComponents/NameField";
import {FormHeader} from "./formComponents/FormHeader";
import {PriceField} from "./formComponents/PriceField";
import {FileUploadField} from "./formComponents/FileUploadField";
import {LabelsMultiselect} from "./formComponents/LabelsMultiselect";
import {DescriptionField} from "./formComponents/DescriptionField";
import {AllergensMultiselect} from "./formComponents/AllergensMultiselect";
import {AdditionalIngredientsMultiselect} from "./formComponents/AdditionalIngredientsMultiselect";

export const NewDishForm = ({setMenuItemFormActive, setSubmittedSuccessfullyType, categories}) => {
    const {t} = useTranslation();
    const [displayOrders, setDisplayOrders] = useState([]);
    const [errorData, setErrorData] = useState({});
    const [chosenCategory, setChosenCategory] = useState(null);
    const [chosenAdditions, setChosenAdditions] = useState([]);
    const [chosenLabels, setChosenLabels] = useState([]);
    const [chosenAllergens, setChosenAllergens] = useState([]);
    const [labels, setLabels] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(t('noFileChosen'))
    const [isAdditionsViewActive, setIsAdditionsViewActive] = useState(false);
    const [form, setForm] = useState({
            category: null,
            displayOrder: 0,
            banner: '',
            name: '',
            description: '',
            variants: [],
            price: "0.00",
            file: {},
            available: {value: true, label: t('availableDish')}
        }
    );

    const fetchLabels = () => {
        fetch(`${apiHost}/api/cms/labels`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was an error while communicating with a server.");
            }
        }).then(data => {
            setLabels(data);
        }).catch(error => {
            console.log(error);
        });
    }

    const fetchAllergens = () => {
        fetch(`${apiHost}/api/cms/allergens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was an error while communicating with a server.");
            }
        }).then(data => {
            setAllergens(data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchLabels()
        fetchAllergens()
    }, []);

    const handleInputChange = (e) => {
        const {name, value, options} = e.target;
        if (name === "labels" || name === "allergens" || name === "additionalIngredients") {
            const selectedIds = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);

            let selectedObjects = [];
            if (name === "labels") {
                selectedObjects = labels.filter(label => selectedIds.includes(label.id.toString()));
            } else if (name === "allergens") {
                selectedObjects = allergens.filter(allergen => selectedIds.includes(allergen.id.toString()));
            }

            setForm(prevForm => ({
                ...prevForm,
                [name]: selectedObjects
            }));
        } else if (name === "price") {
            const numericValue = parseFloat(value);
            const formattedValue = isNaN(numericValue) ? '' : numericValue.toFixed(2);
            setForm(prevForm => ({
                ...prevForm,
                [name]: formattedValue
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
        setFile(file);
    };

    const removeFile = () => {
        setFile(null);
        setFileName('Nie wybrano pliku');
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const uploadImage = async () => {
            if (!file) {
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`${apiHost}/api/cms/images`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getDecodedJwt()}`,
                    },
                    body: formData,
                });

                return await response.json();
            } catch (error) {
                setErrorData(error)
            }
        };

        uploadImage().then(() => {
            const requestBody = JSON.stringify({
                categoryId: form.category.value.id,
                displayOrder: form.displayOrder.value,
                isNew: form.banner.value === t("isNew"),
                isBestseller: form.banner.value === t("isBestseller"),
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

            fetch(`${apiHost}/api/cms/items/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getDecodedJwt()}`,
                },
                body: requestBody,
            })
                .then((response) => {
                    if (response.ok) {
                        setSubmittedSuccessfullyType('dish-save');
                        setTimeout(() => {
                            setSubmittedSuccessfullyType(null);
                        }, 4000);
                        setMenuItemFormActive(false);
                        return response.json();
                    } else {
                        return response.json().then((errorData) => {
                            throw new Error(errorData.message || "Failed to add item");
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error adding item:", error);
                    setErrorData(error);
                });
        });
    };

    const handleCategoryChange = (selectedCategory) => {
        const displayOrders = selectedCategory.value.menuItems.map(menuItem => menuItem.displayOrder);
        const additional = displayOrders.length + 1;
        setDisplayOrders([...displayOrders, additional]);

        if (selectedCategory) {
            setChosenCategory(selectedCategory)
            setForm(prevForm => ({
                ...prevForm,
                category: selectedCategory,
                displayOrder: {
                    value: additional,
                    label: additional
                }
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                category: null,
                displayOrder: null
            }));
            setChosenCategory(null);
            setDisplayOrders([]);
        }
    };

    const handleDisplayOrderChange = (selectedDisplayOrder) => {
        if (selectedDisplayOrder) {
            setForm(prevForm => ({
                ...prevForm,
                displayOrder: selectedDisplayOrder
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                displayOrder: 0
            }));
        }
    }

    const handleBannersChange = (selectedBanner) => {
        if (selectedBanner) {
            setForm(prevForm => ({
                ...prevForm,
                banner: selectedBanner
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                banner: null
            }));
        }
    }

    const handleAvailableChange = (selectedAvailability) => {
        setForm(prevForm => ({
            ...prevForm,
            available: selectedAvailability
        }));
    }

    const handleLabelsChange = label => {
        const chosenLabelsIds = chosenLabels.map(l => l.id)
        if (chosenLabelsIds.includes(label.id)) {
            setChosenLabels(chosenLabels.filter(l => l.id !== label.id))
            return;
        }
        setChosenLabels(prevState => [...prevState, label])
    }

    const handleAllergensChange = allergen => {
        const chosenAllergensId = chosenAllergens.map(a => a.id)
        if (chosenAllergensId.includes(allergen.id)) {
            setChosenAllergens(chosenAllergens.filter(a => a.id !== allergen.id))
            return;
        }
        setChosenAllergens(prevState => [...prevState, allergen])
    }

    const getIconPath = (obj, type) => {
        let isChosen;
        if (type === 'label') {
            isChosen = chosenLabels.some(l => l.id === obj.id);
        } else if (type === 'allergen') {
            isChosen = chosenAllergens.some(a => a.id === obj.id);
        }
        return `${process.env.PUBLIC_URL}/theme/icons/${isChosen ? '' : 'inactive-'}${obj.iconName}`;
    };

    return (
        isAdditionsViewActive ? <DishAdditionsView
                setAdditions={setChosenAdditions}
                chosenAdditions={chosenAdditions}
                isActive={setIsAdditionsViewActive}/> :
            <form onSubmit={handleFormSubmit}
                  className={'form-container'}>
                <div className={'form-grid'}>
                    <FormHeader headerTitle={t('createNewDish')}
                                onAdd={() => setMenuItemFormActive(false)}
                                onCancel={handleFormSubmit}/>
                    <div className={'form-wrapper'}>
                        <div className={'form'}>
                            <div className={'form-column left'}>
                                <div className={'form-fields-container'}>
                                    <CustomSelect id={"dish-category"}
                                                  name={"category"}
                                                  labelName={t('category')}
                                                  value={chosenCategory}
                                                  options={categories.map(category => {
                                                      return {value: category, label: getTranslation(category.name)}
                                                  })}
                                                  placeholder={t('choose')}
                                                  onChange={(selectedOption) => handleCategoryChange(selectedOption)}
                                    />
                                    <CustomSelect id={'category-display-order'}
                                                  name={'displayOrder'}
                                                  labelName={t('displayOrder')}
                                                  isDisabled={!chosenCategory}
                                                  value={form.displayOrder}
                                                  onChange={handleDisplayOrderChange}
                                                  placeholder={chosenCategory ? t('choose') : t('noCategoryChosen')}
                                                  options={displayOrders.map(displayOrder => {
                                                      return {value: displayOrder, label: displayOrder}
                                                  })}
                                    />
                                    <CustomSelect
                                        id={'dish-banner'}
                                        name={'banner'}
                                        labelName={t('banner')}
                                        isOptional={true}
                                        value={form.banner}
                                        onChange={handleBannersChange}
                                        placeholder={t('choose')}
                                        isClearable={true}
                                        options={[
                                            {value: t('isNew'), label: t('isNew')},
                                            {value: t('isBestseller'), label: t('isBestseller')}
                                        ]}
                                    />
                                    <NameField id={'category-name'}
                                               value={form.name}
                                               onChange={handleInputChange}
                                    />
                                    <LabelsMultiselect labels={labels}
                                                       iconPath={getIconPath}
                                                       onClick={handleLabelsChange}/>
                                    <DescriptionField value={form.description}
                                                      onChange={handleInputChange}/>
                                    <AllergensMultiselect allergens={allergens}
                                                          iconPath={getIconPath}
                                                          onClick={handleAllergensChange}/>
                                </div>
                            </div>
                            <div className={'form-column right'}>
                                <div className={'form-fields-container'}>
                                    <AdditionalIngredientsMultiselect onClick={setIsAdditionsViewActive}
                                                                      chosenAdditions={chosenAdditions}/>
                                    <PriceField id={'dish-price'}
                                                value={form.price}
                                                onChange={handleInputChange}/>
                                    <FileUploadField file={file}
                                                     onChange={handleFileChange}
                                                     onClick={removeFile}
                                                     fileName={fileName}/>
                                    <CustomSelect
                                        id={'category-available'}
                                        name={'available'}
                                        labelName={t('availability')}
                                        value={form.available}
                                        onChange={handleAvailableChange}
                                        options={[
                                            {value: true, label: t('availableDish')},
                                            {value: false, label: t('unavailableDish')}
                                        ]}
                                    />
                                </div>
                            </div>
                            {errorData.name && <span className={'validation-msg'}>{errorData.name}</span>}
                        </div>
                    </div>
                </div>
            </form>
    );
}