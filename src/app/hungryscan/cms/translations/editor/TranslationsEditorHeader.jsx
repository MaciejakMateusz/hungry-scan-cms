import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {supportedLanguages} from "../../../../../i18n";
import {useDispatch, useSelector} from "react-redux";
import {setChosenDestinationLanguage} from "../../../../../slices/translationsSlice";
import {CustomSelect} from "../../form-components/CustomSelect";
import {mainSelect} from "../../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../form-components/CustomNoOptionsMessage";
import {getLanguage} from "../../../../../locales/langUtils";

export const TranslationsEditorHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const supported = Object.keys(supportedLanguages);
    const currentSystemLanguage = getLanguage();
    const originLanguage = currentSystemLanguage === 'pl-PL' ? 'pl' : currentSystemLanguage;
    const defaultDestination = Object.keys(supportedLanguages)
        .filter(languageKey =>
            languageKey !== originLanguage)[0];
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const destinationOptions = supported
        .filter(language => language !== originLanguage)
        .map(language => ({
            value: language,
            label: t(language),
        }));

    useEffect(() => {
        dispatch(setChosenDestinationLanguage({
            value: defaultDestination,
            label: t(defaultDestination)
        }));
    }, [defaultDestination, dispatch, t]);

    const handleDestinationPicking = language => {
        if (language.value === originLanguage) {
            return;
        }
        dispatch(setChosenDestinationLanguage(language));
    }

    return (
        <header className={'translations-vertical-split-header-right'}>
            <CustomSelect id={'destination-languages'}
                          name={'destination-languages'}
                          value={chosenDestinationLanguage}
                          onChange={(selected) => handleDestinationPicking(selected)}
                          options={destinationOptions}
                          disableFieldContainer={true}
                          styles={mainSelect}
                          components={{NoOptionsMessage: CustomNoOptionsMessage}}
            />
        </header>

    );
}