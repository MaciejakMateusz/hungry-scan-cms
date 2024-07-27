import React, {useEffect} from "react";
import {getTranslation} from "../../../locales/langUtils";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    setChosenAdditions,
    setErrorData,
    setErrorMessage,
    setIsAdditionsViewActive
} from "../../../slices/dishFormSlice";
import {
    addAddition,
    getIngredients,
    removeAddition, setAdditions,
    setFilter, setPageData,
    setSearchActive
} from "../../../slices/dishAdditionsSlice";

export const DishAdditionsView = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        searchActive,
        filter
    } = useSelector(state => state.dishAdditions.dishAdditionsData);
    const {ingredients, additions, pageData} = useSelector(state => state.dishAdditions.fetchIngredients);
    const {chosenAdditions} = useSelector(state => state.dishForm.form);

    const fetchIngredients = (pageSize = 20, pageNumber) => {
        dispatch(getIngredients({pageSize: pageSize, pageNumber: pageNumber, chosenAdditions: chosenAdditions}));
    }

    useEffect(() => {
        fetchIngredients(20, 0)
    }, []);

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

    const renderIngrRecord = (ingredient, action) => {
        return (
            <>
                <div className={'details-container'}>
                    <span className={'detail-name'}>{getTranslation(ingredient.name)}</span>
                    <span className={'detail-price'}>+ {ingredient.price.toFixed(2)}zł</span>
                </div>
                {action === 'add' ?
                    (<button className={'move-ingredient-btn'}
                             onClick={() => dispatch(addAddition(ingredient))}>
                        +
                    </button>) :
                    (<button className={'move-ingredient-btn'}
                             onClick={() => dispatch(removeAddition(ingredient))}>
                        -
                    </button>)
                }
            </>
        );
    }

    const handlePageDataChange = pageNumber => {
        dispatch(setPageData({
            ...pageData,
            pageable: {
                ...pageData.pageable,
                pageNumber: pageNumber
            }
        }))
        fetchIngredients(pageData.pageable.pageSize, pageNumber);
    }

    const renderPageableFooter = () => {
        const pageNumbers = Array.from({length: pageData.totalPages}, (_, i) => i + 1);
        return (
            <div className={'pagination-footer'}>
                {pageNumbers.map(pageNumber => (
                    <button
                        className={`pagination-button ${pageData.pageable.pageNumber + 1 === pageNumber && 'active'}`}
                        key={pageNumber}
                        onClick={() =>
                            handlePageDataChange(pageNumber - 1)}>
                        {pageNumber}
                    </button>
                ))}
                <span className={'pagination-total'}>({pageData.totalElements})</span>
            </div>
        );
    }

    return (
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
                        <div className={'ingredients-label'}>
                            <span>{t('allIngredients')}</span>
                        </div>
                    </div>
                    <ul className="ingredients-list">
                        {ingredients.length !== 0 ?
                            ingredients.map(ingredient => (
                                <li className={'details-wrapper'}
                                    key={ingredient.id}>
                                    {renderIngrRecord(ingredient, 'add')}
                                </li>
                            )) : <p className={'text-center zero-margin'}>{t('noCreatedIngr')}</p>}
                    </ul>
                    {renderPageableFooter()}
                </div>
                <div className={'dish-additions-right-panel'}>
                    <div>
                        <div className={'chosen-additions-header'}>
                            <div className={'chosen-additions-label'}>{t('chosen')}:</div>
                            <div className={'category-form-top-buttons'}>
                                <button className={'general-button cancel'}
                                        onClick={() => {
                                            dispatch(setIsAdditionsViewActive(false));
                                            dispatch(setAdditions([]));
                                            dispatch(setErrorData({}));
                                            dispatch(setErrorMessage(null));
                                        }}>
                                    {t('cancel')}
                                </button>
                                <button className={'general-button submit-additions'}
                                        onClick={() => {
                                            dispatch(setIsAdditionsViewActive(false));
                                            dispatch(setChosenAdditions(additions));
                                            dispatch(setErrorData({}));
                                            dispatch(setErrorMessage(null));
                                        }}>
                                    {t('save')}
                                </button>
                            </div>
                        </div>
                        <ul>
                            <ul>
                                {additions.length !== 0 ?
                                    additions.map(ingredient => (
                                        <li key={ingredient.id}
                                            className={'details-wrapper'}>
                                            {renderIngrRecord(ingredient, 'remove')}
                                        </li>)) :
                                    <p className={'text-center'}>{t('noChosenIngr')}</p>}
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}