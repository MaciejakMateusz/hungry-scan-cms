import React from "react";
import {useTranslation} from "react-i18next";

export const AllergensMultiselect = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-allergen'} className={'form-label'}>
                    {t('allergens')} <span className="form-optional">{t('optional')}:</span>
                </label>
                <div className={'form-field allergens'} id={'dish-allergen'}>
                    {props.allergens.map(allergen => (
                        <img key={allergen.id}
                             className={'selectable-icon allergen'}
                             src={props.iconPath(allergen, 'allergen')}
                             alt={allergen.iconName}
                             onClick={() => props.onClick(allergen)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}