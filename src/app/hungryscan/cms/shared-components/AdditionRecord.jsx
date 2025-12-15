import React, {useRef, useState} from "react";
import {useAdditionContextPositions} from "../../../../hooks/useAdditionContextPositions";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {RecordOptionsButton} from "./RecordOptionsButton";
import {useDispatch, useSelector} from "react-redux";
import {setAddition, setAdditionDialogActive, setIsNewAddition} from "../../../../slices/additionsSlice";
import {UnavailableIcon} from "../../../icons/UnavailableIcon";
import {Tooltip} from "../Tooltip";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";
import {useCloseOnScroll} from "../../../../hooks/useCloseOnScroll";

export const AdditionRecord = ({ingredient, name, price}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const [hovered, setHovered] = useState(false);
    const additionContextPositions =
        useAdditionContextPositions({ingredient, setContextWindowActive});
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const windowWidth = useWindowWidth();
    const isWide = windowWidth > 1300;

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    useCloseOnScroll(() => {
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
                    <div className={'text-ellipsis'} style={{maxWidth: '35vw'}}>
                        {name[restaurantLanguage]}
                    </div>
                    <div className={'addition-price-actions-group'}>
                        {!ingredient.available &&
                            <Tooltip content={t('invisibleInMenu')} topOffset={-20}>
                                <UnavailableIcon width={'18'} height={'18'}/>
                            </Tooltip>
                        }
                        <span>+ {price.toFixed(2)} zł</span>
                        <div onClick={handleStopPropagation}>
                            <RecordOptionsButton className={'record-context-actions-button'}
                                                 onClick={() => setContextWindowActive(!contextWindowActive)}
                                                 dotsFill={hovered ? undefined : (isWide ? 'transparent' : undefined)}
                                                 contextWindowActive={contextWindowActive}
                                                 contextPositions={additionContextPositions}
                                                 contextRef={contextRef}
                                                 correctPosition={{y: 130, x: 150}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}