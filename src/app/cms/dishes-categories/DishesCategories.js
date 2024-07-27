import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {DishesCategoriesList} from "./DishesCategoriesList";
import {NewCategoryForm} from "./NewCategoryForm";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
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
import {FilteringForm} from "../shared-components/FilteringForm";

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
                        <button className={'general-button new-category'}
                                onClick={() => dispatch(setNewCategoryFormActive(true))}>
                            <span>+ {t('newCategory')}</span>
                        </button>
                        <button className={'general-button new-dish'}
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