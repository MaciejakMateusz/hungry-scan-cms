import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
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
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {VariantFormDialog} from "./VariantFormDialog";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {remove} from "../../../slices/objectRemovalSlice";
import {filter} from "../../../slices/filteringSlice";
import {SplitLeftPanelHeader} from "../shared-components/SplitLeftPanelHeader";
import {ListRecord} from "../shared-components/ListRecord";

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
        const fetchCategories = async () => {
            const resultAction = await dispatch(getCategories());
            if (getCategories.fulfilled.match(resultAction)) {
                dispatch(setCategories(resultAction.payload));
                if (resultAction.payload.length > 0) {
                    dispatch(setCategory({ value: resultAction.payload[0], label: getTranslation(resultAction.payload[0].name) }));
                }
            }
        };
        fetchCategories();
    }, [dispatch]);

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

    const getCategoryForSelect = () => {
        if(!category) {
            return null;
        }
        if(filteringActive) {
            return {value: category.value, label: t('filterResult')};
        }
        return category.value ? category : {value: category, label: getTranslation(category.name)};
    }

    const renderDishRecord = (dish, index) => {
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

    const renderMenuItemsRecords = () => {
        if (!filteredItems) {
            let menuItems = [];
            if(category) {
               menuItems = category.value ? category.value.menuItems : category.menuItems;
            }
            return (
                category ? (menuItems.length !== 0 ?
                        menuItems.map(menuItem => (
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
            <div className={'padded-view-container'}>
                <div className={'vertical-split-grid'}>
                    <div className={'vertical-split-left-panel'}>
                        <SplitLeftPanelHeader filterExpanded={filterExpanded}
                                              expandFilter={() => dispatch(setFilterExpanded(!filterExpanded))}
                                              filterValue={filterValue}
                                              onSearchSubmit={handleSearchSubmit}
                                              component={
                                                  <Select id={'dish-category-variant'}
                                                          name={'category'}
                                                          styles={customSelect}
                                                          value={getCategoryForSelect()}
                                                          onChange={(selected) => {
                                                              dispatch(setCategory(selected));
                                                              dispatch(clearVariants());
                                                              dispatch(setDish(null));
                                                          }}
                                                          isDisabled={filteringActive}
                                                          options={categories.map(category => {
                                                              return {
                                                                  value: category,
                                                                  label: getTranslation(category.name)
                                                              }
                                                          })}
                                                          components={{NoOptionsMessage: CustomNoOptionsMessage}}
                                                  />}
                        />
                        <ul className="vertical-split-left-panel-content">
                            {renderMenuItemsRecords()}
                        </ul>
                    </div>
                    <div className={'vertical-split-right-panel'}>
                        <div>
                            <div className={'vertical-split-right-panel-header'}>
                                <div className={'chosen-record-label'}>{t('chosen')}:</div>
                                <button className={'general-button submit no-margin-right'}
                                        disabled={!dish}
                                        onClick={() => dispatch(setVariantDialogActive(true))}>
                                    + {t('newVariant')}
                                </button>
                            </div>
                            <ul>
                                <ul>
                                    {
                                        variants ? (variants.length !== 0 ?
                                                variants.map(variant => (
                                                    <li key={variant.id}
                                                        className={'details-wrapper'}>
                                                        <ListRecord displayOrder={variant.displayOrder}
                                                                    name={variant.name}
                                                                    price={variant.price}
                                                                    available={variant.available}
                                                                    onEdit={() => {
                                                                        dispatch(setVariant(variant));
                                                                        dispatch(setIsNewVariant(false));
                                                                        dispatch(setVariantDialogActive(true));
                                                                    }}
                                                                    onDelete={() => dispatch(setVariantToRemove(variant))}
                                                        />
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