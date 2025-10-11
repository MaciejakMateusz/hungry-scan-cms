import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {TranslationRecordsHeader} from "./TranslationRecordsHeader";
import {getCategories} from "../../../../slices/dishesCategoriesSlice";
import {
    getAllIngredients, getAllMenus,
    getAllVariants,
    setActiveRecord,
    setActiveRecordId,
    setAdditions,
    setDishesCategories,
    setErrorData, setMenus,
    setVariants
} from "../../../../slices/translationsSlice";
import {TranslationsEditor} from "./editor/TranslationsEditor";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {TranslationsList} from "./TranslationsList";
import {TranslationsEditorHeader} from "./editor/TranslationsEditorHeader";

export const Translations = () => {
    const {t} = useTranslation();
    const {chosenGroup, saveSuccess} = useSelector(state => state.translations.view);
    const dispatch = useDispatch();

    const fetchRecords = async isInitialLoading => {
        const fetchGroupData = async (provider, type) => {
            try {
                const data = await dispatch(provider());
                if (provider.fulfilled.match(data)) {
                    if (type === 'categoriesMenuItems') {
                        dispatch(setDishesCategories(data.payload));
                    } else if (type === 'menuItemsVariants') {
                        dispatch(setVariants(data.payload));
                    } else if (type === 'additions') {
                        dispatch(setAdditions(data.payload));
                    } else if (type === 'welcomeSlogans') {
                        dispatch(setMenus(data.payload));
                    }
                    if (isInitialLoading) {
                        activateFirstRecord(type, data);
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

        switch (chosenGroup?.value) {
            case 'categoriesMenuItems':
                await fetchGroupData(getCategories, 'categoriesMenuItems');
                break;
            case 'menuItemsVariants':
                await fetchGroupData(getAllVariants, 'menuItemsVariants');
                break;
            case 'additions':
                await fetchGroupData(getAllIngredients, 'additions');
                break;
            case 'welcomeSlogans':
                await fetchGroupData(getAllMenus, 'welcomeSlogans');
                break;
            default:
                await fetchGroupData(getCategories);
        }
    }

    const activateFirstRecord = (type, data) => {
        dispatch(setActiveRecord(data.payload[0]));
        setRecordId(data.payload[0], type);
    }

    const setRecordId = (activeRecord, type) => {
        if (['categoriesMenuItems', 'menuItemsVariants'].includes(type)) {
            dispatch(setActiveRecordId('p' + activeRecord?.id));
            return;
        }
        dispatch(setActiveRecordId('c' + activeRecord?.id));
    }

    useEffect(() => {
        fetchRecords(true);
    }, [chosenGroup]);

    return (
        <>
            <Helmet>
                <title>CMS - {t("translations")}</title>
            </Helmet>
            {saveSuccess ? <SuccessMessage text={t('saved')}/> : <></>}
            <div className={'background'}>
                <main className={'cms-padded-view-container'}>
                    <div className={'translations-vertical-split-grid'}>
                        <TranslationRecordsHeader/>
                        <section
                            className={`translations-vertical-split-left ${chosenGroup?.value !== 'dishesCategories' && 'simple'}`}>
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