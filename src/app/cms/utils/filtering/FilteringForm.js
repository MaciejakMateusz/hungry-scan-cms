import React from "react";
import {useTranslation} from "react-i18next";

export const FilteringForm = (props) => {
    const {t} = useTranslation();
    return (
        <form className={'search-button-form'} onSubmit={props.searchSubmit}>
            <input type={'text'}
                   className={'search-button-input'}
                   placeholder={t('search')}
                   name={'filter'}
                   value={props.value}
                   onChange={props.searchSubmit}/>
        </form>
    );
}