import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    clearVariants,
    fetchVariants, setAvailable,
    setCategory,
    setDish,
    setFilter, setIsNewVariant,
    setSearchActive, setVariant,
    setVariantDialogActive
} from "../../../slices/variantsViewSlice";
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

export const Variants = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        searchActive,
        filter,
        category,
        dish,
        variantDialogActive} = useSelector(state => state.variants.view);
    const {categories} = useSelector(state => state.dishesCategories.view);
    const {variants} = useSelector(state => state.variants.fetchVariants);

    useEffect(() => {
        dispatch(setAvailable({label: t('availableVariant'), value: true}));
    }, [dispatch, t]);

    const fetchCategories = async () => {
        const resultAction = await dispatch(getCategories());
        if (getCategories.fulfilled.match(resultAction)) {
            dispatch(setCategories(resultAction.payload));
        }
    }

    const getVariants = async () => {
        await dispatch(fetchVariants());
    }

    useEffect(() => {
        fetchCategories()
        if (categories.length > 0) {
            dispatch(setCategory({value: categories[0], label: getTranslation(categories[0].name)}));
        }
    }, [categories.length]);

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if ('' !== filter) {
            console.log(filter)
        }
    }

    const renderForm = () => {
        return (
            <form className={'search-button-form'} onSubmit={handleSearchSubmit}>
                <input type={'text'}
                       className={'search-button-input'}
                       placeholder={t('search')}
                       name={'filter'}
                       value={filter}
                       onChange={(e) => dispatch(setFilter(e.target.value))}/>
            </form>
        );
    };

    const renderDishRecord = (dish) => {
        return (
            <div className={'details-container variants'} onClick={async () => {
                dispatch(setDish(dish));
                await getVariants();
            }}>
                <div className={'display-order'}>{dish.displayOrder}</div>
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
                    <div className={'clickable-icon hover-scaling'}>
                        <DeleteIcon/>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t("variants")}</title>
            </Helmet>
            {variantDialogActive ? <VariantFormDialog/> : <></>}
            <div className={'dish-additions-container'}>
                <div className={'dish-additions-grid'}>
                    <div className={'dish-additions-left-panel'}>
                        <div className={'ingredients-header'}>
                            <div className={`search-button ingredients ${searchActive ? 'search-active' : ''}`}>
                                <button className={`search-initial-circle ${searchActive ? 'circle-active' : ''}`}
                                        onClick={() => dispatch(setSearchActive(!searchActive))}>
                                    <SearchIcon/>
                                </button>
                                {searchActive ? renderForm() : <></>}
                            </div>
                            <Select id={'dish-category-variant'}
                                    name={'category'}
                                    styles={customSelect}
                                    value={category}
                                    onChange={(selected) => {
                                        dispatch(setCategory(selected));
                                        dispatch(clearVariants());
                                        dispatch(setDish(null));
                                    }}
                                    options={categories.map(category => {
                                        return {value: category, label: getTranslation(category.name)}
                                    })}
                                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                            />
                        </div>
                        <ul className="ingredients-list">
                            {
                                category ? (category.value.menuItems.length !== 0 ?
                                        category.value.menuItems.map(menuItem => (
                                            <li className={'details-wrapper'}
                                                key={menuItem.id}>
                                                {renderDishRecord(menuItem)}
                                            </li>
                                        )) : <p className={'text-center zero-margin'}>{t('noDishesInCategory')}</p>) :
                                    <p className={'text-center zero-margin'}>{t('noCategoryChosen')}</p>
                            }
                        </ul>
                    </div>
                    <div className={'dish-additions-right-panel'}>
                        <div>
                            <div className={'chosen-additions-header'}>
                                <div className={'chosen-additions-label'}>{t('chosen')}:</div>
                                <div className={'category-form-top-buttons'}>
                                    <button className={'add-new-button submit-additions'} disabled={!dish}
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