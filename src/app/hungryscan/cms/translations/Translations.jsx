import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {TranslationRecordsHeader} from "./TranslationRecordsHeader";
import {getCategories} from "../../../../slices/dishesCategoriesSlice";
import {
    getAllIngredients,
    getAllVariants,
    setActiveRecord,
    setActiveRecordId,
    setErrorData,
    setRecords
} from "../../../../slices/translationsSlice";
import {TranslationsEditor} from "./editor/TranslationsEditor";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {TranslationsList} from "./TranslationsList";
import {TranslationsEditorHeader} from "./editor/TranslationsEditorHeader";

export const Translations = () => {
    const {t} = useTranslation();
    const {chosenGroup, saveSuccess, activeRecord} = useSelector(state => state.translations.view);
    const dispatch = useDispatch();

    const fetchRecords = async () => {
        const fetchGroupData = async (provider) => {
            try {
                const data = await dispatch(provider());
                if (provider.fulfilled.match(data)) {
                    dispatch(setRecords(data.payload));
                    if(!activeRecord) {
                        dispatch(setActiveRecord(data.payload[0]));
                        setRecordId(data.payload[0]);
                    }
                } else if (provider.rejected.match(data)) {
                    dispatch(setErrorData(data.payload));
                }
                return data.payload
            } catch (error) {
                console.error("Error fetching data:", error);
                dispatch(setErrorData(error));
            }
        };
        const groupValue = chosenGroup ? chosenGroup?.value : chosenGroup;
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

    const setRecordId = activeRecord => {
        if(chosenGroup?.value === 'dishesCategories') {
            const hasDescription = 'description' in activeRecord;
            const activeRecordId = hasDescription ? 'c' + activeRecord?.id : 'p' + activeRecord?.id;
            dispatch(setActiveRecordId(activeRecordId));
            return;
        }
        dispatch(setActiveRecordId('p' + activeRecord.id));
    }

    useEffect(() => {
        fetchRecords();
    }, [chosenGroup]);

    return (
        <>
            <Helmet>
                <title>CMS - {t("translations")}</title>
            </Helmet>
            {saveSuccess ? <SuccessMessage text={t('saved')}/> : <></>}
            <div className={'translation-background'}>
                <main className={'translations-padded-view-container'}>
                    <div className={'translations-vertical-split-grid'}>
                        <TranslationRecordsHeader/>
                        <section className={`translations-vertical-split-left ${chosenGroup?.value !== 'dishesCategories' ? 'simple' : ''}`}>
                            <TranslationsList/>
                        </section>
                        <TranslationsEditorHeader/>
                        <TranslationsEditor fetchRecords={fetchRecords}/>
                    </div>
                </main>
            </div>
        </>
    );
}