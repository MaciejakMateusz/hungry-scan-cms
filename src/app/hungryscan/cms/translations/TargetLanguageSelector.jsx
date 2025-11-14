import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setChosenDestinationLanguage} from "../../../../slices/translationsSlice";
import {CustomSelect} from "../form-components/CustomSelect";
import {mainSelectWhite} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";

export const TargetLanguageSelector = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const defaultDestination = restaurant?.value.settings.supportedLanguages[0];
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const destinationOptions = restaurant?.value.settings.supportedLanguages
        .map(language => ({
            value: language,
            label: t(language.toLowerCase()),
        }));

    useEffect(() => {
        dispatch(setChosenDestinationLanguage({
            value: defaultDestination.toLowerCase(),
            label: t(defaultDestination.toLowerCase()),
        }));
    }, [defaultDestination, dispatch, t]);

    const handleDestinationPicking = language => {
        dispatch(setChosenDestinationLanguage(language));
    }

    return (
        <CustomSelect id={'destination-languages'}
                      name={'destination-languages'}
                      value={chosenDestinationLanguage}
                      onChange={(selected) => handleDestinationPicking(selected)}
                      options={destinationOptions}
                      disableFieldContainer={true}
                      styles={mainSelectWhite}
                      components={{NoOptionsMessage: CustomNoOptionsMessage}}
        />
    );
}