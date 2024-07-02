import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {DishAdditionsView} from "./DishAdditionsView";

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
    const [fileName, setFileName] = useState('Nie wybrano pliku')
    const [isAdditionsViewActive, setIsAdditionsViewActive] = useState(false);
    const [form, setForm] = useState({
            'category': t('choose'),
            'displayOrder': 0,
            'banner': '',
            'name': '',
            'description': '',
            'allergens': [],
            'variants': [],
            'price': "0.00",
            'file': {},
            'available': true
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
    }, [displayOrders]);

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
                categoryId: form.category,
                displayOrder: form.displayOrder,
                isNew: form.banner === t("isNew"),
                isBestseller: form.banner === t("isBestseller"),
                name: {
                    defaultTranslation: form.name,
                    translationEn: ''
                },
                labels: chosenLabels,
                description: {
                    defaultTranslation: form.description,
                    translationEn: ''
                },
                allergens: form.allergens,
                variants: form.variants,
                additionalIngredients: chosenAdditions,
                price: form.price,
                imageName: file.name,
                available: form.available,
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

    const handleReadOnlyFields = (e) => {
        const optionValue = e.target.value
        if (optionValue === '0') {
            setChosenCategory(null);
            setDisplayOrders([]);
            return;
        }
        const selectedCategory = categories.find(category =>
            category.id === parseInt(e.target.value, 10));
        setChosenCategory(selectedCategory);
        setDisplayOrders(selectedCategory.menuItems.map(menuItem => menuItem.displayOrder));
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
                                <label htmlFor="category" className="form-label">
                                    {t('category')}:
                                </label>
                                <select id="dish-category"
                                        name="category"
                                        className="form-field select"
                                        value={form.category}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            handleReadOnlyFields(e)
                                        }}>
                                    <option className="form-select-option" value={0}>
                                        {t('choose')}
                                    </option>
                                    {categories.map(category => (
                                        <option className="form-select-option"
                                                key={category.id}
                                                value={category.id}>
                                            {getTranslation(category.name)}
                                        </option>
                                    ))}
                                </select>
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
                                       className="form-field select"
                                       value={form.price}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="category-display-order" className="form-label">
                                    {t('displayOrder')}:
                                </label>
                                <select id="category-display-order"
                                        name="displayOrder"
                                        className="form-field select"
                                        disabled={!chosenCategory}
                                        value={form.displayOrder}
                                        onChange={handleInputChange}>
                                    {displayOrders.map(displayOrder => (
                                        <option className="form-select-option"
                                                key={displayOrder}
                                                value={displayOrder}>
                                            {displayOrder}
                                        </option>
                                    ))}
                                    <option value={displayOrders.length + 1}>
                                        {displayOrders.length + 1}
                                    </option>
                                </select>
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
                                <label htmlFor="banner" className="form-label">
                                    {t('banner')} <span className="form-optional">{t('optional')}:</span>
                                </label>
                                <select id="banner"
                                        name="banner"
                                        className="form-field select"
                                        value={form.banner}
                                        onChange={handleInputChange}>
                                    <option value={t('choose')}>
                                        {t('choose')}
                                    </option>
                                    <option value={t('isNew')}>
                                        {t('isNew')}
                                    </option>
                                    <option value={t('isBestseller')}>
                                        {t('isBestseller')}
                                    </option>
                                </select>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="category-available" className="form-label">
                                    {t('availability')}:
                                </label>
                                <select id="category-available"
                                        className="form-field select"
                                        name="available"
                                        value={form.available}
                                        onChange={handleInputChange}>
                                    <option value={true}>
                                        {t('availableDish')}
                                    </option>
                                    <option value={false}>
                                        {t('unavailableDish')}
                                    </option>
                                </select>
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