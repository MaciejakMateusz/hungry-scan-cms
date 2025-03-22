import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {DishesCategoriesList} from "./DishesCategoriesList";
import {SearchButton} from "./SearchButton";
import {useDispatch, useSelector} from "react-redux";
import {NewCategoryForm} from "./category/NewCategoryForm";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {NewMenuItemForm} from "./menu-item/NewMenuItemForm";
import {EditMenuItemForm} from "./menu-item/EditMenuItemForm";
import {EditCategoryForm} from "./category/EditCategoryForm";
import {
    setFilteredItems,
    setFilterExpanded,
    setFilteringActive,
    setFilterValue
} from "../../../../slices/variantsSlice";
import {filter} from "../../../../slices/filteringSlice";
import {setNewCategoryFormActive} from "../../../../slices/dishesCategoriesSlice";
import ErrorBoundary from "../../../error/ErrorBoundary";

export const DishesCategories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        filterValue,
        filterExpanded,
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive,
        submittedSuccessType
    } = useSelector(state => state.dishesCategories.view)

    useEffect(() => {
        if (!filterExpanded && filterValue !== '') {
            dispatch(setFilterValue(''));
            executeFilter('');
        }
    }, [dispatch, filterExpanded]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        dispatch(setFilterValue(e.target.value));
        await executeFilter(e.target.value);
    }

    const executeFilter = async value => {
        if ('' !== value) {
            dispatch(setFilteringActive(true));
            const resultAction = await dispatch(filter({path: 'items', value: value}));
            if (filter.fulfilled.match(resultAction)) {
                dispatch(setFilteredItems(resultAction.payload));
            }
        } else {
            dispatch(setFilteringActive(false));
            dispatch(setFilteredItems(null));
        }
    }

    const renderConfirmationDialog = (type) => {
        switch (type) {
            case 'category-save':
                return (<SuccessMessage text={t('categorySaved')}/>);
            case 'category-edit':
                return (<SuccessMessage text={t('categoryEdited')}/>);
            case 'dish-save':
                return (<SuccessMessage text={t('dishSaved')}/>);
            case 'dish-edit':
                return (<SuccessMessage text={t('dishEdited')}/>);
            default:
                return null;
        }
    }

    if(newCategoryFormActive) {
        return (<NewCategoryForm/>);
    } else if(editCategoryFormActive) {
        return (<EditCategoryForm/>);
    } else if(newDishFormActive) {
        return (<NewMenuItemForm/>);
    } else if(editDishFormActive) {
        return (<EditMenuItemForm executeFilter={executeFilter}/>);
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t('dishesCategories')}</title>
            </Helmet>
            {submittedSuccessType && renderConfirmationDialog(submittedSuccessType)}
            <div className={'background'}>
                <main className={'translations-padded-view-container'}>
                    <div className={'functions-header'}>
                        <div className={'section-heading'}>{t('dishesCategories')}</div>
                        <div className={'flex-wrapper-gapped'}>
                            <div className={'general-button-new'}
                                 onClick={() => dispatch(setNewCategoryFormActive(true))}>+ &nbsp;{t('newCategory')}
                            </div>
                            <SearchButton filterExpanded={filterExpanded}
                                          onExpand={() => dispatch(setFilterExpanded(!filterExpanded))}
                                          filterValue={filterValue}
                                          onSubmit={handleSearchSubmit} onClear={() => dispatch(setFilterValue(''))}
                            />
                        </div>
                    </div>
                    <ErrorBoundary>
                        <DishesCategoriesList filter={executeFilter}/>
                    </ErrorBoundary>
                </main>
            </div>
        </>
    );
}