import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {
    getCategories,
    setActiveRemovalType,
    setCategories,
    setCategoryForAction,
    setMenuItemForAction
} from "../../../slices/dishesCategoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {FailureMessage} from "../dialog-windows/FailureMessage";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {remove} from "../../../slices/objectRemovalSlice";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";
import {CategoryPosition} from "./category/CategoryPosition";

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
        if (getCategories.fulfilled.match(resultAction)) {
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
        if (remove.fulfilled.match(resultAction)) {
            if ('categories' === actionType) {
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
        } else if (remove.rejected.match(resultAction)) {
            if ('categories' === actionType) {
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

    const discardDeletion = () => {
        dispatch(setActiveRemovalType(null));
        dispatch(setCategoryForAction(null));
        dispatch(setMenuItemForAction(null));
    };

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

    const renderCategories = () => {
        return categories.map(category => (
            <div key={category.id} className={'category-container-new'}>
                <CategoryPosition category={category}/>
                {category.menuItems.length > 1 ? <div className={'menu-item-position-separator'}/> : <></>}
                {category.menuItems.map(menuItem => (
                    <MenuItemPosition key={`${menuItem.id}-${menuItem.displayOrder}`}
                                      category={category}
                                      menuItem={menuItem}
                                      fetchCategories={fetchCategories}/>
                ))}
            </div>
        ));
    }

    return (
        <div className={'scrollable-wrapper'}>
            {renderCategories()}
            {activeRemovalType && renderRemovalDialog()}
            {confirmedRemovalType && renderConfirmationDialog()}
            {errorData.exceptionMsg && (<FailureMessage text={errorData.exceptionMsg}/>)}
        </div>
    );
}