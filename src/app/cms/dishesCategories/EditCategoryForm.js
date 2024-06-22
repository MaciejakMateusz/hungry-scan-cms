import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getCategoriesDisplayOrders} from "../../../apiUtils";

export const EditCategoryForm = ({setCategoryFormActive, setIsSubmittedSuccessfully, category}) => {
    const {t} = useTranslation();
    const [displayOrders, setDisplayOrders] = useState([]);
    const [errorData, setErrorData] = useState({});
    const [form, setForm] = useState({
        'id': category.id,
        'name': category.name.defaultTranslation,
        'available': category.available,
        'displayOrder': category.displayOrder
        }
    );

    useEffect(() => {
        getCategoriesDisplayOrders().then(data=> {
            setDisplayOrders(data)
        })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify({
            id: form.id,
            name: {
                defaultTranslation: form.name,
                translationEn: ''
            },
            menuItems: category.menuItems,
            available: form.available,
            displayOrder: form.displayOrder
        });

        return fetch(`${apiHost}/api/cms/categories/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: requestBody
        }).then(response => {
                if (response.ok) {
                    setIsSubmittedSuccessfully(true);
                    setTimeout(() => {
                        setIsSubmittedSuccessfully(false);
                    }, 4000);
                    setCategoryFormActive(false)
                    return response.json();
                } else {
                    response.json().then(errorData => {
                        setErrorData(errorData);
                    })
                }
            })
    };

    return (
        <form onSubmit={handleFormSubmit}
              className="form-container">
            <div className="form-grid">
                <div className="form-header">
                    <div className="category-form-title">{t('createNewCategory')}</div>
                    <div className="category-form-top-buttons">
                        <button className="add-new-button"
                                onClick={() => setCategoryFormActive(false)}>
                            {t('cancel')}
                        </button>
                        <button className="add-new-button"
                                onClick={handleFormSubmit}>
                            {t('save')}
                        </button>
                    </div>
                </div>
                <div className="form-wrapper">
                    <div className="form">
                        <div className="form-field-container">
                            <label htmlFor="category-name" className="form-label">
                                {t('name')}:
                            </label>
                            <input type="text"
                                   id="category-name"
                                   className="form-field name"
                                   name="name"
                                   value={form.name}
                                   onChange={handleInputChange}
                                   placeholder={t('categoryName')}/>
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="category-display-order" className="form-label">
                                {t('displayOrder')}:
                            </label>
                            <select id="category-display-order"
                                    className="form-field select"
                                    name="displayOrder"
                                    value={form.displayOrder}
                                    onChange={handleInputChange}>
                                {displayOrders.map(displayOrder => (
                                    <option key={displayOrder} value={displayOrder}>
                                        {displayOrder}
                                    </option>
                                ))}
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
                                    {t('availableCategory')}
                                </option>
                                <option value={false}>
                                    {t('unavailableCategory')}
                                </option>
                            </select>
                        </div>

                        {errorData.name && <span className="validation-msg">{errorData.name}</span>}
                    </div>
                </div>
            </div>
        </form>
    );
}