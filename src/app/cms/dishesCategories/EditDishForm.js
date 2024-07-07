import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {DishAdditionsView} from "./DishAdditionsView";
import {FormHeader} from "./formComponents/FormHeader";
import {DishFormTemplate} from "./formComponents/DishFormTemplate";

export const EditDishForm = ({setMenuItemFormActive, setSubmittedSuccessfullyType, categories, menuItem, category}) => {
    const {t} = useTranslation();
    const [displayOrders, setDisplayOrders] = useState([]);
    const [errorData, setErrorData] = useState({});
    const [chosenCategory, setChosenCategory] = useState({value: category, label: getTranslation(category.name)});
    const [chosenAdditions, setChosenAdditions] = useState(menuItem.additionalIngredients);
    const [chosenLabels, setChosenLabels] = useState(menuItem.labels);
    const [chosenAllergens, setChosenAllergens] = useState(menuItem.allergens);
    const [labels, setLabels] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(menuItem.imageName)
    const [isAdditionsViewActive, setIsAdditionsViewActive] = useState(false);
    const [form, setForm] = useState(() => {
            let menuItemBanner;
            if (menuItem.bestseller) {
                menuItemBanner = t('isBestseller')
            } else if (menuItem.new) {
                menuItemBanner = t('isNew')
            } else {
                menuItemBanner = null;
            }
            console.log(menuItem)
            return {
                category: {value: category, label: getTranslation(category.name)},
                displayOrder: {value: menuItem.displayOrder, label: menuItem.displayOrder},
                banner: menuItemBanner ? {value: menuItemBanner, label: menuItemBanner} : menuItemBanner,
                name: menuItem.name.defaultTranslation,
                description: menuItem.description.defaultTranslation,
                variants: menuItem.variants,
                price: menuItem.price.toFixed(2),
                file: {},
                available: {
                    value: menuItem.available,
                    label: menuItem.available ? t('availableDish') : t('unavailableDish')
                }
            }
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
        setFileName(null);
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
                            setErrorData(errorData);
                            throw new Error(errorData.message || "Failed to add item");
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error adding item:", error);
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
                    <DishFormTemplate chosenCategory={chosenCategory}
                                      categories={categories}
                                      handleCategoryChange={handleCategoryChange}
                                      errorData={errorData}
                                      form={form}
                                      handleDisplayOrderChange={handleDisplayOrderChange}
                                      displayOrders={displayOrders}
                                      handleBannersChange={handleBannersChange}
                                      handleInputChange={handleInputChange}
                                      labels={labels}
                                      getIconPath={getIconPath}
                                      handleLabelsChange={handleLabelsChange}
                                      allergens={allergens}
                                      handleAllergensChange={handleAllergensChange}
                                      setIsAdditionsViewActive={setIsAdditionsViewActive}
                                      chosenAdditions={chosenAdditions}
                                      file={file}
                                      fileName={fileName}
                                      handleFileChange={handleFileChange}
                                      removeFile={removeFile}
                                      handleAvailableChange={handleAvailableChange}
                    />
                </div>
            </form>
    );
}