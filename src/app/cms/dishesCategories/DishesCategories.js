import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";
import {DishesCategoriesList} from "./DishesCategoriesList";
import {NewCategoryForm} from "./NewCategoryForm";
import {ConfirmationDialogWindow} from "../dialogWindows/ConfirmationDialogWindow";
import {EditCategoryForm} from "./EditCategoryForm";
import {NewDishForm} from "./NewDishForm";
import {EditDishForm} from "./EditDishForm";
import ErrorBoundary from "../../error/ErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import {
    setForm,
    setNewCategoryFormActive,
    setNewDishFormActive,
    setSearchActive
} from "../../../slices/dishesCategoriesSlice";

export const DishesCategories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        searchActive,
        form,
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive,
        submittedSuccessType,
        category,
        dish,
        categories
    } = useSelector(state => state.dishesCategories.view)

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if ('' !== form.filter) {
            console.log(form.filter)
        }
    }

    const renderForm = () => {
        return (
            <form className={'search-button-form'} onSubmit={handleSearchSubmit}>
                <input type="text"
                       className={'search-button-input'}
                       placeholder={t('search')}
                       name={'filter'}
                       value={form.filter}
                       onChange={(e) => dispatch(setForm(e.target.value))}/>
            </form>
        );
    };

    const renderConfirmationDialog = (type) => {
        switch (type) {
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

    const handleDishesCategoriesRendering = () => {
        if (newCategoryFormActive) {
            return <NewCategoryForm/>
        } else if (editCategoryFormActive) {
            return <EditCategoryForm/>
        } else if (newDishFormActive) {
            return <NewDishForm/>
        } else if (editDishFormActive) {
            return (<EditDishForm categories={categories}
                                  category={category}
                                  menuItem={dish}/>);
        } else {
            return (
                <div className={'dishes-categories-grid'}>
                    <div className={'new-buttons-container'}>
                        <button className={'add-new-button new-category'}
                                onClick={() => dispatch(setNewCategoryFormActive(true))}>
                            <span>+ {t('newCategory')}</span>
                        </button>
                        <button className={'add-new-button new-dish'}
                                onClick={() => dispatch(setNewDishFormActive(true))}>
                            <span>+ {t('newDish')}</span>
                        </button>
                        <div className={`search-button ${searchActive ? 'search-active' : ''}`}>
                            <button className={`search-initial-circle ${searchActive ? 'circle-active' : ''}`}
                                    onClick={() => dispatch(setSearchActive(true))}>
                                <SearchIcon/>
                            </button>
                            {searchActive ? renderForm() : <></>}
                        </div>
                    </div>
                    <DishesCategoriesList/>
                </div>
            );
        }
    }

    return (
        <>
            <Helmet>
                <title>CMS - {t('dishesCategories')}</title>
            </Helmet>
            {submittedSuccessType && renderConfirmationDialog(submittedSuccessType)}
            <ErrorBoundary>
                {handleDishesCategoriesRendering()}
            </ErrorBoundary>
        </>
    );
}