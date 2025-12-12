import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {LanguageArrowsIcon} from "../../../../icons/LanguageArrowsIcon";

export const SourceTranslationField = ({value, type}) => {
    const {t} = useTranslation();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);

    return (
        <div className={'original-translation-box'}>
            <div className={'original-translation-header'}>
                <span className={'translation-text-label'}>
                    {t(type)}
                </span>
                <div className={'language-labels-wrapper'}>
                    <div className={'language-label'}>
                        {t(restaurant?.value.settings.language.toLowerCase())}
                    </div>
                    <LanguageArrowsIcon/>
                    <div className={'language-label'}>
                        {t(chosenDestinationLanguage.value.toLowerCase())}
                    </div>
                </div>
            </div>
            <div className={'translation-value-content-container'}>
                    <textarea className={'translation-textarea-input'}
                              placeholder={t('typeTranslation')}
                              id={type}
                              disabled={true}
                              name={type}
                              value={value}
                    />
            </div>
        </div>
    );
}