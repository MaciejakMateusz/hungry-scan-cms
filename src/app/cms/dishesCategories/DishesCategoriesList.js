import React, {useEffect, useState} from "react";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import {imagesPath} from "../../../apiData";
import {formatPrice} from "../../../utils";
import {UnavailableIcon} from "../../icons/UnavailableIcon";
import {WarningDialogWindow} from "../dialogWindows/WarningDialogWindow";
import {ConfirmationDialogWindow} from "../dialogWindows/ConfirmationDialogWindow";
import {ImgPlaceholderIcon} from "../../icons/ImgPlaceholderIcon";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {RemovalDialog} from "../dialogWindows/RemovalDialog";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategories,
    setCategories,
    setCategory,
    setCategoryForAction,
    setDish,
    setEditCategoryFormActive,
    setEditDishFormActive,
    setMenuItemForAction
} from "../../../slices/dishesCategoriesSlice";
import {remove} from "../../../slices/objectRemovalSlice";

export const DishesCategoriesList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        categories,
        categoryForAction,
        menuItemForAction
    } = useSelector(state => state.dishesCategories.view)
    const [activeRemovalType, setActiveRemovalType] = useState(null);
    const [confirmedRemovalType, setConfirmedRemovalType] = useState(null);
    const [errorData, setErrorData] = useState({});
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const [errorTimeoutId, setErrorTimeoutId] = useState(null);
    const [spinner, setSpinner] = useState(null);

    const fetchCategories = async () => {
        setSpinner(<LoadingSpinner/>);
        const resultAction = await dispatch(getCategories());
        if(getCategories.fulfilled.match(resultAction)) {
            setSpinner(null);
            dispatch(setCategories(resultAction.payload));
        }
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    const handleRemoval = async (e) => {
        e.preventDefault();

        const actionType = categoryForAction ? 'categories' : 'items';
        const id = categoryForAction ? categoryForAction.id : menuItemForAction.id;

        const resultAction = await dispatch(remove({id: id, path: actionType}));
        if(remove.fulfilled.match(resultAction)) {
            if('categories' === actionType) {
                setActiveRemovalType(null);
                dispatch(setCategoryForAction(null));
                setConfirmedRemovalType('category');

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setConfirmedRemovalType(null);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);

                await fetchCategories();
            } else {
                setActiveRemovalType(null);
                dispatch(setMenuItemForAction(null));
                setConfirmedRemovalType('dish');

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setConfirmedRemovalType(null);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);

                await fetchCategories();
            }
        } else if(remove.rejected.match(resultAction)) {
            if('categories' === actionType) {
                setActiveRemovalType(null);

                if (errorTimeoutId) {
                    clearTimeout(errorTimeoutId);
                    setErrorData({})
                }

                setErrorData(resultAction.payload);

                const newErrorTimeoutId = setTimeout(() => {
                    setErrorData({});
                }, 4000);
                setErrorTimeoutId(newErrorTimeoutId);
            } else {
                setActiveRemovalType(null);

                if (errorTimeoutId) {
                    clearTimeout(errorTimeoutId);
                    setErrorData({})
                }

                setErrorData(resultAction.payload);

                const newErrorTimeoutId = setTimeout(() => {
                    setErrorData({});
                }, 4000);
                setErrorTimeoutId(newErrorTimeoutId);
            }
        }
    }

    const renderRemovalDialog = () => {
        const msg = activeRemovalType === 'category' ? t('confirmCategoryRemoval') : t('confirmDishRemoval');
        const objName = activeRemovalType === 'category' ? categoryForAction.name : menuItemForAction.name;
        return <RemovalDialog msg={msg}
                              objName={objName}
                              onSubmit={handleRemoval}
                              onCancel={discardDeletion}/>
    };

    const renderConfirmationDialog = () => {
        if (confirmedRemovalType === 'category') {
            return (<ConfirmationDialogWindow text={t('categoryRemovalSuccess')}/>);
        } else if (confirmedRemovalType === 'dish') {
            return (<ConfirmationDialogWindow text={t('dishRemovalSuccess')}/>);
        }
    }

    const discardDeletion = () => {
        setActiveRemovalType(null);
        dispatch(setCategoryForAction(null));
        dispatch(setMenuItemForAction(null));
    };

    const renderList = () => {
        if (spinner || !categories || categories.length === 0) {
            return (<LoadingSpinner/>);
        }
        return categories.map(category => (
            <div key={category.id} className={'dishes-categories-list-grid'}>
                <div className={'category-wrapper'}>
                    <div className={'category-container'}>
                        <div className={'display-order'}>{category.displayOrder}</div>
                        <span className={'category-container-text'}>{getTranslation(category.name)}</span>
                    </div>
                    <div className={'manage-buttons-horizontal-pill'}>
                        <div className={'hover-scaling'}>
                            {category.available ? <AvailableIcon/> : <UnavailableIcon/>}
                        </div>
                        <div>
                            <div className={'clickable-icon hover-scaling'} onClick={() => {
                                dispatch(setCategory(category));
                                dispatch(setEditCategoryFormActive(true));
                            }}>
                                <EditIcon/>
                            </div>
                        </div>
                        <div className={'clickable-icon hover-scaling'} onClick={() => {
                            dispatch(setCategoryForAction(category));
                            setActiveRemovalType('category');
                        }}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </div>
                <div className={'dishes-wrapper'}>
                    {category.menuItems.length === 0 && (<span className={'no-items-msg'}>{t('noDishes')}</span>)}
                    {category.menuItems.map(menuItem => (
                        <div key={menuItem.id} className={'dish-container'}>
                            <div className={'dish-content-wrapper'}>
                                <div className={'dish-display-order'}>
                                    <span>{menuItem.displayOrder}</span>
                                </div>
                                <div className={'dish-content-box'}>
                                    <div className={'dish-content-grid'}>
                                        <div className={'dish-image-container'}>
                                            {menuItem.imageName ?
                                                <img className={'dish-image'}
                                                     src={`${imagesPath}/${menuItem.imageName}`}
                                                     alt={`Dish - ${menuItem.imageName}`}/> :
                                                <ImgPlaceholderIcon/>
                                            }
                                        </div>
                                        <div className={'dish-text-grid'}>
                                            <span className={'dish-title'}>{getTranslation(menuItem.name)}</span>
                                            <span
                                                className={'dish-description'}>{getTranslation(menuItem.description)}</span>
                                            <div className={'dish-price'}>
                                                <span>{formatPrice(menuItem.price)} zł</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'dish-manage-btns-pill-wrapper'}>
                                <div className={'dish-manage-btns-pill-box'}>
                                    <div className={'hover-scaling'}>
                                        {menuItem.available ? <AvailableIcon/> : <UnavailableIcon/>}
                                    </div>
                                    <div className={'clickable-icon hover-scaling'} onClick={() => {
                                        dispatch(setCategory(category));
                                        dispatch(setDish(menuItem));
                                        dispatch(setEditDishFormActive(true))}}>
                                        <EditIcon/>
                                    </div>
                                    <div className={'clickable-icon hover-scaling'} onClick={() => {
                                        dispatch(setMenuItemForAction(menuItem));
                                        setActiveRemovalType('dish');
                                    }}>
                                        <DeleteIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="dishes-categories-list-container">
            {categories.length === 0 ? (
                <span className="no-items-msg categories">{t('noCategories')}</span>) : renderList()}
            {activeRemovalType && renderRemovalDialog()}
            {confirmedRemovalType && renderConfirmationDialog()}
            {errorData.exceptionMsg && (<WarningDialogWindow text={errorData.exceptionMsg}/>)}
        </div>
    );
};