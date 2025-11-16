import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {DishesCategoriesList} from "./DishesCategoriesList";
import {SearchButton} from "./SearchButton";
import {useDispatch, useSelector} from "react-redux";
import {NewCategoryForm} from "./category/NewCategoryForm";
import {NewMenuItemForm} from "./menu-item/NewMenuItemForm";
import {EditMenuItemForm} from "./menu-item/EditMenuItemForm";
import {EditCategoryForm} from "./category/EditCategoryForm";
import {
    setFilteredItems,
    setFilterExpanded,
    setFilteringActive,
    setFilterValue,
    setNewCategoryFormActive
} from "../../../../slices/dishesCategoriesSlice";
import ErrorBoundary from "../../../error/ErrorBoundary";

export const DishesCategories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const {
        filterValue,
        filterExpanded,
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive
    } = useSelector(state => state.dishesCategories.view);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);

    useEffect(() => {
        if (!filterExpanded && filterValue !== '') {
            dispatch(setFilterValue(''));
            executeFilter('');
        }
    }, [dispatch, filterExpanded]);

    useEffect(() => {
        if (filterValue !== '') {
            executeFilter(filterValue);
        }
    }, [menu]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        dispatch(setFilterValue(e.target.value));
        await executeFilter(e.target.value);
    }

    const executeFilter = value => {
        if ('' === value) {
            dispatch(setFilteringActive(false));
            dispatch(setFilteredItems(null));
            return;
        }
        dispatch(setFilteringActive(true));
        const categories = menu?.categories;
        let allItems = [];
        categories?.forEach(category => {
            const categoryItems = category.menuItems;
            allItems.push(...categoryItems);
        });
        const filteredItems = allItems.filter(mi =>
            mi?.name[restaurantLanguage].toLowerCase().includes(value.toLowerCase())
        );
        dispatch(setFilteredItems(filteredItems));
    }

    if (newCategoryFormActive) {
        return (<NewCategoryForm/>);
    } else if (editCategoryFormActive) {
        return (<EditCategoryForm/>);
    } else if (newDishFormActive) {
        return (<NewMenuItemForm/>);
    } else if (editDishFormActive) {
        return (<EditMenuItemForm/>);
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t('dishesCategories')}</title>
            </Helmet>
            <div className={'background'}>
                <main className={'cms-padded-view-container'}>
                    <div className={'functions-header'}>
                        <div className={'section-heading'}>{t('dishesCategories')}</div>
                        <div className={'flex-wrapper-gapped'}>
                            <div className={'general-button-new'}
                                 onClick={() => dispatch(setNewCategoryFormActive(true))}>+ {t('newCategory')}
                            </div>
                            <SearchButton filterExpanded={filterExpanded}
                                          onExpand={() => dispatch(setFilterExpanded(!filterExpanded))}
                                          filterValue={filterValue}
                                          onSubmit={handleSearchSubmit}
                                          onClear={() => dispatch(setFilterValue(''))}
                            />
                        </div>
                    </div>
                    <ErrorBoundary>
                        <DishesCategoriesList/>
                    </ErrorBoundary>
                </main>
            </div>
        </>
    );
}