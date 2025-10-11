import React from "react";
import {TranslationRecord} from "./TranslationRecord";
import {setActiveRecord, setActiveRecordId} from "../../../../slices/translationsSlice";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

export const TranslationsList = () => {
    const {t} = useTranslation();
    const {dishesCategories, variants, additions, menus} = useSelector(state => state.translations.view);
    const {chosenGroup} = useSelector(state => state.translations.view);
    const dispatch = useDispatch();

    const renderRecords = () => {
        switch (chosenGroup?.value) {
            case 'menuItemsVariants':
                return (
                    <>
                        {variants?.length > 0 ? variants.map((menuItem, index) => (
                            <div key={menuItem.id}>
                                <TranslationRecord parent={true}
                                                   index={index + 1}
                                                   record={menuItem}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('p' + menuItem.id));
                                                       dispatch(setActiveRecord(menuItem));
                                                   }}
                                />
                                {menuItem.variants && menuItem.variants.map(variant => (
                                    <div key={variant.id}>
                                        <TranslationRecord parent={false}
                                                           record={variant}
                                                           setActive={() => {
                                                               dispatch(setActiveRecordId('c' + variant.id));
                                                               dispatch(setActiveRecord(variant));
                                                           }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )) : <p className={'flex-centered'}>{t('noRecordsFound')}</p>}
                    </>
                );
            case 'categoriesMenuItems':
                return (
                    <>
                        {dishesCategories?.length > 0 ? dishesCategories.map((category, index) => (
                            <div key={category.id}>
                                <TranslationRecord parent={true}
                                                   index={index + 1}
                                                   record={category}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('p' + category.id))
                                                       dispatch(setActiveRecord(category));
                                                   }}
                                />
                                {category.menuItems && category.menuItems.map(menuItem => (
                                    <div key={menuItem.id}>
                                        <TranslationRecord parent={false}
                                                           record={menuItem}
                                                           setActive={() => {
                                                               dispatch(setActiveRecord(menuItem));
                                                               dispatch(setActiveRecordId('c' + menuItem.id));
                                                           }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )) : t('noRecordsFound')}
                    </>
                );
            case 'additions':
                return (
                    <>
                        {additions?.length > 0 ? additions.map((addition, index) => (
                            <div key={addition.id}>
                                <TranslationRecord parent={false}
                                                   index={index + 1}
                                                   record={addition}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('c' + addition.id))
                                                       dispatch(setActiveRecord(addition));
                                                   }}
                                />
                            </div>
                        )) : t('noRecordsFound')}
                    </>
                );
            case 'welcomeSlogans':
                return (
                    <>
                        {menus?.length > 0 ? menus.map((menu, index) => (
                            <div key={menu.id}>
                                <TranslationRecord parent={false}
                                                   index={index + 1}
                                                   record={menu}
                                                   setActive={() => {
                                                       dispatch(setActiveRecordId('c' + menu.id))
                                                       dispatch(setActiveRecord(menu));
                                                   }}
                                />
                            </div>
                        )) : t('noRecordsFound')}
                    </>
                );
            default:
                return (<></>);
        }
    }

    return renderRecords();
}