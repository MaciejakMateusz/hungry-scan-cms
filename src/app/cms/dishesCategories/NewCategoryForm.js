import React, {useEffect, useState} from "react";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {useTranslation} from "react-i18next";
import {getCategoriesDisplayOrders} from "../../../apiUtils";
import {FormHeader} from "./formComponents/FormHeader";
import {CategoryFormTemplate} from "./formComponents/CategoryFormTemplate";

export const NewCategoryForm = ({setCategoryFormActive, setSubmittedSuccessfullyType}) => {
    const {t} = useTranslation()
    const [displayOrders, setDisplayOrders] = useState([])
    const [errorData, setErrorData] = useState({})
    const [form, setForm] = useState({
            'name': '',
            'available': {value: true, label: t('availableCategory')},
            'displayOrder': 0
        }
    );

    useEffect(() => {
        getCategoriesDisplayOrders().then(data => {
            setDisplayOrders(data)
            const initialDisplayOrder = data.length + 1;
            setForm(prevForm => ({
                ...prevForm,
                displayOrder: {
                    value: initialDisplayOrder,
                    label: initialDisplayOrder
                }
            }));
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
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify({
            name: {
                defaultTranslation: form.name,
                translationEn: ''
            },
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
                setSubmittedSuccessfullyType('category-save');
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
              className="form-container">
            <div className="form-grid">
                <FormHeader headerTitle={t('createNewCategory')}
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