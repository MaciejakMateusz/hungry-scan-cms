import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getAutoTranslation, setErrorData} from "../../../../../slices/translationsSlice";
import {LoadingSpinner} from "../../../../icons/LoadingSpinner";
import {TranslationStatus} from "../TranslationStatus";

export const TargetTranslationField = ({value, changeHandler, type}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        sourceName,
        sourceDescription,
        sourceWelcomeSlogan
    } = useSelector(state => state.translations.view);
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const isAutoTranslateLoading = useSelector(state => state.translations.autoTranslate.isLoading);

    const handleFieldChange = value => {
        dispatch(changeHandler(value));
    }

    const handleFieldTranslation = async () => {
        let textToTranslate;
        if ('name' === type) {
            textToTranslate = sourceName;
        } else if ('description' === type) {
            textToTranslate = sourceDescription;
        } else if ('welcomeSlogan' === type) {
            textToTranslate = sourceWelcomeSlogan;
        }
        const restaurantLanguage = restaurant?.value.settings.language;
        const resultAction = await dispatch(getAutoTranslation({
            text: textToTranslate,
            sourceLanguage: restaurantLanguage,
            targetLanguage: chosenDestinationLanguage.value
        }));
        if (getAutoTranslation.fulfilled.match(resultAction)) {
            const translatedText = resultAction.payload?.translations[0].text;
            handleFieldChange(translatedText);
        } else if (getAutoTranslation.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload));
        }
    }

    return (
        <div className={'translate-to-box'}>
            <div className={'translate-to-header'}>
                <span className={'translation-text-label'}>
                    {t('translation')}
                </span>
                {isAutoTranslateLoading &&
                    <div className={'absolute-spinner-container'}>
                        <LoadingSpinner buttonMode={true} customStyle={{width: '0.6rem', height: '0.6rem'}}/>
                    </div>}
                <div className={'translation-status-label-group'}>
                    <div className={'translate-to-translation-status'}>
                        <TranslationStatus translated={value?.length > 0}/>
                    </div>
                    <div className={'language-label'}>
                        {t(chosenDestinationLanguage.value.toLowerCase())}
                    </div>
                </div>
            </div>
            <div className={'translation-value-content-container'}>
                    <textarea className={'translation-textarea-input'}
                              placeholder={t('typeTranslation')}
                              id={type}
                              name={type}
                              value={value}
                              onChange={(e) => handleFieldChange(e.target.value)}
                    />
            </div>
            <div className={'translate-to-footer'}>
                <div className={'auto-translation-group'} onClick={handleFieldTranslation}>
                    <span className={'translate-icon'}>
                        #<sub>A</sub>
                    </span>
                    <span className={'automatic-translation-text'}>
                            {t('automaticTranslation')}
                    </span>
                </div>
            </div>
        </div>
    );
}