import React from "react";
import {TranslationRecord} from "./TranslationRecord";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {TranslationContainer} from "./TranslationsList.style";
import {setActiveRecord, setActiveRecordId} from "../../../../slices/translationsSlice";

export const TranslationsList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {dishesCategories, variants, additions, menus} = useSelector(state => state.translations.view);
    const {chosenGroup} = useSelector(state => state.translations.view);

    const renderRecords = () => {
        switch (chosenGroup?.value) {
            case 'menuItemsVariants':
                return (
                    <>
                        {variants?.length > 0 ? variants.map(menuItem => (
                            <TranslationContainer key={menuItem.id} $hasParent={true}>
                                <TranslationRecord record={menuItem}
                                                   isParent={true}
                                                   parentTranslatableKey={'name'}
                                                   childrenKey={'variants'}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('p' + menuItem.id));
                                                       dispatch(setActiveRecord(menuItem));
                                                   }}
                                />
                                <div className={'draggable-position-separator'}/>
                                {menuItem.variants && menuItem.variants.map(variant => (
                                    <div key={variant.id}>
                                        <TranslationRecord record={variant}
                                                           childTranslatableKey={'name'}
                                                           setActive={() => {
                                                               dispatch(setActiveRecordId('c' + variant.id));
                                                               dispatch(setActiveRecord(variant));
                                                           }}
                                        />
                                        <div className={'draggable-position-separator'}/>
                                    </div>
                                ))}
                            </TranslationContainer>
                        )) : <p className={'flex-centered'}>{t('noRecordsFound')}</p>}
                    </>
                );
            case 'categoriesMenuItems':
                return (
                    <>
                        {dishesCategories?.length > 0 ? dishesCategories.map((category) => (
                            <TranslationContainer key={category.id} $hasParent={true}>
                                <TranslationRecord record={category}
                                                   isParent={true}
                                                   childrenKey={'menuItems'}
                                                   parentTranslatableKey={'name'}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('p' + category.id));
                                                       dispatch(setActiveRecord(category));
                                                   }}
                                />
                                <div className={'draggable-position-separator'}/>
                                {category.menuItems && category.menuItems.map(menuItem => (
                                    <div key={menuItem.id}>
                                        <TranslationRecord record={menuItem}
                                                           childTranslatableKey={'name'}
                                                           setActive={() => {
                                                               dispatch(setActiveRecord(menuItem));
                                                               dispatch(setActiveRecordId('c' + menuItem.id));
                                                           }}
                                        />
                                        <div className={'draggable-position-separator'}/>
                                    </div>
                                ))}
                            </TranslationContainer>
                        )) : t('noRecordsFound')}
                    </>
                );
            case 'additions':
                return (
                    <>
                        {additions?.length > 0 ? additions.map(addition => (
                            <TranslationContainer key={addition.id} $hasParent={false}>
                                <TranslationRecord record={addition}
                                                   childTranslatableKey={'name'}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('c' + addition.id))
                                                       dispatch(setActiveRecord(addition));
                                                   }}
                                />
                                <div className={'draggable-position-separator'}/>
                            </TranslationContainer>
                        )) : t('noRecordsFound')}
                    </>
                );
            case 'welcomeSlogans':
                return (
                    <>
                        {menus?.length > 0 ? menus.map(menu => (
                            <TranslationContainer key={menu.id} $hasParent={false}>
                                <TranslationRecord record={menu}
                                                   childTranslatableKey={'message'}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('c' + menu.id))
                                                       dispatch(setActiveRecord(menu));
                                                   }}
                                />
                                <div className={'draggable-position-separator'}/>
                            </TranslationContainer>
                        )) : t('noRecordsFound')}
                    </>
                );
            default:
                return (<p>{t('noRecordsFound')}</p>);
        }
    }

    return (
        <div className={'scrollable-wrapper'}>
            {renderRecords()}
        </div>
    );
}