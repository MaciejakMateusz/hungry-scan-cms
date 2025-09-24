import React, {useRef, useState} from "react";
import {getTranslation} from "../../../../locales/langUtils";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {ContextMenu} from "./ContextMenu";
import {useAdditionContextPositions} from "../../../../hooks/useAdditionContextPositions";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";

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
                        <div className={'relative-container'}>
                            <div className={'record-context-actions-button'}
                                 tabIndex={-1}
                                 onClick={() => setContextWindowActive(!contextWindowActive)}>
                                <ThreeDotsIcon/>
                            </div>
                            {contextWindowActive &&
                                <ContextMenu positions={additionContextPositions}
                                             obj={ingredient}
                                             detailsActive={false}
                                             contextRef={contextRef}
                                             position={{left: '-150px', top: '30px'}}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}