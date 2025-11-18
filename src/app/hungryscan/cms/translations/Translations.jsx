import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../../../slices/dishesCategoriesSlice";
import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {
    getAllIngredients,
    getAllMenus,
    getAllVariants,
    setAdditions,
    setAutoTranslationError,
    setChosenGroup,
    setDishesCategories,
    setErrorData,
    setMenus,
    setPostingError,
    setVariants
} from "../../../../slices/translationsSlice";
import {TranslationsList} from "./TranslationsList";
import {mainSelectWhite} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {TargetLanguageSelector} from "./TargetLanguageSelector";
import {TranslationsEditor} from "./editor/TranslationsEditor";

export const Translations = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {chosenGroup, saveSuccess, activeRecord} = useSelector(state => state.translations.view);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {autoTranslationError} = useSelector(state => state.translations.autoTranslate);
    const {postingError} = useSelector(state => state.translations.postTranslatables);
    const options = [
        {
            value: 'categoriesMenuItems',
            label: t('dishesCategories')
        },
        {
            value: 'menuItemsVariants',
            label: t('menuItemsVariants')
        },
        {
            value: 'additions',
            label: t('additions')
        },
        {
            value: 'welcomeSlogans',
            label: t('welcomeSlogans')
        }
    ];

    const fetchRecords = async () => {
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

    useEffect(() => {
        fetchRecords();
    }, [chosenGroup, activeMenu]);

    useEffect(() => {
        dispatch(setChosenGroup({
            value: 'categoriesMenuItems',
            label: t('dishesCategories')
        }));
    }, [dispatch, t]);


    return (
        <>
            <Helmet>
                <title>CMS - {t('translations')}</title>
            </Helmet>
            {saveSuccess ? <SuccessMessage text={t('saved')}/> : <></>}
            <FormErrorDialog errorData={autoTranslationError} setErrorData={setAutoTranslationError}/>
            <FormErrorDialog errorData={postingError} setErrorData={setPostingError}/>
            {activeRecord && <TranslationsEditor fetchRecords={fetchRecords}/>}
            <div className={'background'}>
                <main className={'cms-padded-view-container'}>
                    <div className={'functions-header'}>
                        <div className={'section-heading'}>{t('translations')}</div>
                        <div className={'flex-wrapper-gapped'}>
                            <TargetLanguageSelector/>
                            <Select id={'translation-group'}
                                    name={'translation-group'}
                                    value={chosenGroup}
                                    placeholder={t('choose')}
                                    options={options}
                                    defaultValue={options[0]}
                                    onChange={(selected) => dispatch(setChosenGroup(selected))}
                                    styles={mainSelectWhite}
                                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                            />
                        </div>
                    </div>
                    <TranslationsList/>
                </main>
            </div>
        </>
    );
}
