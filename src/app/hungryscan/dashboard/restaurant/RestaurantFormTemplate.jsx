import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setAddress,
    setChosenSupportedLanguages,
    setCity,
    setLanguage,
    setName,
    setPostalCode
} from "../../../../slices/restaurantSlice";
import {NameField} from "../../cms/form-components/NameField";
import {CustomTextField} from "../../cms/form-components/CustomTextField";
import {OperatingHoursFieldsSet} from "./OperatingHoursFieldsSet";
import {useTranslation} from "react-i18next";
import {CustomSelect} from "../../cms/form-components/CustomSelect";
import {customSelect} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../cms/form-components/CustomNoOptionsMessage";
import {supportedLanguages} from "../../../../i18n";
import makeAnimated from "react-select/animated";

export const RestaurantFormTemplate = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const animatedComponents = makeAnimated();
    const {
        name,
        address,
        postalCode,
        city,
        settings,
        chosenSupportedLanguages,
        editRestaurantFormActive
    } = useSelector(state => state.restaurant.form);

    const {errorData} = useSelector(state => state.restaurant.form);
    const supported = Object.keys(supportedLanguages);
    const languageOptions = supported.filter(language => language.toUpperCase() !== settings.language?.value)
        .map(language => ({
            value: language.toUpperCase(),
            label: t(language)
        }));

    return (
        <>
            <div>
                <div className={'form-group-header'}>
                    {t('restaurantData')}
                </div>
                <NameField id={'restaurant-name'}
                           value={name}
                           onChange={(e) => dispatch(setName(e))}
                           error={errorData}
                />
                <CustomTextField id={'restaurant-address'}
                                 errorField={errorData?.address}
                                 value={address}
                                 onChange={(e) => dispatch(setAddress(e))}
                                 required={true}
                                 placeholder={'Wpisz adres'}
                                 label={'Adres'}
                />
                <CustomTextField id={'restaurant-postalCode'}
                                 value={postalCode}
                                 onChange={(e) => dispatch(setPostalCode(e))}
                                 errorField={errorData?.postalCode}
                                 required={true}
                                 placeholder={'Wpisz kod pocztowy'}
                                 label={'Kod pocztowy'}
                />
                <CustomTextField id={'restaurant-city'}
                                 value={city}
                                 onChange={(e) => dispatch(setCity(e))}
                                 errorField={errorData?.city}
                                 required={true}
                                 placeholder={'Wpisz miasto'}
                                 label={'Miasto'}
                />
                <CustomSelect id={'language'}
                              name={'language'}
                              labelName={t('language')}
                              isRequired={true}
                              info={editRestaurantFormActive ?
                                  t('restaurantLanguageInfoEdit') :
                                  t('restaurantLanguageInfoNew')}
                              placeholder={'Wybierz język...'}
                              value={settings.language}
                              onChange={(selected) => dispatch(setLanguage(selected))}
                              options={languageOptions}
                              styles={customSelect}
                              isDisabled={editRestaurantFormActive}
                              components={{NoOptionsMessage: CustomNoOptionsMessage}}/>
                <CustomSelect id={'supported-languages'}
                              name={'supportedLanguages'}
                              labelName={t('supportedLanguages')}
                              isRequired={true}
                              closeMenuOnSelect={false}
                              onChange={(selected) => dispatch(setChosenSupportedLanguages(selected))}
                              value={chosenSupportedLanguages}
                              placeholder={t('choose')}
                              options={languageOptions}
                              isClearable={true}
                              isMulti={true}
                              components={{...animatedComponents, NoOptionsMessage: CustomNoOptionsMessage}}/>

            </div>
            <OperatingHoursFieldsSet/>
        </>
    );
}