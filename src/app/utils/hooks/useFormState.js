import { useState } from "react";

export const useFormState = (initialState, labels, allergens) => {
    const [form, setForm] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value, options } = e.target;
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

    return [form, setForm, handleInputChange];
};