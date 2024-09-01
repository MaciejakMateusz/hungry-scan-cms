import React from "react";
import {getTranslation} from "../../../locales/langUtils";
import {TranslationStatus} from "./TranslationStatus";
import {RightArrowIcon} from "../../icons/RightArrowIcon";
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
            const nameDefTrans = record.name.defaultTranslation ? record.name.defaultTranslation.length > 0 : false;
            const nameEnTrans = record.name.translationEn ? record.name.translationEn.length > 0 : false;
            isNameTranslated = nameDefTrans && nameEnTrans;
        }
        if (record.description) {
            const descriptionDefTrans = record.description.defaultTranslation ? record.description.defaultTranslation.length > 0 : false;
            const descriptionEnTrans = record.description.translationEn ? record.description.translationEn.length > 0 : false;
            isDescriptionTranslated = descriptionDefTrans && descriptionEnTrans;
        }
        const isFullyTranslated = isNameTranslated && isDescriptionTranslated;
        return (
            <TranslationStatus translated={isFullyTranslated}/>
        );
    }

    const renderRecord = () => {
        let parentClass = parent;
        if (parent && chosenGroup.value !== 'dishesCategories') {
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