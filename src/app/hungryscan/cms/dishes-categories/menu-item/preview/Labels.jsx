import React from "react";
import {useSelector} from "react-redux";
import {ReactSVG} from "react-svg";
import {Tooltip} from "../../../Tooltip";
import {getTranslation} from "../../../../../../locales/langUtils";

export const Labels = () => {
    const {chosenLabels} = useSelector(state => state.dishForm.fetchLabels);

    if (chosenLabels?.length === 0) {
        return (<></>);
    }

    return (
        <div className={'details-labels-container'}>
            {chosenLabels?.map(label => (
                <Tooltip content={getTranslation(label.value?.name)}
                         key={label.value?.id}>
                    <ReactSVG className={'details-label-icon'}
                              src={`${process.env.PUBLIC_URL}/theme/preview-icons/${label.value?.iconName}`}
                    />
                </Tooltip>
            ))}
        </div>
    );
}