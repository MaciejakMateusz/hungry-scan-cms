import React, {useRef, useState} from "react";
import {getTranslation} from "../../../../locales/langUtils";
import {useAdditionContextPositions} from "../../../../hooks/useAdditionContextPositions";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {RecordOptionsButton} from "./RecordOptionsButton";

export const AdditionRecord = ({ingredient, name, price}) => {
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const additionContextPositions =
        useAdditionContextPositions({ingredient, setContextWindowActive});

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    return (
        <>
            <div className={'addition-record-container'}>
                <div className={'addition-record'}>
                    <span>{getTranslation(name)}</span>
                    <div className={'addition-price-actions-group'}>
                        <span>+ {price.toFixed(2)} zł</span>
                        <RecordOptionsButton className={'record-context-actions-button'}
                                             onClick={() => setContextWindowActive(!contextWindowActive)}
                                             contextWindowActive={contextWindowActive}
                                             contextPositions={additionContextPositions}
                                             obj={ingredient}
                                             detailsActive={false}
                                             contextRef={contextRef}
                                             windowPosition={{left: '-150px', top: '30px'}}/>
                    </div>
                </div>
            </div>
        </>
    );
}