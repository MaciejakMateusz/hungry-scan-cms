import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    clearVariants,
    fetchVariants,
    setAvailable,
    setCategory,
    setDish,
    setErrorData,
    setFilteredItems,
    setFilterExpanded,
    setFilteringActive,
    setFilterValue,
    setIsNewVariant,
    setVariant,
    setVariantDialogActive,
    setVariantToRemove
} from "../../../slices/variantsSlice";
import {getCategories, setCategories} from "../../../slices/dishesCategoriesSlice";
import {getTranslation} from "../../../locales/langUtils";
import Select from "react-select";
import {customSelect} from "../../../styles";
import {CustomNoOptionsMessage} from "../dishesCategories/formComponents/CustomNoOptionsMessage";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {UnavailableIcon} from "../../icons/UnavailableIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import {VariantFormDialog} from "./VariantFormDialog";
import {DecisionDialog} from "../dialogWindows/DecisionDialog";
import {remove} from "../../../slices/objectRemovalSlice";
import {FilteringForm} from "../utils/filtering/FilteringForm";
import {filter} from "../../../slices/filteringSlice";

export const Variants = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        filteringActive,
        filterValue,
        filteredItems,
        filterExpanded,
        category,
        dish,
        variantDialogActive,
        variantToRemove
    } = useSelector(state => state.variants.view);
    const {categories} = useSelector(state => state.dishesCategories.view);
    const {variants} = useSelector(state => state.variants.fetchVariants);

    useEffect(() => {
        dispatch(setAvailable({label: t('availableVariant'), value: true}));
    }, [dispatch, t]);

    useEffect(() => {
        if (!filterExpanded && filterValue !== '') {
            dispatch(setFilterValue(''));
            executeFilter('');
        }
    }, [dispatch, filterExpanded]);

    useEffect(() => {
        fetchCategories()
        if (categories.length > 0) {
            dispatch(setCategory({value: categories[0], label: getTranslation(categories[0].name)}));
        }
    }, [categories.length]);

    const fetchCategories = async () => {
        const resultAction = await dispatch(getCategories());
        if (getCategories.fulfilled.match(resultAction)) {
            dispatch(setCategories(resultAction.payload));
        }
    }

    const getVariants = async () => {
        await dispatch(fetchVariants());
    }

    const handleVariantRemoval = async (e, variant) => {
        e.preventDefault();
        const resultAction = await dispatch(remove({id: variant.id, path: 'variants'}));
        if (remove.fulfilled.match(resultAction)) {
            dispatch(setVariantToRemove(null));
            await getVariants();
        } else if (remove.rejected.match(resultAction)) {
            setErrorData(resultAction.payload);
        }
    };

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
            await dispatch(getVariants());
        }
    }

    const renderDishRecord = (dish, index) => {
        console.log(index)
        return (
            <div className={'details-container variants'} onClick={async () => {
                dispatch(setDish(dish));
                await getVariants();
            }}>
                <div className={'display-order'}>{index ? index : dish.displayOrder}</div>
                <div className={'details-record-grid'}>
                    <span className={'grid-column-left'}>{getTranslation(dish.name)}</span>
                    <span className={'grid-column-right'}>Warianty: {dish.variants ? dish.variants.length : 0}</span>
                </div>
            </div>
        );
    }

    const renderVariantRecord = (variant) => {
        return (
            <>
                <div className={'details-container variants'}>
                    <div className={'display-order'}>{variant.displayOrder}</div>
                    <div className={'details-record-grid'}>
                        <span className={'grid-column-left'}>{getTranslation(variant.name)}</span>
                        <span className={'grid-column-right'}>+ {variant.price.toFixed(2)} zł</span>
                    </div>
                </div>
                <div className={'manage-buttons-horizontal-pill'}>
                    <div className={'hover-scaling'}>
                        {variant.available ? <AvailableIcon/> : <UnavailableIcon/>}
                    </div>
                    <div>
                        <div className={'clickable-icon hover-scaling'} onClick={() => {
                            dispatch(setVariant(variant));
                            dispatch(setIsNewVariant(false));
                            dispatch(setVariantDialogActive(true));
                        }}>
                            <EditIcon/>
                        </div>
                    </div>
                    <div className={'clickable-icon hover-scaling'}
                         onClick={() => dispatch(setVariantToRemove(variant))}>
                        <DeleteIcon/>
                    </div>
                </div>
            </>
        );
    }

    const renderMenuItemsRecords = () => {
        if (!filteredItems) {
            return (
                category ? (category.value.menuItems.length !== 0 ?
                        category.value.menuItems.map(menuItem => (
                            <li className={'details-wrapper'}
                                key={menuItem.id}>
                                {renderDishRecord(menuItem, false)}
                            </li>
                        )) : <p className={'text-center zero-margin'}>{t('noDishesInCategory')}</p>) :
                    <p className={'text-center zero-margin'}>{t('noCategoryChosen')}</p>
            );
        }
        return (
            filteredItems.length !== 0 ?
                filteredItems.map((filteredItem, index) => (
                    <li className={'details-wrapper'}
                        key={filteredItem.id}>
                        {renderDishRecord(filteredItem, index + 1)}
                    </li>
                )) : <p className={'text-center zero-margin'}>{t('noDishesFiltered')}</p>
        );
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t("variants")}</title>
            </Helmet>
            {variantDialogActive ? <VariantFormDialog filter={executeFilter}/> : <></>}
            {variantToRemove ?
                <DecisionDialog msg={t('confirmDishRemoval')}
                               objName={variantToRemove.name}
                               onSubmit={(e) => handleVariantRemoval(e, variantToRemove)}
                               onCancel={() => dispatch(setVariantToRemove(null))}/> : <></>}
            <div className={'dish-additions-container'}>
                <div className={'dish-additions-grid'}>
                    <div className={'dish-additions-left-panel'}>
                        <div className={'ingredients-header'}>
                            <div className={`search-button ingredients ${filterExpanded ? 'search-active' : ''}`}>
                                <button className={`search-initial-circle ${filterExpanded ? 'circle-active' : ''}`}
                                        onClick={() => dispatch(setFilterExpanded(!filterExpanded))}>
                                    <SearchIcon/>
                                </button>
                                {filterExpanded ?
                                    <FilteringForm value={filterValue} searchSubmit={handleSearchSubmit}/> : <></>}
                            </div>
                            <Select id={'dish-category-variant'}
                                    name={'category'}
                                    styles={customSelect}
                                    value={filteringActive ? {value: category.value, label: 'Filtrowane...'} : category}
                                    onChange={(selected) => {
                                        dispatch(setCategory(selected));
                                        dispatch(clearVariants());
                                        dispatch(setDish(null));
                                    }}
                                    isDisabled={filteringActive}
                                    options={categories.map(category => {
                                        return {value: category, label: getTranslation(category.name)}
                                    })}
                                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                            />
                        </div>
                        <ul className="ingredients-list">
                            {renderMenuItemsRecords()}
                        </ul>
                    </div>
                    <div className={'dish-additions-right-panel'}>
                        <div>
                            <div className={'chosen-additions-header'}>
                                <div className={'chosen-additions-label'}>{t('chosen')}:</div>
                                <div className={'category-form-top-buttons'}>
                                    <button className={'general-button submit-additions'} disabled={!dish}
                                            onClick={() => dispatch(setVariantDialogActive(true))}>
                                        + {t('newVariant')}
                                    </button>
                                </div>
                            </div>
                            <ul>
                                <ul>
                                    {
                                        variants ? (variants.length !== 0 ?
                                                variants.map(variant => (
                                                    <li key={variant.id}
                                                        className={'details-wrapper'}>
                                                        {renderVariantRecord(variant)}
                                                    </li>)) :
                                                <p className={'text-center'}>{t('noVariantsInDish')}</p>) :
                                            <p className={'text-center'}>{t('noDishChosen')}</p>
                                    }
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}