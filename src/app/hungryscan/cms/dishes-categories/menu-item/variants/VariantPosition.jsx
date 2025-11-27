import React, {useRef, useState} from "react";
import {DragAndDropIcon} from "../../../../../icons/DragAndDropIcon";
import {formatPrice} from "../../../../../../utils/utils";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useVariantContextPositions} from "../../../../../../hooks/useVariantContextPositions";
import {useOutsideClick} from "../../../../../../hooks/useOutsideClick";
import {useDispatch, useSelector} from "react-redux";
import {RecordOptionsButton} from "../../../shared-components/RecordOptionsButton";
import {Tooltip} from "../../../Tooltip";
import {UnavailableIcon} from "../../../../../icons/UnavailableIcon";
import {useTranslation} from "react-i18next";
import {setIsNewVariant, setVariant, setVariantDialogActive} from "../../../../../../slices/variantsSlice";

export const VariantPosition = ({id, variant}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {variants} = useSelector(state => state.dishForm.form);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const variantContextPositions =
        useVariantContextPositions({variant, setContextWindowActive});
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 'auto'
    };

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    const handleEdit = () => {
        dispatch(setVariant(variant));
        dispatch(setIsNewVariant(false));
        dispatch(setVariantDialogActive(true));
        setContextWindowActive(false)
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    };


    return (
        <>
            <div ref={setNodeRef}
                 style={style}
                 className={'draggable-position-container variant'}
                 onClick={handleEdit}>
                <div className={'drag-and-drop-wrapper'} {...listeners} {...attributes}>
                    <DragAndDropIcon/>
                </div>
                <div className={'draggable-position-text-container'}>
                    <span className={'draggable-position-name'}>
                        {variant.name[restaurantLanguage]}
                    </span>
                </div>
                <div className={'draggable-position-price'}>
                    + {formatPrice(variant.price)} zł
                </div>
                <div>
                    <Tooltip content={t('invisibleInMenu')} topOffset={-20}>
                        {!variant.available && <UnavailableIcon width={'18'} height={'18'}/>}
                    </Tooltip>
                </div>
                <div className={'draggable-actions-sticky'} onClick={stopClickPropagation}>
                    <div className={'draggable-position-actions visible'}
                         onClick={() => setContextWindowActive(!contextWindowActive)}>
                        <RecordOptionsButton className={'record-context-actions-button'}
                                             contextWindowActive={contextWindowActive}
                                             contextPositions={variantContextPositions}
                                             contextRef={contextRef}
                                             windowPosition={{left: '-150px', top: '30px'}}/>
                    </div>
                </div>
            </div>
            {variant.displayOrder !== variants.length && <div className={'draggable-position-separator variant'}/>}
        </>
    );
}