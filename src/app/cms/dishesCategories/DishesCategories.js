import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {DishesCategoriesList} from "./DishesCategoriesList";
import {NewCategoryForm} from "./NewCategoryForm";
import {ConfirmationDialogWindow} from "../dialogWindows/ConfirmationDialogWindow";
import {EditCategoryForm} from "./EditCategoryForm";
import {NewDishForm} from "./NewDishForm";
import {EditDishForm} from "./EditDishForm";
import ErrorBoundary from "../../error/ErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import {
    setFilteringActive,
    setFilteredItems,
    setFilterValue,
    setFilterExpanded,
    setNewCategoryFormActive,
    setNewDishFormActive,
} from "../../../slices/dishesCategoriesSlice";
import {filter} from "../../../slices/filteringSlice";
import {FilteringForm} from "../utils/filtering/FilteringForm";

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
                return (<ConfirmationDialogWindow text={t('categorySaved')}/>);
            case 'category-edit':
                return (<ConfirmationDialogWindow text={t('categoryEdited')}/>);
            case 'dish-save':
                return (<ConfirmationDialogWindow text={t('dishSaved')}/>);
            case 'dish-edit':
                return (<ConfirmationDialogWindow text={t('dishEdited')}/>);
            default:
                return null;
        }
    }

    const handleDishesCategoriesRendering = () => {
        if (newCategoryFormActive) {
            return <NewCategoryForm/>
        } else if (editCategoryFormActive) {
            return <EditCategoryForm/>
        } else if (newDishFormActive) {
            return <NewDishForm/>
        } else if (editDishFormActive) {
            return (<EditDishForm executeFilter={executeFilter}/>);
        } else {
            return (
                <div className={'dishes-categories-grid'}>
                    <div className={'new-buttons-container'}>
                        <button className={'add-new-button new-category'}
                                onClick={() => dispatch(setNewCategoryFormActive(true))}>
                            <span>+ {t('newCategory')}</span>
                        </button>
                        <button className={'add-new-button new-dish'}
                                onClick={() => dispatch(setNewDishFormActive(true))}>
                            <span>+ {t('newDish')}</span>
                        </button>
                        <div className={`search-button ${filterExpanded ? 'search-active' : ''}`}>
                            <button className={`search-initial-circle ${filterExpanded ? 'circle-active' : ''}`}
                                    onClick={() => dispatch(setFilterExpanded(!filterExpanded))}>
                                <SearchIcon/>
                            </button>
                            {filterExpanded ? <FilteringForm value={filterValue} searchSubmit={handleSearchSubmit}/>  : <></>}
                        </div>
                    </div>
                    <DishesCategoriesList/>
                </div>
            );
        }
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t('dishesCategories')}</title>
            </Helmet>
            {submittedSuccessType && renderConfirmationDialog(submittedSuccessType)}
            <ErrorBoundary>
                {handleDishesCategoriesRendering()}
            </ErrorBoundary>
        </>
    );
}