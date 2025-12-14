import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {FilteredMenuItems} from "./FilteredMenuItems";
import {remove, setRemovalError} from "../../../../slices/objectRemovalSlice";
import {
    setActiveRemovalType,
    setCategoryForAction,
    setMenuItemForAction
} from "../../../../slices/dishesCategoriesSlice";
import {ReorderCategoriesDialog} from "../dialog-windows/ReorderCategoriesDialog";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {setCategoryRemoved} from "../../../../slices/categoryFormSlice";
import {setMenuItemRemoved} from "../../../../slices/dishFormSlice";
import {SwitchCategoryDialog} from "../dialog-windows/SwitchCategoryDialog";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {CategoryContent} from "./CategoryContent";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";

export const DishesCategoriesList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        categoryForAction,
        reorderCategoriesDialogActive,
        switchCategoryDialogActive,
        menuItemForAction,
        filterValue,
        activeRemovalType
    } = useSelector(state => state.dishesCategories.view);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {isMenuLoading} = useSelector(state => state.cms.fetchActiveMenu.isLoading);
    const [localCategories, setLocalCategories] = useState([]);
    const {isLoading: removalPending, removalError} = useSelector(state => state.objRemoval);
    const confirmCategoryRemoval = useConfirmationMessage(setCategoryRemoved);
    const confirmMenuItemRemoval = useConfirmationMessage(setMenuItemRemoved);

    useEffect(() => {
        if (menu?.categories) {
            setLocalCategories(menu.categories);
        }
    }, [menu]);

    const handleRemoval = async (e) => {
        e.preventDefault();

        const actionType = categoryForAction ? 'categories' : 'items';
        const id = categoryForAction ? categoryForAction.id : menuItemForAction.id;

        const resultAction = await dispatch(remove({id: id, path: actionType}));
        if (remove.fulfilled.match(resultAction)) {
            if ('categories' === actionType) {
                dispatch(setActiveRemovalType(null));
                dispatch(setCategoryForAction(null));
                confirmCategoryRemoval();
            } else {
                dispatch(setActiveRemovalType(null));
                dispatch(setMenuItemForAction(null));
                confirmMenuItemRemoval();
            }
        } else if (remove.rejected.match(resultAction)) {

        }
    }

    const discardDeletion = () => {
        dispatch(setActiveRemovalType(null));
        dispatch(setCategoryForAction(null));
        dispatch(setMenuItemForAction(null));
    };

    const renderRemovalDialog = () => {
        if (!['category', 'dish'].includes(activeRemovalType)) return;
        const msg =
            activeRemovalType === 'category' ? t('confirmCategoryRemoval') : t('confirmDishRemoval');
        const objName = activeRemovalType === 'category' ? categoryForAction.name : menuItemForAction.name;
        return <DecisionDialog msg={msg}
                               objName={objName}
                               onSubmit={handleRemoval}
                               onCancel={discardDeletion}
                               isLoading={removalPending}
                               isRemoval={true}/>
    };

    const renderCategories = () => {
        if (menu?.categories.length === 0) {
            return (<p className={'text-center'}>{t('noCategoriesCreated')}</p>);
        }

        return localCategories?.map(category => <CategoryContent key={category.id}
                                                                category={category}
                                                                localCategories={localCategories}
                                                                setLocalCategories={setLocalCategories}/>);
    };

    if (isMenuLoading) {
        return (<LoadingSpinner/>);
    }

    return (
        <div className={'scrollable-y-wrapper'}>
            {filterValue ?
                <FilteredMenuItems/> :
                renderCategories()}
            {activeRemovalType && renderRemovalDialog()}
            {reorderCategoriesDialogActive && <ReorderCategoriesDialog/>}
            {switchCategoryDialogActive && <SwitchCategoryDialog/>}
            <FormErrorDialog errorData={removalError} setErrorData={setRemovalError}/>
        </div>
    );
}