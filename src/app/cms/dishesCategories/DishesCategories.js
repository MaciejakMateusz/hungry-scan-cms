import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {DishesCategoriesList} from "./DishesCategoriesList";
import {NewCategoryForm} from "./NewCategoryForm";
import {ConfirmationDialogWindow} from "../dialogWindows/ConfirmationDialogWindow";
import {EditCategoryForm} from "./EditCategoryForm";
import {NewDishForm} from "./NewDishForm";
import ErrorBoundary from "../../error/ErrorBoundary";

export const DishesCategories = () => {
    const {t} = useTranslation();
    const [searchActive, setSearchActive] = useState(false);
    const [form, setForm] = useState({filter: ''});
    const [isNewCategoryFormActive, setIsNewCategoryFormActive] = useState(false);
    const [isEditCategoryFormActive, setIsEditCategoryFormActive] = useState(false);
    const [isNewMenuItemFormActive, setIsNewMenuItemFormActive] = useState(false);
    const [isEditMenuItemFormActive, setIsEditMenuItemFormActive] = useState(false);
    const [submittedSuccessfullyType, setSubmittedSuccessfullyType] = useState(null);
    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState({});

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if ('' !== form.filter) {
            console.log(form.filter)
        }
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

    const renderNewCategoryForm = () => {
        setIsNewCategoryFormActive(true);
    }

    const renderNewMenuItemForm = () => {
        setIsNewMenuItemFormActive(true);
    }

    const handleDishesCategoriesRendering = () => {
        if (isNewCategoryFormActive) {
            return <NewCategoryForm
                setCategoryFormActive={setIsNewCategoryFormActive}
                setSubmittedSuccessfullyType={setSubmittedSuccessfullyType}
            />
        } else if (isEditCategoryFormActive) {
            return <EditCategoryForm
                setCategoryFormActive={setIsEditCategoryFormActive}
                setSubmittedSuccessfullyType={setSubmittedSuccessfullyType}
                category={category}
            />
        } else if (isNewMenuItemFormActive) {
            return <NewDishForm
                setMenuItemFormActive={setIsNewMenuItemFormActive}
                setSubmittedSuccessfullyType={setSubmittedSuccessfullyType}
                categories={categories}
            />;
        } else if (isEditMenuItemFormActive) {
            return (<div>Formularz edycji dania</div>);
        } else {
            return (
                <div className="dishes-categories-grid">
                    <div className="new-buttons-container">
                        <button className="add-new-button new-category" onClick={renderNewCategoryForm}>
                            <span>+ {t('newCategory')}</span>
                        </button>
                        <button className="add-new-button new-dish" onClick={renderNewMenuItemForm}>
                            <span>+ {t('newDish')}</span>
                        </button>
                        <div className={`search-button ${searchActive ? 'search-active' : ''}`}>
                            <button className={`search-initial-circle ${searchActive ? 'circle-active' : ''}`}
                                    onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon/>
                            </button>
                            {searchActive ? renderForm() : <></>}
                        </div>
                    </div>
                    <DishesCategoriesList
                        categoryFormActive={setIsEditCategoryFormActive}
                        setCategory={setCategory}
                        setCategoryList={setCategories}/>
                </div>
            );
        }
    }

    const renderConfirmationDialog = (type) => {
        switch(type) {
            case 'category-save':
                return (<ConfirmationDialogWindow text={t('categorySaved')}/>);
            case 'category-edit':
                return (<ConfirmationDialogWindow text={t('categoryEdited')}/>);
            case 'dish-save':
                return (<ConfirmationDialogWindow text={t('dishSaved')}/>);
            case 'dish-edit':
                return (<ConfirmationDialogWindow text={t('dishEdited')}/>);
            default:
                return null;
        }
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t("dishesCategories")}</title>
            </Helmet>
            {submittedSuccessfullyType && renderConfirmationDialog(submittedSuccessfullyType)}
            <ErrorBoundary>
                {handleDishesCategoriesRendering()}
            </ErrorBoundary>
        </>
    );
}