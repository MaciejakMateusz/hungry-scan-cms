import React from "react";
import {getTranslation} from "../../../../locales/langUtils";
import {TranslationStatus} from "./TranslationStatus";
import {RightArrowIcon} from "../../../icons/RightArrowIcon";
import {useSelector} from "react-redux";

export const TranslationRecord = ({parent, index, record, setActive}) => {
    const {chosenGroup, activeRecordId} = useSelector(state => state.translations.view);

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
        let isNameTranslated = true;
        let isDescriptionTranslated = true;
        if (record.name) {
            const namePl = record.name.pl ? record.name.pl.length > 0 : false;
            const nameEn = record.name.en ? record.name.en.length > 0 : false;
            isNameTranslated = namePl && nameEn;
        }
        if (record.description) {
            const descriptionPl = record.description.pl ? record.description.pl.length > 0 : false;
            const descriptionEn = record.description.en ? record.description.en.length > 0 : false;
            isDescriptionTranslated = descriptionPl && descriptionEn;
        }
        const isFullyTranslated = isNameTranslated && isDescriptionTranslated;
        return (
            <TranslationStatus translated={isFullyTranslated}/>
        );
    }

    const renderRecord = () => {
        let parentClass = parent;
        if (parent && chosenGroup?.value !== 'dishesCategories') {
            parentClass = false;
        }
        const getActiveRecordId = parent ? 'p' + record.id : 'c' + record.id
        return (
            <div
                className={`translation-record-grid ${parentClass ? 'parent' : 'child'} ${activeRecordId === getActiveRecordId ? 'active' : ''}`}
                onClick={setActive}>
                {renderLeftColumn()}
                {renderMiddleColumn()}
                {renderRightColumn()}
            </div>
        );
    }

    return renderRecord();
}