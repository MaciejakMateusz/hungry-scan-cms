import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {DishAdditionsView} from "./DishAdditionsView";
import Select from 'react-select'
import {customSelect} from "../../../styles";

export const NewDishForm = ({setMenuItemFormActive, setIsSubmittedSuccessfully, categories}) => {
    const {t} = useTranslation()
    const [displayOrders, setDisplayOrders] = useState([])
    const [errorData, setErrorData] = useState({})
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

    useEffect(() => {
        if (chosenCategory) {
            setForm(prevForm => ({
                ...prevForm,
                displayOrder: displayOrders.length + 1
            }));
        }
    }, [chosenCategory, displayOrders]);

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
                        setIsSubmittedSuccessfully(true);
                        setTimeout(() => {
                            setIsSubmittedSuccessfully(false);
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
        if (selectedCategory) {
            setForm(prevForm => ({
                ...prevForm,
                category: selectedCategory
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                category: null,
                displayOrder: null
            }));
        }
    };

    const handleReadOnlyFields = (selectedOption) => {
        if (selectedOption && selectedOption.value.id !== '0') {
            const selectedCategory = categories.find(category => category.id === parseInt(selectedOption.value.id, 10));
            setChosenCategory(selectedOption);
            setDisplayOrders(selectedCategory.menuItems.map(menuItem => menuItem.displayOrder));
        } else {
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
                  className="form-container">
                <div className="form-grid">
                    <div className="form-header">
                        <div className="category-form-title">{t('createNewDish')}</div>
                        <div className="category-form-top-buttons">
                            <button className="add-new-button cancel"
                                    onClick={() => setMenuItemFormActive(false)}>
                                {t('cancel')}
                            </button>
                            <button className="add-new-button submit"
                                    onClick={handleFormSubmit}>
                                {t('save')}
                            </button>
                        </div>
                    </div>
                    <div className="form-wrapper">
                        <div className="form">
                            <div className="form-field-container">
                                <label htmlFor="dish-category" className="form-label">
                                    {t('category')}:
                                </label>
                                <Select id="dish-category"
                                        name="category"
                                        styles={customSelect}
                                        value={chosenCategory}
                                        options={categories.map(category => {
                                            return {value: category, label: getTranslation(category.name)}
                                        })}
                                        placeholder={t('choose')}
                                        isClearable={true}
                                        onChange={(selectedOption) => {
                                            handleCategoryChange(selectedOption);
                                            handleReadOnlyFields(selectedOption);
                                        }}
                                />
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-price" className="form-label">
                                    {t('price')}:
                                </label>
                                <input type="number"
                                       id="dish-price"
                                       min="0.00"
                                       step="0.01"
                                       placeholder="0.00"
                                       name="price"
                                       className="form-field price"
                                       value={form.price}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="category-display-order" className="form-label">
                                    {t('displayOrder')}:
                                </label>
                                <Select id="category-display-order"
                                        name="displayOrder"
                                        styles={customSelect}
                                        isDisabled={!chosenCategory}
                                        value={form.displayOrder}
                                        onChange={handleDisplayOrderChange}
                                        placeholder={chosenCategory ? t('choose') : t('noCategoryChosen')}
                                        isClearable={true}
                                        options={displayOrders.map(displayOrder => {
                                            return {value: displayOrder, label: displayOrder}
                                        })}
                                />
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-image" className="form-label">
                                    {t('image')}:
                                </label>
                                <div className="custom-file-upload">
                                    {file === null ? (
                                            <>
                                                <label htmlFor="dish-image"
                                                       className="custom-file-upload label">
                                                    Wybierz plik
                                                </label>
                                                <input
                                                    type="file"
                                                    id="dish-image"
                                                    name="imageName"
                                                    onChange={handleFileChange}
                                                    accept=".png"
                                                    className="file-input"/>
                                            </>
                                        ) :
                                        <label htmlFor="dish-image"
                                               className="custom-file-upload label"
                                               onClick={removeFile}>
                                            Wyczyść
                                        </label>}
                                    <span className="file-name" id="file-name">{fileName}</span>
                                </div>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-banner" className="form-label">
                                    {t('banner')} <span className="form-optional">{t('optional')}:</span>
                                </label>
                                <Select id="dish-banner"
                                        name="banner"
                                        styles={customSelect}
                                        value={form.banner}
                                        onChange={handleBannersChange}
                                        placeholder={t('choose')}
                                        isClearable={true}
                                        options={[
                                            {value: t('isNew'), label: t('isNew')},
                                            {value: t('isBestseller'), label: t('isBestseller')}
                                        ]}
                                />
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="category-available" className="form-label">
                                    {t('availability')}:
                                </label>
                                <Select id="category-available"
                                        name="available"
                                        styles={customSelect}
                                        value={form.available}
                                        onChange={handleAvailableChange}
                                        options={[
                                            {value: true, label: t('availableDish')},
                                            {value: false, label: t('unavailableDish')}
                                        ]}
                                />
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-name" className="form-label">
                                    {t('name')}:
                                </label>
                                <textarea
                                    className="form-field name"
                                    id="dish-name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    placeholder={`${t('name')}...`}/>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-label" className="form-label">
                                    {t('labels')} <span className="form-optional">{t('optional')}:</span>
                                </label>
                                <div className="form-field labels" id="dish-label">
                                    {labels.map(label => (
                                        <img key={label.id}
                                             className="selectable-icon"
                                             src={getIconPath(label, 'label')}
                                             alt={label.iconName}
                                             onClick={() => handleLabelsChange(label)}/>
                                    ))}
                                </div>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-description" className="form-label">
                                    {t('description')}:
                                </label>
                                <textarea
                                    className="form-field description"
                                    id="dish-description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    placeholder={`${t('type')}`}/>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-allergen" className="form-label">
                                    {t('allergens')} <span className="form-optional">{t('optional')}:</span>
                                </label>
                                <div className="form-field allergens" id="dish-allergen">
                                    {allergens.map(allergen => (
                                        <img key={allergen.id}
                                             className="selectable-icon allergen"
                                             src={getIconPath(allergen, 'allergen')}
                                             alt={allergen.iconName}
                                             onClick={() => handleAllergensChange(allergen)}/>
                                    ))}
                                </div>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="dish-allergen" className="form-label">
                                    {t('additions')} <span className="form-optional">{t('optional')}:</span>
                                </label>
                                <button id="dish-addition"
                                        className="form-field advanced-view"
                                        onClick={() => setIsAdditionsViewActive(true)}>
                                    {chosenAdditions.length === 0 ?
                                        <span>{t('choose')}</span> :
                                        <span>Wybrano ({chosenAdditions.length})</span>}
                                </button>
                            </div>
                            {errorData.name && <span className="validation-msg">{errorData.name}</span>}
                        </div>
                    </div>
                </div>
            </form>
    );
}