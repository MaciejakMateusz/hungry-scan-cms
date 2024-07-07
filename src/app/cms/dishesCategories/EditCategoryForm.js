import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getCategoriesDisplayOrders} from "../../../apiUtils";
import {CategoryFormTemplate} from "./formComponents/CategoryFormTemplate";
import {FormHeader} from "./formComponents/FormHeader";
import {getTranslation} from "../../../locales/langUtils";

export const EditCategoryForm = ({setCategoryFormActive, setSubmittedSuccessfullyType, category}) => {
    const {t} = useTranslation();
    const [displayOrders, setDisplayOrders] = useState([]);
    const [errorData, setErrorData] = useState({});
    const [form, setForm] = useState({
            id: category.id,
            name: category.name.defaultTranslation,
            available: {value: category.available, label: category.available ? t('availableCategory') : t('unavailableCategory')},
            displayOrder: {value: category.displayOrder, label: category.displayOrder}
        }
    );

    useEffect(() => {
        getCategoriesDisplayOrders().then(data => {
            setDisplayOrders(data)
        })
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSelectChange = (field) => (selected) => {
        setForm(prevState => ({
            ...prevState,
            [field]: selected
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify({
            id: form.id,
            name: {
                defaultTranslation: form.name,
                translationEn: ''
            },
            menuItems: category.menuItems,
            available: form.available.value,
            displayOrder: form.displayOrder.value
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
                setSubmittedSuccessfullyType('category-edit');
                setTimeout(() => {
                    setSubmittedSuccessfullyType(null);
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
              className={'form-container'}>
            <div className={'form-grid'}>
                <FormHeader headerTitle={`${t('editCategory')}"${getTranslation(category.name)}"`}
                            onAdd={() => setCategoryFormActive(false)}
                            onCancel={handleFormSubmit}/>
                <CategoryFormTemplate form={form}
                                      displayOrderChange={handleSelectChange('displayOrder')}
                                      displayOrders={displayOrders}
                                      availableChange={handleSelectChange('available')}
                                      inputChange={handleInputChange}
                                      errorData={errorData}/>
            </div>
        </form>
    );
}