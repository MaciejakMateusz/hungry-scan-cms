import React, {Fragment, useRef, useState} from "react";
import {s3BucketUrl} from "../../../../../apiData";
import {getTranslation} from "../../../../../locales/langUtils";
import {formatPrice} from "../../../../../utils/utils";
import {Tooltip} from "../../Tooltip";
import {ReactSVG} from "react-svg";
import {useTranslation} from "react-i18next";
import {DragAndDropIcon} from "../../../../icons/DragAndDropIcon";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {InteractiveMenuItemImage} from "./InteractiveMenuItemImage";
import {RecordOptionsButton} from "../../shared-components/RecordOptionsButton";
import {useOutsideClick} from "../../../../../hooks/useOutsideClick";
import {useMenuItemContextPositions} from "../../../../../hooks/useMenuItemContextPositions";
import {useImageExists} from "../../../../../hooks/useImageExists";

export const MenuItemPosition = ({id, category, menuItem, filtered}) => {
    const {t} = useTranslation();
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const menuItemContextPositions =
        useMenuItemContextPositions({category, menuItem, setContextWindowActive});
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
        zIndex:  isDragging && !filtered ? 800 : 'auto'
    };
    const hasImage = useImageExists(id);

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    return (
        <>
            <div ref={setNodeRef}
                 style={style}
                 className={'draggable-position-container'}>
                {!filtered ?
                    <div className={'drag-and-drop-wrapper'} {...listeners} {...attributes}>
                        <DragAndDropIcon/>
                    </div> :
                    <div className={'drag-and-drop-wrapper disabled'}>
                        <DragAndDropIcon disabled={true}/>
                    </div>
                }
                <InteractiveMenuItemImage src={`${s3BucketUrl}/menuItems/${menuItem.id}.png?t=${menuItem.updated}`}
                                          hasImage={hasImage}/>
                <div className={'draggable-position-text-container'}>
                    <span className={'draggable-position-name'}>
                        {getTranslation(menuItem.name)}
                    </span>
                    <span className={'draggable-position-description'}>
                        {getTranslation(menuItem.description)}
                    </span>
                </div>
                <div className={'draggable-position-price'}>
                    {formatPrice(menuItem.price)} zł
                </div>
                <div className={'menu-item-position-banner'}>
                    {menuItem.bestseller ? t('isBestseller') : ''}
                    {menuItem.new ? t('isNew') : ''}
                </div>
                <div className={'menu-item-position-allergens-container'}>
                    {menuItem.allergens?.map(allergen => (
                        <Tooltip key={allergen.id} content={getTranslation(allergen.description)}>
                            <ReactSVG src={`${process.env.PUBLIC_URL}/theme/preview-icons/${allergen.iconName}`}/>
                        </Tooltip>
                    ))}
                    {menuItem.labels?.map(label => (
                        <Tooltip key={label.id} content={getTranslation(label.name)}>
                            <ReactSVG src={`${process.env.PUBLIC_URL}/theme/preview-icons/${label.iconName}`}/>
                        </Tooltip>
                    ))}
                </div>
                <div className={'draggable-position-actions'}>
                    <RecordOptionsButton className={'record-context-actions-button'}
                                         onClick={() => setContextWindowActive(!contextWindowActive)}
                                         contextWindowActive={contextWindowActive}
                                         contextPositions={menuItemContextPositions}
                                         obj={menuItem}
                                         detailsActive={false}
                                         contextRef={contextRef}
                                         windowPosition={{left: '-150px', top: '30px'}}/>
                </div>
            </div>
            {menuItem.displayOrder !== category?.menuItems.length && <div className={'draggable-position-separator'}/>}
        </>
    );
};