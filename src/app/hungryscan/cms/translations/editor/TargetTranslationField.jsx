import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getAutoTranslation, setErrorData} from "../../../../../slices/translationsSlice";
import {AiIcon} from "../../../../icons/AiIcon";
import {BorderedButton} from "../../../common/BorderedButton";
import {Tooltip} from "../../Tooltip";

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
    const isBeta = String(process.env.REACT_APP_IS_BETA).toLowerCase() === 'true';

    const handleFieldChange = value => {
        dispatch(changeHandler(value));
    }

    const handleFieldTranslation = async (e) => {
        e.preventDefault();
        if (isBeta) return;
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
            <div className={'translation-value-content-container'}>
                    <textarea className={'translation-textarea-input'}
                              placeholder={t('typeTranslation')}
                              id={type}
                              name={type}
                              value={value}
                              maxLength={255}
                              onChange={(e) => handleFieldChange(e.target.value)}
                    />
            </div>
            <div className={'translate-to-footer'}>
                <Tooltip content={isBeta ? t('unavailableInBeta') : ''} topOffset={-20}>
                    <BorderedButton text={t('automaticTranslation')}
                                    icon={<AiIcon/>}
                                    style={isBeta ? {cursor: 'not-allowed'} : {}}
                                    isBordered={true}
                                    onClick={handleFieldTranslation}/>
                </Tooltip>
            </div>
        </div>
    );
}