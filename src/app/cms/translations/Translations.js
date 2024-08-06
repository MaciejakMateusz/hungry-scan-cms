import React, {useEffect, useState} from "react";
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
import {TranslationsEditor} from "./editor/TranslationsEditor";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {TranslationsList} from "./TranslationsList";
import {LoadingSpinner} from "../../icons/LoadingSpinner";
import {TranslationsEditorHeader} from "./editor/TranslationsEditorHeader";

export const Translations = () => {
    const {t} = useTranslation();
    const [resourcesLoading, setResourcesLoading] = useState(false);
    const {chosenGroup, saveSuccess} = useSelector(state => state.translations.view);
    const dispatch = useDispatch();

    const fetchRecords = async () => {
        const fetchGroupData = async (provider) => {
            setResourcesLoading(true);
            try {
                const data = await dispatch(provider());
                if (provider.fulfilled.match(data)) {
                    dispatch(setRecords(data.payload));
                    dispatch(setActiveRecord(data.payload[0]));
                    setRecordId(data.payload[0]);
                    setResourcesLoading(false);
                } else if (provider.rejected.match(data)) {
                    setResourcesLoading(false);
                    dispatch(setErrorData(data.payload));
                }
                return data.payload
            } catch (error) {
                console.error("Error fetching data:", error);
                setResourcesLoading(false);
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
                            {resourcesLoading ? <LoadingSpinner/> : <TranslationsList/>}
                        </section>
                        <TranslationsEditorHeader/>
                        <TranslationsEditor fetchRecords={fetchRecords}/>
                    </div>
                </main>
            </div>
        </>
    );
}