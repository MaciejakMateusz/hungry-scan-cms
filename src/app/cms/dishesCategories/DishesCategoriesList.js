import React, {useEffect, useState} from "react";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import {apiHost, imagesPath} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
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
    setCategories,
    setCategory,
    setDish,
    setEditCategoryFormActive,
    setEditDishFormActive
} from "../../../slices/dishesCategoriesSlice";

export const DishesCategoriesList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.dishesCategories)
    const [categoryForAction, setCategoryForAction] = useState({});
    const [menuItemForAction, setMenuItemForAction] = useState({});
    const [activeRemovalType, setActiveRemovalType] = useState(null);
    const [confirmedRemovalType, setConfirmedRemovalType] = useState(null);
    const [errorData, setErrorData] = useState({});
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const [errorTimeoutId, setErrorTimeoutId] = useState(null);
    const [spinner, setSpinner] = useState(null);

    const fetchCategories = () => {
        setSpinner(<LoadingSpinner/>);
        fetch(`${apiHost}/api/cms/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was an error while communicating with a server.");
            }
        }).then(data => {
            setSpinner(null);
            dispatch(setCategories(data));
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    const handleCategoryRemoval = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify(categoryForAction.id);

        fetch(`${apiHost}/api/cms/categories/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: requestBody
        }).then(response => {
            if (response.ok) {
                setActiveRemovalType(null);
                setCategoryForAction({});
                setConfirmedRemovalType('category');

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setConfirmedRemovalType(null);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);

                fetchCategories();
                return response.text();
            } else {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
        }).catch(errorData => {
            setActiveRemovalType(null);

            if (errorTimeoutId) {
                clearTimeout(errorTimeoutId);
                setErrorData({})
            }

            setErrorData(errorData);

            const newErrorTimeoutId = setTimeout(() => {
                setErrorData({});
            }, 4000);
            setErrorTimeoutId(newErrorTimeoutId);
        });
    };

    const handleDishRemoval = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify(menuItemForAction.id);

        fetch(`${apiHost}/api/cms/items/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: requestBody
        }).then(response => {
            if (response.ok) {
                setActiveRemovalType(null);
                setMenuItemForAction({});
                setConfirmedRemovalType('dish');

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setConfirmedRemovalType(null);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);

                fetchCategories();
                return response.text();
            } else {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
        }).catch(errorData => {
            setActiveRemovalType(null);

            if (errorTimeoutId) {
                clearTimeout(errorTimeoutId);
                setErrorData({})
            }

            setErrorData(errorData);

            const newErrorTimeoutId = setTimeout(() => {
                setErrorData({});
            }, 4000);
            setErrorTimeoutId(newErrorTimeoutId);
        });
    };

    const renderRemovalDialog = () => {
        if (activeRemovalType === 'category') {
            return <RemovalDialog msg={t('confirmCategoryRemoval')}
                                  objName={categoryForAction.name}
                                  onSubmit={handleCategoryRemoval}
                                  onClick={discardDeletion}/>
        } else if (activeRemovalType === 'dish') {
            return <RemovalDialog msg={t('confirmDishRemoval')}
                                  objName={menuItemForAction.name}
                                  onSubmit={handleDishRemoval}
                                  onClick={discardDeletion}/>
        }
    };

    const renderConfirmationDialog = () => {
        if (confirmedRemovalType === 'category') {
            return (<ConfirmationDialogWindow text={t('categoryRemovalSuccess')}/>);
        } else if (confirmedRemovalType === 'dish') {
            return (<ConfirmationDialogWindow text={t('dishRemovalSuccess')}/>);
        }
    }

    const discardDeletion = () => {
        setActiveRemovalType(false);
        setCategoryForAction({});
    };

    const renderList = () => {
        if (spinner || !categories || categories.length === 0) {
            return (<LoadingSpinner/>);
        }
        return categories.map(category => (
            <div key={category.id} className={'dishes-categories-list-grid'}>
                <div className={'category-wrapper'}>
                    <div className={'category-container'}>
                        <div className={'category-display-order'}>{category.displayOrder}</div>
                        <span className={'category-container-text'}>{getTranslation(category.name)}</span>
                    </div>
                    <div className={'category-manage-btns-pill-box'}>
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
                            setCategoryForAction(category);
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
                                                <span>{menuItem.price} zł</span>
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
                                        setMenuItemForAction(menuItem);
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