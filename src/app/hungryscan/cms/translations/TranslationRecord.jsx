import React from "react";
import {getLanguage, getTranslation} from "../../../../locales/langUtils";
import {TranslationStatus} from "./TranslationStatus";
import {RightArrowIcon} from "../../../icons/RightArrowIcon";
import {useSelector} from "react-redux";

export const TranslationRecord = ({parent, index, record, setActive}) => {
    const {activeRecordId, chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const currentSystemLanguage = getLanguage();
    const {chosenGroup} = useSelector(state => state.translations.view);

    const renderLeftColumn = () => {
        return (
            <div className={'translations-records-column left'}>
                <span className={'translation-record-content'}>
                    {parent ? index + '. ' : ''}{getTranslation(record.name)}
                </span>
            </div>
        );
    }

    const renderMiddleColumn = () => {
        return (
            <span className={'translations-records-column middle'}>
                <span className={'translation-record-content'}>
                    {chosenGroup.value === 'welcomeSlogans' && getTranslation(record.message)}
                    {record.description && getTranslation(record.description)}
                </span>
            </span>
        );
    }

    const renderRightColumn = () => {
        return (
            <span className={'translations-records-column right'}>
                {determineTranslationStatus()}
                <span className={'translation-record-arrow'}><RightArrowIcon/></span>
            </span>
        );
    }

    const determineTranslationStatus = () => {
        let isNameTranslated = false;
        let isDescriptionTranslated = false;
        let isFullyTranslated = false;
        if (record.name) {
            const sourceName = record.name[currentSystemLanguage] ? record.name[currentSystemLanguage].length > 0 : false;
            const targetName = record.name[chosenDestinationLanguage.value] ? record.name[chosenDestinationLanguage.value].length > 0 : false;
            isNameTranslated = sourceName && targetName;
            isFullyTranslated = isNameTranslated;
        }
        if (record.description) {
            const sourceDescription = record.description[currentSystemLanguage] ? record.description[currentSystemLanguage].length > 0 : false;
            const targetDescription = record.description[chosenDestinationLanguage.value] ? record.description[chosenDestinationLanguage.value].length > 0 : false;
            isDescriptionTranslated = sourceDescription && targetDescription;
            isFullyTranslated = isNameTranslated && isDescriptionTranslated;
        }
        if (record.message) {
            const sourceWelcomeSlogan = record.message[currentSystemLanguage] ? record.message[currentSystemLanguage].length > 0 : false;
            const targetWelcomeSlogan = record.message[chosenDestinationLanguage.value] ? record.message[chosenDestinationLanguage.value].length > 0 : false;
            isFullyTranslated = sourceWelcomeSlogan && targetWelcomeSlogan;
        }
        return (
            <TranslationStatus translated={isFullyTranslated}/>
        );
    }

    const renderRecord = () => {
        const currentRecordId = parent ? 'p' + record.id : 'c' + record.id
        return (
            <div
                className={`translation-record-grid ${parent ? 'parent' : 'child'} ${activeRecordId === currentRecordId && 'active'}`}
                onClick={setActive}>
                {renderLeftColumn()}
                {renderMiddleColumn()}
                {renderRightColumn()}
            </div>
        );
    }

    return renderRecord();
}