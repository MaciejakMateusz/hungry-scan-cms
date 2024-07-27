import React, {useEffect, useState} from "react";
import {imagesPath} from "../../../apiData";
import {formatPrice} from "../../../utils";
import {FailureMessage} from "../dialog-windows/FailureMessage";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {ImgPlaceholderIcon} from "../../icons/ImgPlaceholderIcon";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategories,
    setActiveRemovalType,
    setCategories,
    setCategory,
    setCategoryForAction,
    setEditCategoryFormActive,
    setMenuItemForAction
} from "../../../slices/dishesCategoriesSlice";
import {remove} from "../../../slices/objectRemovalSlice";
import {DishButtonsVerticalPill} from "./DishButtonsVerticalPill";
import {HorizontalPill} from "./HorizontalPill";

export const DishesCategoriesList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        categories,
        categoryForAction,
        menuItemForAction,
        filteredItems,
        filterValue,
        activeRemovalType
    } = useSelector(state => state.dishesCategories.view)
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
        fetchCategories();
    }, []);

    const handleRemoval = async (e) => {
        e.preventDefault();

        const actionType = categoryForAction ? 'categories' : 'items';
        const id = categoryForAction ? categoryForAction.id : menuItemForAction.id;

        const resultAction = await dispatch(remove({id: id, path: actionType}));
        if(remove.fulfilled.match(resultAction)) {
            if('categories' === actionType) {
                dispatch(setActiveRemovalType(null));
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
                dispatch(setActiveRemovalType(null));
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
                dispatch(setActiveRemovalType(null));

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
                dispatch(setActiveRemovalType(null));

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
        return <DecisionDialog msg={msg}
                              objName={objName}
                              onSubmit={handleRemoval}
                              onCancel={discardDeletion}/>
    };

    const renderConfirmationDialog = () => {
        if (confirmedRemovalType === 'category') {
            return (<SuccessMessage text={t('categoryRemovalSuccess')}/>);
        } else if (confirmedRemovalType === 'dish') {
            return (<SuccessMessage text={t('dishRemovalSuccess')}/>);
        }
    }

    const discardDeletion = () => {
        dispatch(setActiveRemovalType(null));
        dispatch(setCategoryForAction(null));
        dispatch(setMenuItemForAction(null));
    };

    const renderList = () => {
        if(filterValue !== '') {
            return;
        }
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
                    <HorizontalPill available={category.available}
                                    onEdit={() => {
                                        dispatch(setCategory(category));
                                        dispatch(setEditCategoryFormActive(true));
                                    }}
                                    onDelete={() => {
                                        dispatch(setCategoryForAction(category));
                                        dispatch(setActiveRemovalType('category'));
                                    }}
                    />
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
                            <DishButtonsVerticalPill menuItem={menuItem} category={category}/>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    const renderFilteredItems = () => {
        if(!filteredItems) {
            return;
        }
        return (
            <div className={'filtered-dishes-list-grid'}>
                <div className={'dishes-wrapper'}>
                    {filteredItems.length === 0 && (<span className={'no-items-msg'}>{t('noDishes')}</span>)}
                    {filteredItems.map(menuItem => (
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
                            <DishButtonsVerticalPill menuItem={menuItem}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="dishes-categories-list-container">
            {categories.length === 0 ?
                <span className="no-items-msg categories">{t('noCategories')}</span> :
                renderList()}
            {filterValue !== '' ? renderFilteredItems() : <></>}
            {activeRemovalType && renderRemovalDialog()}
            {confirmedRemovalType && renderConfirmationDialog()}
            {errorData.exceptionMsg && (<FailureMessage text={errorData.exceptionMsg}/>)}
        </div>
    );
};