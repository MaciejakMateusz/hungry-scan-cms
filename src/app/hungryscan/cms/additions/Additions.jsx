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
    setFilterExpanded,
    setFilteringActive,
    setFilterValue,
    setIngredients,
    setIsNewAddition
} from "../../../../slices/additionsSlice";
import {AdditionFormDialog} from "./AdditionFormDialog";
import {SearchIcon} from "../../../icons/SearchIcon";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {remove} from "../../../../slices/objectRemovalSlice";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {filter} from "../../../../slices/filteringSlice";
import {FilteringForm} from "../shared-components/FilteringForm";
import {ListRecord} from "../shared-components/ListRecord";

export const Additions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        filterValue,
        filterExpanded,
        additionDialogActive,
        additionToRemove,
        filteringActive
    } = useSelector(state => state.additions.view);
    const {isLoading, ingredients} = useSelector(state => state.additions.getIngredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (!filterExpanded && filterValue !== '') {
            dispatch(setFilterValue(''));
            executeFilter('');
        }
    }, [dispatch, filterExpanded]);

    const handleAdditionRemoval = async (e, ingredient) => {
        e.preventDefault();
        const resultAction = await dispatch(remove({id: ingredient.id, path: 'ingredients'}));
        if (remove.fulfilled.match(resultAction)) {
            dispatch(setAdditionToRemove(null));
            filteringActive ? await executeFilter(filterValue) : await dispatch(getIngredients())
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
            const resultAction = await dispatch(filter({path: 'ingredients', value: value}));
            if (filter.fulfilled.match(resultAction)) {
                dispatch(setIngredients(resultAction.payload));
            }
        } else {
            dispatch(setFilteringActive(false));
            dispatch(getIngredients());
        }
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t("additions")}</title>
            </Helmet>
            {additionDialogActive ? <AdditionFormDialog filter={executeFilter}/> : <></>}
            {additionToRemove ?
                <DecisionDialog msg={t('confirmDishRemoval')}
                                objName={additionToRemove.name}
                                onSubmit={(e) => handleAdditionRemoval(e, additionToRemove)}
                                onCancel={() => dispatch(setAdditionToRemove(null))}/> : <></>}
            <div className={'padded-view-container'}>
                <div className={'vertical-split-grid'}>
                    <div className={'vertical-split-left-panel'}>
                        <div>
                            <div className={'vertical-split-left-panel-header no-justify'}>
                                <button className={'general-button submit'}
                                        onClick={() => dispatch(setAdditionDialogActive(true))}>
                                    + {t('newAddition')}
                                </button>
                                <div className={`search-button margin-left ${filterExpanded ? 'search-active' : ''}`}>
                                    <button className={`search-initial-circle ${filterExpanded ? 'circle-active' : ''}`}
                                            onClick={() => dispatch(setFilterExpanded(!filterExpanded))}>
                                        <SearchIcon/>
                                    </button>
                                    {filterExpanded ?
                                        <FilteringForm value={filterValue} searchSubmit={handleSearchSubmit}/> : <></>}
                                </div>
                            </div>
                            {isLoading ? <LoadingSpinner/> :
                                <ul>
                                    <ul>
                                        {ingredients ? (ingredients.length !== 0 ?
                                                ingredients.map((ingredient, index) => (
                                                    <li key={ingredient.id}
                                                        className={'details-wrapper'}>
                                                        <ListRecord displayOrder={index + 1}
                                                                    name={ingredient.name}
                                                                    price={ingredient.price}
                                                                    available={ingredient.available}
                                                                    onEdit={() => {
                                                                        dispatch(setAddition(ingredient));
                                                                        dispatch(setIsNewAddition(false));
                                                                        dispatch(setAdditionDialogActive(true));
                                                                    }}
                                                                    onDelete={() => dispatch(setAdditionToRemove(ingredient))}
                                                        />
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