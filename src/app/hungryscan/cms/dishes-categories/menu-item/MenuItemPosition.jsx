import React, {Fragment} from "react";
import {s3BucketUrl} from "../../../../../apiData";
import {PlaceholderImgIcon} from "../../../../icons/PlaceholderImgIcon";
import {getTranslation} from "../../../../../locales/langUtils";
import {formatPrice} from "../../../../../utils/utils";
import {Tooltip} from "../../Tooltip";
import {ReactSVG} from "react-svg";
import {EditIconNew} from "../../../../icons/EditIconNew";
import {
    getCategory,
    setActiveRemovalType,
    setCategory,
    setDish,
    setEditDishFormActive,
    setMenuItemForAction
} from "../../../../../slices/dishesCategoriesSlice";
import {DeleteIconNew} from "../../../../icons/DeleteIconNew";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {DragAndDropIcon} from "../../../../icons/DragAndDropIcon";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Img} from "react-image";

export const MenuItemPosition = ({id, category, menuItem, filtered}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging} = useSortable({id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 'auto'
    };

    const getCategoryData = async id => {
        const resultAction = await dispatch(getCategory({id}));
        if (getCategory.fulfilled.match(resultAction)) {
            return resultAction.payload.categoryFormDTO;
        }
        return null;
    };

    const handleEditClick = async (category, menuItem) => {
        if (category) {
            dispatch(setCategory(category));
        } else {
            const categoryData = await getCategoryData(menuItem.categoryId);
            dispatch(setCategory(categoryData));
        }
        dispatch(setDish(menuItem));
        dispatch(setEditDishFormActive(true));
    };

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
                <div className={'menu-item-position-image-container'}>
                    <Img className={'menu-item-position-image'}
                         alt={'Menu item preview'}
                         src={`${s3BucketUrl}/menuItems/${menuItem.id}?t=${menuItem.updated}`}
                         unloader={<PlaceholderImgIcon/>}
                    />
                </div>
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
                    <span className={'clickable-icon'} onClick={() => handleEditClick(category, menuItem)}>
                        <EditIconNew/>
                    </span>
                    <span className={'clickable-icon'} onClick={() => {
                        dispatch(setMenuItemForAction(menuItem));
                        dispatch(setActiveRemovalType('dish'));
                    }}>
                        <DeleteIconNew/>
                    </span>
                </div>
            </div>
            {menuItem.displayOrder !== category?.menuItems.length && <div className={'draggable-position-separator'}/>}
        </>
    );
};