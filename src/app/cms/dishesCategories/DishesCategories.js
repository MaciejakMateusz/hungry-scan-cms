import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../icons/SearchIcon";

export const DishesCategories = () => {
    const {t} = useTranslation();
    const [searchActive, setSearchActive] = useState(false)

    const handleSearchSubmit = () => {
        //TODO zaimplementować filtrowanie listy dań pomijając kategorie?
    }

    const renderForm = () => {
        return (
            <form className={'search-button-form'} onSubmit={handleSearchSubmit()}>
                <input type="text"
                       className={'search-button-input'}
                       placeholder={t('search')}/>
            </form>
        );
    };

    return (
        <>
            <Helmet>
                <title>CMS - {t("dishesCategories")}</title>
            </Helmet>
            <div className="dishes-categories-grid">
            <div className="new-buttons-container">
                    <button className="add-new-button new-category">
                        + Nowa kategoria
                    </button>
                    <button className="add-new-button new-dish">
                        + Nowe danie
                    </button>
                    <div className={`search-button ${searchActive ? 'search-active' : ''}`}>
                        <button className={`search-initial-circle ${searchActive ? 'circle-active' : ''}`}
                                onClick={() => setSearchActive(!searchActive)}>
                            <SearchIcon/>
                        </button>
                        {searchActive ? renderForm() : <></>}
                    </div>
                </div>
            </div>
        </>
    );
}