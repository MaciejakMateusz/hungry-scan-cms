import React, {useRef, useState} from "react";
import {useAdditionContextPositions} from "../../../../hooks/useAdditionContextPositions";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {RecordOptionsButton} from "./RecordOptionsButton";
import {useDispatch, useSelector} from "react-redux";
import {setAddition, setAdditionDialogActive, setIsNewAddition} from "../../../../slices/additionsSlice";

export const AdditionRecord = ({ingredient, name, price}) => {
    const dispatch = useDispatch();
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const [hovered, setHovered] = useState(false);
    const additionContextPositions =
        useAdditionContextPositions({ingredient, setContextWindowActive});
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    const handleStopPropagation = e => {
        e.stopPropagation();
    }

    return (
        <>
            <div className={'addition-record-container'}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
                 onClick={() => {
                     dispatch(setAddition(ingredient));
                     dispatch(setIsNewAddition(false));
                     dispatch(setAdditionDialogActive(true));
                 }}>
                <div className={'addition-record'}>
                    <span>{name[restaurantLanguage]}</span>
                    <div className={'addition-price-actions-group'}>
                        <span>+ {price.toFixed(2)} zł</span>
                        <div onClick={handleStopPropagation}>
                            <RecordOptionsButton className={'record-context-actions-button'}
                                                 onClick={() => setContextWindowActive(!contextWindowActive)}
                                                 dotsFill={hovered ? undefined : 'transparent'}
                                                 contextWindowActive={contextWindowActive}
                                                 contextPositions={additionContextPositions}
                                                 contextRef={contextRef}
                                                 windowPosition={{left: '-150px', top: '30px'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}