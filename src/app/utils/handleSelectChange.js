export const handleSelectChange = (field, selectedOption, setForm, setChosenCategory, setDisplayOrders) => {
    switch (field) {
        case 'category':
            if (selectedOption) {
                const displayOrders = selectedOption.value.menuItems.map(menuItem => menuItem.displayOrder);
                const additional = displayOrders.length + 1;
                setDisplayOrders([...displayOrders, additional]);

                setChosenCategory(selectedOption);
                setForm(prevForm => ({
                    ...prevForm,
                    category: selectedOption,
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
            break;

        case 'displayOrder':
            setForm(prevForm => ({
                ...prevForm,
                displayOrder: selectedOption || 0
            }));
            break;

        case 'banner':
            setForm(prevForm => ({
                ...prevForm,
                banner: selectedOption || null
            }));
            break;

        case 'available':
            setForm(prevForm => ({
                ...prevForm,
                available: selectedOption
            }));
            break;

        default:
            break;
    }
};