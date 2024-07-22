import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Tooltip} from "../../Tooltip";
import {getTranslation} from "../../../../locales/langUtils";
import {ReactSVG} from "react-svg";
import {useDispatch, useSelector} from "react-redux";
import {getLabels, setChosenLabels} from "../../../../slices/dishFormSlice";

export const LabelsMultiselect = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {chosenLabels} = useSelector(state => state.dishForm.form);
    const {labels} = useSelector(state => state.dishForm.fetchLabels);

    useEffect(() => {
        dispatch(getLabels());
    }, [dispatch]);

    const getLabelsIcons = (label) => {
        const isChosen = chosenLabels.some(l => l.id === label.id);
        return `${process.env.PUBLIC_URL}/theme/icons/${isChosen ? '' : 'inactive-'}${label.iconName}`;
    }

    const handleLabelsChange = (label) => {
        const chosenLabelsIds = chosenLabels.map(l => l.id);
        if (chosenLabelsIds.includes(label.id)) {
            dispatch(setChosenLabels(chosenLabels.filter(l => l.id !== label.id)));
        } else {
            dispatch(setChosenLabels([...chosenLabels, label]));
        }
    };

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-label'} className={'form-label'}>
                    {t('labels')} <span className={'form-optional'}>{t('optional')}:</span>
                </label>
                <div className={'form-field labels'} id={'dish-label'}>
                    {labels.map(label => (
                        <Tooltip key={label.id}
                                 content={getTranslation(label.name)}>
                            <ReactSVG className={'selectable-icon'}
                                      src={getLabelsIcons(label, chosenLabels)}
                                      onClick={() => handleLabelsChange(label)}/>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
}