import React, {useEffect, useState} from "react";
import {getTranslation} from "../../../locales/langUtils";
import {useTranslation} from "react-i18next";
import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {SearchIcon} from "../../icons/SearchIcon";

export const DishAdditionsView = ({setAdditions, chosenAdditions, isActive}) => {
    const {t} = useTranslation();
    const [searchActive, setSearchActive] = useState(false);
    const [form, setForm] = useState({filter: ''});
    const [ingredients, setIngredients] = useState([]);
    const [initialAdditions, setInitialAdditions] = useState([]);
    const [pageData, setPageData] = useState({});

    const fetchIngredients = (pageSize, pageNumber) => {
        const requestBody = new Map();
        requestBody.set("pageSize", pageSize);
        requestBody.set("pageNumber", pageNumber);

        const params = Object.fromEntries(requestBody);

        fetch(`${apiHost}/api/cms/ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: JSON.stringify(params)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was an error while communicating with a server.");
            }
        }).then(pageData => {
            const chosenIds = chosenAdditions.map(ingredient => ingredient.id);
            const filteredIngredients = pageData.content.filter(ingredient => !chosenIds.includes(ingredient.id));
            setIngredients(filteredIngredients);
            setPageData(pageData)
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchIngredients(20, 0);
        setInitialAdditions(chosenAdditions);
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if ('' !== form.filter) {
            console.log(form.filter)
        }
    }

    const addIngr = ingredient => {
        setAdditions(prevState => {
            if (!prevState.some(i => i.id === ingredient.id)) {
                return [
                    ...prevState,
                    ingredient
                ];
            }
            return prevState;
        });
        setIngredients(prevState =>
            prevState.filter(i => i.id !== ingredient.id)
        );
    }

    const removeIngr = ingredientToRemove => {
        setAdditions(prevState =>
            prevState.filter(ingredient => ingredient.id !== ingredientToRemove.id)
        );

        setIngredients(prevState => {
            if (!prevState.some(i => i.id === ingredientToRemove.id)) {
                let newIngredients = [...prevState, ingredientToRemove];
                newIngredients.sort((a, b) => getTranslation(a.name).localeCompare(getTranslation(b.name)));
                return newIngredients;
            }
            return prevState;
        });
    }

    const setFormFields = e => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    const renderForm = () => {
        return (
            <form className={'search-button-form'} onSubmit={handleSearchSubmit}>
                <input type="text"
                       className={'search-button-input'}
                       placeholder={t('search')}
                       name={'filter'}
                       value={form.filter}
                       onChange={setFormFields}/>
            </form>
        );
    };

    const renderIngrRecord = (ingr, action) => {
        return (
            <>
                <div className="ingredient-container">
                    <span className="ingredient-name">{getTranslation(ingr.name)}</span>
                    <span className="ingredient-price">+ {ingr.price.toFixed(2)}zł</span>
                </div>
                {action === 'add' ?
                    (<button className="move-ingredient-btn"
                             onClick={() => addIngr(ingr)}>
                        +
                    </button>) :
                    (<button className="move-ingredient-btn"
                             onClick={() => removeIngr(ingr)}>
                        -
                    </button>)
                }
            </>
        );
    }

    const handlePageDataChange = pageNumber => {
        setPageData(prevState => {
            return {
                ...prevState,
                pageable: {
                    ...prevState.pageable,
                    pageNumber: pageNumber
                }
            };
        });
        fetchIngredients(20, pageNumber);
    }

    const renderPageableFooter = () => {
        const pageNumbers = Array.from({ length: pageData.totalPages }, (_, i) => i + 1);
        return (
            <div className="pagination-footer">
                {pageNumbers.map(pageNumber => (
                    <button className={`pagination-button ${pageData.pageable.pageNumber + 1 === pageNumber && 'active'}`}
                            key={pageNumber}
                            onClick={() =>
                        handlePageDataChange(pageNumber - 1)}>
                        {pageNumber}
                    </button>
                ))}
                <span className="pagination-total">({pageData.totalElements})</span>
            </div>
        );
    }

    return (
        <div className="dish-additions-container">
            <div className="dish-additions-grid">
                <div className="dish-additions-left-panel">
                    <div className="ingredients-header">
                        <div className={`search-button ingredients ${searchActive ? 'search-active' : ''}`}>
                            <button className={`search-initial-circle ${searchActive ? 'circle-active' : ''}`}
                                    onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon/>
                            </button>
                            {searchActive ? renderForm() : <></>}
                        </div>
                        <div className="ingredients-label">
                            <span>{t('allIngredients')}</span>
                        </div>
                    </div>
                    <ul className="ingredients-list">
                        {ingredients.map(ingredient => (
                            <li className="ingredient-wrapper"
                                key={ingredient.id}>
                                {renderIngrRecord(ingredient, 'add')}
                            </li>
                        ))}
                    </ul>
                    {renderPageableFooter()}
                </div>
                <div className="dish-additions-right-panel">
                    <div>
                        <div className="chosen-additions-header">
                            <div className="chosen-additions-label">{t('chosen')}:</div>
                            <div className="category-form-top-buttons">
                                <button className="add-new-button cancel"
                                        onClick={() => {
                                            isActive(false);
                                            setAdditions(initialAdditions);
                                        }}>
                                    {t('cancel')}
                                </button>
                                <button className="add-new-button submit-additions"
                                        onClick={() => {
                                            isActive(false);
                                            setAdditions(chosenAdditions);
                                        }}>
                                    {t('save')}
                                </button>
                            </div>
                        </div>
                        <ul>
                            <ul>
                                {chosenAdditions.length !== 0 ?
                                    chosenAdditions.map(ingredient => (
                                        <li key={ingredient.id}
                                            className="ingredient-wrapper">
                                            {renderIngrRecord(ingredient, 'remove')}
                                        </li>)) :
                                    <p className="text-center">{t('noChosenIngr')}</p>}
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}