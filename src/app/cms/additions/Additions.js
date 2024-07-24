import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    getIngredients,
    setAddition,
    setAdditionDialogActive,
    setAdditionToRemove,
    setErrorData,
    setFilteringActive,
    setFilterValue,
    setIngredients,
    setIsNewAddition,
    setSearchActive
} from "../../../slices/additionsSlice";
import {AdditionFormDialog} from "./AdditionFormDialog";
import {getTranslation} from "../../../locales/langUtils";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {UnavailableIcon} from "../../icons/UnavailableIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import {SearchIcon} from "../../icons/SearchIcon";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {remove} from "../../../slices/objectRemovalSlice";
import {RemovalDialog} from "../dialogWindows/RemovalDialog";
import {filter} from "../../../slices/filteringSlice";

export const Additions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        filterValue,
        searchActive,
        additionDialogActive,
        additionToRemove,
        filteringActive
    } = useSelector(state => state.additions.view);
    const {isLoading, ingredients, pageData} = useSelector(state => state.additions.getIngredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        dispatch(setFilterValue(e.target.value));
        await executeFilter(e.target.value);
    }

    const handleAdditionRemoval = async (e, ingredient) => {
        e.preventDefault();
        const resultAction = await dispatch(remove({id: ingredient.id, path: 'ingredients'}));
        if(remove.fulfilled.match(resultAction)) {
            dispatch(setAdditionToRemove(null));
            filteringActive ? await executeFilter(filterValue) : await dispatch(getIngredients())
        } else if(remove.rejected.match(resultAction)) {
            setErrorData(resultAction.payload);
        }
    };

    const executeFilter = async value => {
        if ('' !== value) {
            dispatch(setFilteringActive(true));
            const resultAction = await dispatch(filter({path: 'ingredients', value: value}));
            if(filter.fulfilled.match(resultAction)) {
                dispatch(setIngredients(resultAction.payload));
            }
        } else {
            dispatch(setFilteringActive(false));
            dispatch(getIngredients());
        }
    }

    const renderForm = () => {
        return (
            <form className={'search-button-form'} onSubmit={handleSearchSubmit}>
                <input type={'text'}
                       className={'search-button-input'}
                       placeholder={t('search')}
                       name={'filter'}
                       value={filterValue}
                       onChange={handleSearchSubmit}/>
            </form>
        );
    };

    const renderIngredientRecord = (ingredient, index) => {
        return (
            <>
                <div className={'details-container variants'}>
                    <div className={'display-order'}>{index}</div>
                    <div className={'details-record-grid'}>
                        <span className={'grid-column-left'}>{getTranslation(ingredient.name)}</span>
                        <span className={'grid-column-right'}>+ {ingredient.price.toFixed(2)} zł</span>
                    </div>
                </div>
                <div className={'manage-buttons-horizontal-pill'}>
                    <div className={'hover-scaling'}>
                        {ingredient.available ? <AvailableIcon/> : <UnavailableIcon/>}
                    </div>
                    <div>
                        <div className={'clickable-icon hover-scaling'} onClick={() => {
                            dispatch(setAddition(ingredient));
                            dispatch(setIsNewAddition(false));
                            dispatch(setAdditionDialogActive(true));
                        }}>
                            <EditIcon/>
                        </div>
                    </div>
                    <div className={'clickable-icon hover-scaling'}
                         onClick={() => dispatch(setAdditionToRemove(ingredient))}>
                        <DeleteIcon/>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t("additions")}</title>
            </Helmet>
            {additionDialogActive ? <AdditionFormDialog filter={executeFilter}/> : <></>}
            {additionToRemove ?
                <RemovalDialog msg={t('confirmDishRemoval')}
                               objName={additionToRemove.name}
                               onSubmit={(e) => handleAdditionRemoval(e, additionToRemove)}
                               onCancel={() => dispatch(setAdditionToRemove(null))}/> : <></>}
            <div className={'dish-additions-container'}>
                <div className={'dish-additions-grid'}>
                    <div className={'dish-additions-left-panel'}>
                        <div>
                            <div className={'additions-header'}>
                                <div className={'category-form-top-buttons'}>
                                    <button className={'add-new-button submit-additions'}
                                            onClick={() => dispatch(setAdditionDialogActive(true))}>
                                        + {t('newAddition')}
                                    </button>
                                </div>
                                <div className={`search-button additions ${searchActive ? 'search-active' : ''}`}>
                                    <button className={`search-initial-circle ${searchActive ? 'circle-active' : ''}`}
                                            onClick={() => dispatch(setSearchActive(!searchActive))}>
                                        <SearchIcon/>
                                    </button>
                                    {searchActive ? renderForm() : <></>}
                                </div>
                            </div>
                            {isLoading ? <LoadingSpinner/> :
                                <ul>
                                    <ul>
                                        {ingredients ? (ingredients.length !== 0 ?
                                                ingredients.map((ingredient, index) => (
                                                    <li key={ingredient.id}
                                                        className={'details-wrapper'}>
                                                        {renderIngredientRecord(ingredient, index + 1)}
                                                    </li>)) :
                                                <p className={'text-center'}>{t('noAdditions')}</p>) :
                                            <p className={'text-center'}>{t('noDishChosen')}</p>
                                        }
                                    </ul>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}