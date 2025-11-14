import React from "react";
import {useSelector} from "react-redux";
import {TextWrapper} from "../dishes-categories/menu-item/MenuItemPosition.style";
import {TranslationContainer} from "./TranslationRecord.style";
import {RightArrowIcon} from "../../../icons/RightArrowIcon";
import {TranslationStatus} from "./TranslationStatus";
import {ContentSizeIndicator} from "../shared-components/ContentSizeIndicator";

export const TranslationRecord = ({
                                      record,
                                      isParent,
                                      parentTranslatableKey,
                                      childrenKey,
                                      childTranslatableKey,
                                      setActive}) => {
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const destinationValue = chosenDestinationLanguage?.value?.toLowerCase();

    const renderStatusIndicator = () => {
        return (
            <div>
                {determineTranslationStatus()}
                <span className={'translation-record-arrow'}><RightArrowIcon/></span>
            </div>
        );
    }

    const determineTranslationStatus = () => {
        let isNameTranslated = false;
        let isDescriptionTranslated = false;
        let isFullyTranslated = false;
        if (record.name) {
            const sourceName = record.name[restaurantLanguage] ? record.name[restaurantLanguage].length > 0 : false;
            const targetName = record.name[destinationValue] ? record.name[destinationValue].length > 0 : false;
            isNameTranslated = sourceName && targetName;
            isFullyTranslated = isNameTranslated;
        }
        if (record.description) {
            const sourceDescription = record.description[restaurantLanguage] ? record.description[restaurantLanguage].length > 0 : false;
            const targetDescription = record.description[destinationValue] ? record.description[destinationValue].length > 0 : false;
            isDescriptionTranslated = sourceDescription && targetDescription;
            isFullyTranslated = isNameTranslated && isDescriptionTranslated;
            if (!sourceDescription && !targetDescription) {
                isFullyTranslated = isNameTranslated;
            }
        }
        if (record.message) {
            const sourceWelcomeSlogan = record.message[restaurantLanguage] ? record.message[restaurantLanguage].length > 0 : false;
            const targetWelcomeSlogan = record.message[destinationValue] ? record.message[destinationValue].length > 0 : false;
            isFullyTranslated = sourceWelcomeSlogan && targetWelcomeSlogan;
        }
        return (
            <TranslationStatus translated={isFullyTranslated}/>
        );
    }


    if (!menu || !menu.categories) return null;

    const renderRecord = () => {
        if (isParent) {
            return (
                <div className={'category-container-header enable-hover'} onClick={setActive}>
                    <div className={'category-info'}>
                        <span className={'text-ellipsis'} style={{maxWidth: '50vw'}}>
                            {record[parentTranslatableKey][restaurantLanguage]}
                        </span>
                        {childrenKey && <ContentSizeIndicator size={record[childrenKey].length}/>}
                    </div>
                    {renderStatusIndicator()}
                </div>
            );
        } else {
            return (
                <TranslationContainer $hasDescription={'description' in record} onClick={setActive}>
                    <TextWrapper>
                        <span className={'draggable-position-name'}>
                            {record[childTranslatableKey][restaurantLanguage]}
                        </span>
                        {'description' in record &&
                            <span className={'draggable-position-description'}>
                                {record.description[restaurantLanguage]}
                            </span>
                        }
                    </TextWrapper>
                    {renderStatusIndicator()}
                </TranslationContainer>
            );
        }
    }

    return renderRecord();
}