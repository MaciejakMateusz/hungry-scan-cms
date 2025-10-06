import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    getIngredients, setAdditionDialogActive,
    setAdditionToRemove,
    setErrorData,
    setFilterExpanded,
    setFilteringActive,
    setFilterValue,
    setIngredients
} from "../../../../slices/additionsSlice";
import {AdditionFormDialog} from "./AdditionFormDialog";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {remove} from "../../../../slices/objectRemovalSlice";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {filter} from "../../../../slices/filteringSlice";
import {SearchButton} from "../dishes-categories/SearchButton";
import {getTranslation} from "../../../../locales/langUtils";
import {LetterGroup} from "./LetterGroup";

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
    const {
        isLoading: ingredientsLoading,
        ingredients
    } = useSelector(state => state.additions.getIngredients);
    const removalPending = useSelector(state => state.objRemoval.isLoading);

    const letters = [...new Set(ingredients?.map((ingredient) => getTranslation(ingredient.name)[0]))];

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (!filterExpanded && filterValue !== '') {
            dispatch(setFilterValue(''));
            executeFilter('');
        }
    }, [dispatch, filterExpanded]);

    const filterIngredientsByLetter = (letter) => {
        return ingredients.filter((ingredient) => getTranslation(ingredient.name)[0] === letter);
    }

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
            {additionDialogActive && <AdditionFormDialog filter={executeFilter}/>}
            {additionToRemove &&
                <DecisionDialog msg={t('confirmAdditionRemoval')}
                                objName={additionToRemove.name}
                                onSubmit={(e) => handleAdditionRemoval(e, additionToRemove)}
                                onCancel={() => dispatch(setAdditionToRemove(null))}
                                isLoading={removalPending}/>}
            <div className={'cms-padded-view-container'}>
                <div className={'functions-header'}>
                    <div className={'section-heading'}>{t('additions')}</div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'general-button-new'}
                             onClick={() => dispatch(setAdditionDialogActive(true))}>+ &nbsp;{t('newAddition')}
                        </div>
                        <SearchButton filterExpanded={filterExpanded}
                                      onExpand={() => dispatch(setFilterExpanded(!filterExpanded))}
                                      filterValue={filterValue}
                                      onSubmit={handleSearchSubmit}
                                      onClear={() => dispatch(setFilterValue(''))}
                        />
                    </div>
                </div>
                <div className={'scrollable-wrapper'}>
                    <div className={'scroll-container'}>
                        {ingredientsLoading && <LoadingSpinner/>}
                        {ingredients.length === 0 && <p className={'text-center'}>{t('noAdditions')}</p>}
                        {letters?.map(letter => (
                            <LetterGroup key={letter}
                                         letter={letter}
                                         ingredients={filterIngredientsByLetter(letter)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}