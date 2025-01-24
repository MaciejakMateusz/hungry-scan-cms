import React, {Fragment} from "react";
import {imagesPath} from "../../../../../apiData";
import {PlaceholderImgIcon} from "../../../../icons/PlaceholderImgIcon";
import {getTranslation} from "../../../../../locales/langUtils";
import {formatPrice} from "../../../../../utils/utils";
import {Tooltip} from "../../Tooltip";
import {ReactSVG} from "react-svg";
import {EditIconNew} from "../../../../icons/EditIconNew";
import {
    getCategory,
    reorderMenuItem,
    setActiveRemovalType,
    setCategory,
    setDish,
    setEditDishFormActive,
    setMenuItemForAction
} from "../../../../../slices/dishesCategoriesSlice";
import {DeleteIconNew} from "../../../../icons/DeleteIconNew";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {DisplayOrderButton} from "./DisplayOrderButton";

export const MenuItemPosition = ({category, menuItem, fetchCategories, filtered}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();


    const getCategoryData = async id => {
        const resultAction = await dispatch(getCategory({id: id}));
        if (getCategory.fulfilled.match(resultAction)) {
            return resultAction.payload.category;
        }
        return null;
    }

    const handleEditClick = async (category, menuItem) => {
        if (category) {
            dispatch(setCategory(category))
        } else {
            const categoryData = await getCategoryData(menuItem.categoryId);
            dispatch(setCategory(categoryData));
        }
        dispatch(setDish(menuItem));
        dispatch(setEditDishFormActive(true));
    }

    const handleReordering = async (menuItem, type) => {
        dispatch(setDish(menuItem));
        dispatch(reorderMenuItem({type: type}));
        await fetchCategories();
    }

    const renderDisplayOrderButtons = (menuItems, currentPosition) => {
        if(filtered) {
            return (<></>);
        }
        if (menuItems?.length === 1) {
            return (<></>);
        }
        if (currentPosition === 1) {
            return (<DisplayOrderButton menuItem={menuItem} direction={'down'} onClick={handleReordering}/>);
        } else if (currentPosition === menuItems?.length) {
            return (<DisplayOrderButton menuItem={menuItem} direction={'up'} onClick={handleReordering}/>);
        }
        return (
            <>
                <DisplayOrderButton menuItem={menuItem} direction={'up'} onClick={handleReordering}/>
                <DisplayOrderButton menuItem={menuItem} direction={'down'} onClick={handleReordering}/>
            </>
        );
    }

    return (
        <Fragment>
            <div className={'menu-item-position-container'}>
                <div className={'display-order-buttons-wrapper'}>
                    {renderDisplayOrderButtons(category?.menuItems, menuItem.displayOrder)}
                </div>
                <div className={'menu-item-position-image-container'}>
                    {menuItem.imageName ?
                        <img className={'menu-item-position-image'}
                             alt={'Menu item preview'}
                             src={`${imagesPath}/${menuItem.imageName}`}/> :
                        <PlaceholderImgIcon/>}
                </div>
                <div className={'menu-item-position-text-container'}>
                    <span className={'menu-item-position-name'}>{getTranslation(menuItem.name)}</span>
                    <span
                        className={'menu-item-position-description'}>{getTranslation(menuItem.description)}</span>
                </div>
                <div className={'menu-item-position-price'}>
                    {formatPrice(menuItem.price)} zł
                </div>
                <div className={'menu-item-position-banner'}>
                    {menuItem.bestseller ? t('isBestseller') : ''}
                    {menuItem.new ? t('isNew') : ''}
                </div>
                <div className={'menu-item-position-allergens-container'}>
                    {menuItem.allergens?.map(allergen => (
                        <Tooltip key={allergen.id}
                                 content={getTranslation(allergen.description)}>
                            <ReactSVG src={`${process.env.PUBLIC_URL}/theme/preview-icons/${allergen.iconName}`}/>
                        </Tooltip>
                    ))}
                    {menuItem.labels?.map(label => (
                        <Tooltip key={label.id}
                                 content={getTranslation(label.name)}>
                            <ReactSVG src={`${process.env.PUBLIC_URL}/theme/preview-icons/${label.iconName}`}/>
                        </Tooltip>
                    ))}
                </div>
                <div className={'menu-item-position-actions'}>
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
            {menuItem.displayOrder === category?.menuItems.length ? <></> :
                <div className={'menu-item-position-separator'}/>
            }
        </Fragment>
    );
}