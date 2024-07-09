import React from "react";
import {useTranslation} from "react-i18next";
import {Tooltip} from "../../Tooltip";
import {getTranslation} from "../../../../locales/langUtils";
import {ReactSVG} from "react-svg";

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
                        <Tooltip content={getTranslation(allergen.description)}
                                 key={allergen.id}>
                            <ReactSVG className={'selectable-icon allergen'}
                                      src={props.iconPath(allergen, 'allergen')}
                                      onClick={() => props.onClick(allergen)}/>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
}