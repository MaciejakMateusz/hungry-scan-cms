import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {TranslationRecordsHeader} from "./TranslationRecordsHeader";
import {getCategories} from "../../../slices/dishesCategoriesSlice";
import {
    getAllIngredients,
    getAllVariants,
    setActiveRecord,
    setActiveRecordId,
    setErrorData,
    setRecords
} from "../../../slices/translationsSlice";
import {TranslationRecord} from "./TranslationRecord";
import {TranslationsEditor} from "./editor/TranslationsEditor";

export const Translations = () => {
    const {t} = useTranslation();
    const {chosenGroup, records} = useSelector(state => state.translations.view);
    const dispatch = useDispatch();

    const fetchRecords = async () => {
        const fetchGroupData = async (provider) => {
            try {
                const data = await dispatch(provider());
                if (provider.fulfilled.match(data)) {
                    dispatch(setRecords(data.payload));
                } else if (provider.rejected.match(data)) {
                    dispatch(setErrorData(data.payload));
                }
                return data.payload
            } catch (error) {
                console.error("Error fetching data:", error);
                dispatch(setErrorData(error));
            }
        };
        const groupValue = chosenGroup ? chosenGroup.value : chosenGroup;
        switch (groupValue) {
            case 'dishesCategories':
                await fetchGroupData(getCategories);
                break;
            case 'variants':
                await fetchGroupData(getAllVariants);
                break;
            case 'additions':
                await fetchGroupData(getAllIngredients);
                break;
            default:
                await fetchGroupData(getCategories);
        }
    }

    useEffect(() => {
        fetchRecords();
    }, [chosenGroup]);

    return (
        <>
            <Helmet>
                <title>CMS - {t("translations")}</title>
            </Helmet>
            <div className={'translation-background'}>
                <main className={'translations-padded-view-container'}>
                    <div className={'translations-vertical-split-grid'}>
                        <TranslationRecordsHeader/>
                        <section className={`translations-vertical-split-left ${chosenGroup?.value !== 'dishesCategories' ? 'simple' : ''}`}>
                            {records?.length > 0 ? records.map((record, index) => (
                                <div key={record.id}>
                                    <TranslationRecord parent={true}
                                                       index={index + 1}
                                                       record={record}
                                                       setActive={() => {
                                                           dispatch(setActiveRecordId('p' + record.id))
                                                           dispatch(setActiveRecord(record));
                                                       }}
                                    />
                                    {record.menuItems ? record.menuItems.map(menuItem => (
                                            <div key={menuItem.id}>
                                                <TranslationRecord parent={false}
                                                                   record={menuItem}
                                                                   setActive={() => {
                                                                       dispatch(setActiveRecordId('c' + menuItem.id));
                                                                       dispatch(setActiveRecord(menuItem));
                                                                   }}
                                                />
                                            </div>
                                    )) : <></>}
                                </div>
                            )) : t('noRecordsFound')}

                        </section>
                        <header className={'translations-vertical-split-header-right'}>
                            <button className={'translations-chosen-lang active'}>
                                {t('english')}
                            </button>
                            <button className={'translations-chosen-lang'}>
                                {t('german')}
                            </button>
                        </header>
                        <TranslationsEditor fetchRecords={fetchRecords}/>
                    </div>
                </main>
            </div>
        </>
    );
}