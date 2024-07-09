export const getIconPath = (chosenLabels, chosenAllergens, obj, type) => {
    let isChosen;
    if (type === 'label') {
        isChosen = chosenLabels.some(l => l.id === obj.id);
    } else if (type === 'allergen') {
        isChosen = chosenAllergens.some(a => a.id === obj.id);
    }
    return `${process.env.PUBLIC_URL}/theme/icons/${isChosen ? '' : 'inactive-'}${obj.iconName}`;
};

export const handleLabelsChange = (chosenLabels, setChosenLabels, label) => {
    const chosenLabelsIds = chosenLabels.map(l => l.id);
    if (chosenLabelsIds.includes(label.id)) {
        setChosenLabels(chosenLabels.filter(l => l.id !== label.id));
        return;
    }
    setChosenLabels(prevState => [...prevState, label]);
};

export const handleAllergensChange = (chosenAllergens, setChosenAllergens, allergen) => {
    const chosenAllergensId = chosenAllergens.map(a => a.id);
    if (chosenAllergensId.includes(allergen.id)) {
        setChosenAllergens(chosenAllergens.filter(a => a.id !== allergen.id));
        return;
    }
    setChosenAllergens(prevState => [...prevState, allergen]);
};

export const removeFile = (setFile, setFileName) => {
    setFile(null);
    setFileName(null);
}

export const handleFileChange = (setFileName, setFile, e) => {
    const file = e.target.files[0];
    if (file) {
        setFileName(file.name);
    }
    setFile(file);
};