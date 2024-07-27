import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Tooltip} from "../../Tooltip";
import {getTranslation} from "../../../../locales/langUtils";
import {ReactSVG} from "react-svg";
import {useDispatch, useSelector} from "react-redux";
import {getAllergens, setChosenAllergens} from "../../../../slices/dishFormSlice";

export const AllergensMultiselect = () => {
    const {t} = useTranslation();
    const {chosenAllergens} = useSelector(state => state.dishForm.form);
    const dispatch = useDispatch();
    const {allergens} = useSelector(state => state.dishForm.fetchAllergens);

    useEffect(() => {
        dispatch(getAllergens());
    }, [dispatch]);

    const getAllergensIcons = (allergen) => {
        const isChosen = chosenAllergens.some(a => a.id === allergen.id);
        return `${process.env.PUBLIC_URL}/theme/icons/${isChosen ? '' : 'inactive-'}${allergen.iconName}`;
    }

    const handleAllergensChange = (allergen) => {
        const chosenAllergensId = chosenAllergens.map(a => a.id);
        if (chosenAllergensId.includes(allergen.id)) {
            dispatch(setChosenAllergens(chosenAllergens.filter(a => a.id !== allergen.id)));
            return;
        }
        dispatch(setChosenAllergens([...chosenAllergens, allergen]));
    };

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-allergen'} className={'form-label'}>
                    {t('allergens')} <span className="form-optional">{t('optional')}:</span>
                </label>
                <div className={'form-field allergens'} id={'dish-allergen'}>
                    {allergens.map(allergen => (
                        <Tooltip content={getTranslation(allergen.description)}
                                 key={allergen.id}>
                            <ReactSVG className={'selectable-icon allergen'}
                                      src={getAllergensIcons(allergen)}
                                      onClick={() =>
                                          handleAllergensChange(allergen)
                                      }/>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
}