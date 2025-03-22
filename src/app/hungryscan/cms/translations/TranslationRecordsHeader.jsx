import React, {useEffect} from "react";
import Select from "react-select";
import {newCustomSelect} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";
import {setChosenGroup} from "../../../../slices/translationsSlice";
import {useDispatch, useSelector} from "react-redux";

export const TranslationRecordsHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const options = [
        {
            value: 'dishesCategories',
            label: t('dishesCategories')
        },
        {
            value: 'variants',
            label: t('variants')
        },
        {
            value: 'additions',
            label: t('additions')
        }
    ];
    const {chosenGroup} = useSelector(state => state.translations.view);

    useEffect(() => {
        dispatch(setChosenGroup({
            value: 'dishesCategories',
            label: t('dishesCategories')
        }));
    }, []);

    return (
        <header className={'translations-vertical-split-header-left'}>
            <Select id={'translation-group'}
                    name={'translation-group'}
                    value={chosenGroup}
                    placeholder={t('choose')}
                    options={options}
                    defaultValue={options[0]}
                    onChange={(selected) => dispatch(setChosenGroup(selected))}
                    styles={newCustomSelect}
                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
            />
            <div className={'translation-record-grid header'}>
                <span className={'translations-records-column left header'}>{t('name')}</span>
                <span className={'translations-records-column middle header'}>{t('description')}</span>
                <span className={'translations-records-column right header'}>{t('status')}</span>
            </div>
        </header>
    );
}