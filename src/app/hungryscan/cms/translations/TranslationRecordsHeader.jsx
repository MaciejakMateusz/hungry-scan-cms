import React, {useEffect} from "react";
import Select from "react-select";
import {mainSelect} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";
import {setChosenGroup} from "../../../../slices/translationsSlice";
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "../../../../locales/langUtils";

export const TranslationRecordsHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const options = [
        {
            value: 'categoriesMenuItems',
            label: t('dishesCategories')
        },
        {
            value: 'menuItemsVariants',
            label: t('menuItemsVariants')
        },
        {
            value: 'additions',
            label: t('additions')
        },
        {
            value: 'welcomeSlogans',
            label: t('welcomeSlogans')
        }
    ];
    const {chosenGroup} = useSelector(state => state.translations.view);

    useEffect(() => {
        dispatch(setChosenGroup({
            value: 'categoriesMenuItems',
            label: t('dishesCategories')
        }));
    }, [dispatch, t]);

    const renderMiddleHeader = () => {
        if(chosenGroup?.value === 'categoriesMenuItems') {
            return (
                <span className={'translations-records-column middle header'}>{t('description')}</span>
            );
        } else if (chosenGroup?.value === 'welcomeSlogans') {
            return (
                <span className={'translations-records-column middle header'}>{t('welcomeSlogan')}</span>
            );
        }
        return (<></>);
    }

    return (
        <header className={'translations-vertical-split-header-left'}>
            <Select id={'translation-group'}
                    name={'translation-group'}
                    value={chosenGroup}
                    placeholder={t('choose')}
                    options={options}
                    defaultValue={options[0]}
                    onChange={(selected) => dispatch(setChosenGroup(selected))}
                    styles={mainSelect}
                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
            />
            <div className={'translation-record-grid header'}>
                <span className={'translations-records-column left header'}>
                    {chosenGroup?.value !== 'welcomeSlogans' ? t('name') : t('menuName')}
                </span>
                {renderMiddleHeader()}
                <span className={'translations-records-column right header'}>{t('status')}</span>
            </div>
        </header>
    );
}