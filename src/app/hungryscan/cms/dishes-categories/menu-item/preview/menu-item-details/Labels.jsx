import React from "react";
import {useSelector} from "react-redux";
import {ReactSVG} from "react-svg";
import {Tooltip} from "./Tooltip.jsx";
import {useGetTranslation} from "../../../../../../../hooks/useGetTranslation";
import {Container} from "./Labels.style";

export const Labels = () => {
    const getTranslation = useGetTranslation();
    const {chosenLabels} = useSelector(state => state.dishForm.fetchLabels);

    if (chosenLabels?.length === 0) {
        return null;
    }

    return (
        <Container>
            {chosenLabels?.map(label => (
                <Tooltip content={getTranslation(label.value.name)}
                         appendTo={document.getElementById(`label-${label.value.id}`) || undefined}
                         key={label.value.id}>
                    <div id={`label-${label.value.id}`}>
                        <ReactSVG className={'details-label-icon'}
                                  src={`${process.env.PUBLIC_URL}/theme/icons/${label.value.iconName}`}/>
                    </div>
                </Tooltip>
            ))}
        </Container>
    );
}