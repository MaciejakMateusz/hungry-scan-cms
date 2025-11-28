import React, {Fragment, useRef, useState} from "react";
import {s3BucketUrl} from "../../../../../apiData";
import {formatPrice} from "../../../../../utils/utils";
import {useTranslation} from "react-i18next";
import {DragAndDropIcon} from "../../../../icons/DragAndDropIcon";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {InteractiveMenuItemImage} from "./InteractiveMenuItemImage";
import {RecordOptionsButton} from "../../shared-components/RecordOptionsButton";
import {useOutsideClick} from "../../../../../hooks/useOutsideClick";
import {useMenuItemContextPositions} from "../../../../../hooks/useMenuItemContextPositions";
import {useImageExists} from "../../../../../hooks/useImageExists";
import {
    Banner, BannersContainer,
    BannersWrapper,
    DragAndDropWrapper,
    ImageWrapper,
    LabelsAllergensCounters,
    PricesWrapper,
    TextWrapper,
    VariantsAdditionsCounters
} from "./MenuItemPosition.style";
import {UnavailableIcon} from "../../../../icons/UnavailableIcon";
import {Tooltip} from "../../Tooltip";
import {useGetTranslation} from "../../../../../hooks/useGetTranslation";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setDish, setEditDishFormActive} from "../../../../../slices/dishesCategoriesSlice";
import {setCategoryId} from "../../../../../slices/dishFormSlice";

export const MenuItemPosition = ({id, category, menuItem, filtered}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const getTranslation = useGetTranslation();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const contextRef = useRef();
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const menuItemContextPositions =
        useMenuItemContextPositions({
            category, menuItem, setContextWindowActive
        });
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
        zIndex: isDragging && !filtered ? 800 : 'auto',
        cursor: "pointer"
    };
    const hasImage = useImageExists(id);

    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    const renderPrices = menuItem => {
        if (menuItem.promoPrice) {
            return (
                <div>
                    <div style={{textDecoration: 'line-through'}}>
                        {formatPrice(menuItem.price)} zł
                    </div>
                    <div>
                        {formatPrice(menuItem.promoPrice)} zł
                    </div>
                </div>
            )
        }
        return `${formatPrice(menuItem.price)} zł`;
    }

    const renderBanners = menuItem => {
        return (
            <BannersContainer>
                {menuItem.banners?.filter(banner => banner.id !== 'promo')
                    .map(banner => (
                        <Banner key={banner.id}>
                            {getTranslation(banner.name)}
                        </Banner>
                    ))}
            </BannersContainer>
        );
    }


    const handleEdit = async () => {
        dispatch(setCategory(category));
        dispatch(setCategoryId(category.id));
        dispatch(setDish(menuItem));
        dispatch(setEditDishFormActive(true));
    };

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <div className={'draggable-position-container'} ref={setNodeRef} style={style} onClick={handleEdit}>
                {!filtered ?
                    <DragAndDropWrapper {...listeners} {...attributes}>
                        <DragAndDropIcon/>
                    </DragAndDropWrapper> :
                    <DragAndDropWrapper $disabled={true}>
                        <DragAndDropIcon disabled={true}/>
                    </DragAndDropWrapper>
                }
                <ImageWrapper onClick={stopClickPropagation}>
                    <InteractiveMenuItemImage src={`${s3BucketUrl}/menuItems/${menuItem.id}.png?t=${menuItem.updated}`}
                                              hasImage={hasImage}/>
                </ImageWrapper>
                <TextWrapper>
                    <span className={'draggable-position-name'}>
                        {menuItem.name[restaurantLanguage]}
                    </span>
                    <span className={'draggable-position-description'}>
                        {menuItem.description[restaurantLanguage]}
                    </span>
                </TextWrapper>
                <PricesWrapper>
                    {renderPrices(menuItem)}
                </PricesWrapper>
                <BannersWrapper>
                    {renderBanners(menuItem)}
                </BannersWrapper>
                <VariantsAdditionsCounters>
                    <div className={'menu-item-position-counter'}>
                        {t('variants')}: {menuItem.variantsCount}
                    </div>
                    <div className={'menu-item-position-counter'}>
                        {t('additions')}: {menuItem.additionsCount}
                    </div>
                </VariantsAdditionsCounters>
                <LabelsAllergensCounters>
                    <div className={'menu-item-position-counter'}>
                        {t('labels')}: {menuItem.labelsCount}
                    </div>
                    <div className={'menu-item-position-counter'}>
                        {t('allergens')}: {menuItem.allergensCount}
                    </div>
                </LabelsAllergensCounters>
                <div>
                    <Tooltip content={t('invisibleInMenu')} topOffset={-20}>
                        {!menuItem.available && <UnavailableIcon/>}
                    </Tooltip>
                </div>
                <div className={'draggable-actions-sticky'} onClick={stopClickPropagation}>
                    <div className={'draggable-position-actions'}
                         onClick={() => setContextWindowActive(!contextWindowActive)}>
                        <RecordOptionsButton className={'record-context-actions-button'}
                                             contextWindowActive={contextWindowActive}
                                             contextPositions={menuItemContextPositions}
                                             contextRef={contextRef}
                                             windowPosition={{left: '-150px', top: '30px'}}/>
                    </div>
                </div>
            </div>
            {menuItem.displayOrder !== category?.menuItems.length && <div className={'draggable-position-separator'}/>}
        </>
    );
};