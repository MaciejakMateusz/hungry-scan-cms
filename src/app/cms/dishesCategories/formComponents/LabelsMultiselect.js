import React from "react";
import {useTranslation} from "react-i18next";
import {Tooltip} from "../../Tooltip";
import {getTranslation} from "../../../../locales/langUtils";
import {ReactSVG} from "react-svg";

export const LabelsMultiselect = (props) => {
    const {t} = useTranslation();

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-label'} className={'form-label'}>
                    {t('labels')} <span className={'form-optional'}>{t('optional')}:</span>
                </label>
                <div className={'form-field labels'} id={'dish-label'}>
                    {props.labels.map(label => (
                        <Tooltip key={label.id}
                                 content={getTranslation(label.name)}>
                            <ReactSVG className={'selectable-icon'}
                                      src={props.iconPath(label, 'label')}
                                      onClick={() => props.onClick(label)}
                                      fallback={() => (<div className={'selectable-icon fallback'}/>)}/>
                        </Tooltip>

                    ))}
                </div>
            </div>
        </div>
    );
}