import React, {useRef, useState} from "react";
import {useAdditionContextPositions} from "../../../../hooks/useAdditionContextPositions";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {RecordOptionsButton} from "./RecordOptionsButton";
import {useSelector} from "react-redux";

export const AdditionRecord = ({ingredient, name, price}) => {
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const additionContextPositions =
        useAdditionContextPositions({ingredient, setContextWindowActive});
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    return (
        <>
            <div className={'addition-record-container'}>
                <div className={'addition-record'}>
                    <span>{name[restaurantLanguage]}</span>
                    <div className={'addition-price-actions-group'}>
                        <span>+ {price.toFixed(2)} zł</span>
                        <RecordOptionsButton className={'record-context-actions-button'}
                                             onClick={() => setContextWindowActive(!contextWindowActive)}
                                             contextWindowActive={contextWindowActive}
                                             contextPositions={additionContextPositions}
                                             contextRef={contextRef}
                                             windowPosition={{left: '-150px', top: '30px'}}/>
                    </div>
                </div>
            </div>
        </>
    );
}