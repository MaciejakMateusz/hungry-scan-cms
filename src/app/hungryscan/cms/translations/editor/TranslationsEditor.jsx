import React, {useEffect, useState} from "react";
import {SourceTranslationField} from "./SourceTranslationField";
import {TargetTranslationField} from "./TargetTranslationField";
import {useDispatch, useSelector} from "react-redux";
import {
    postTranslatables,
    setActiveRecord,
    setActiveRecordId,
    setSaveSuccess,
    setSourceDescription,
    setSourceName,
    setSourceWelcomeSlogan,
    setTargetDescription,
    setTargetName,
    setTargetWelcomeSlogan
} from "../../../../../slices/translationsSlice";
import {fetchActiveMenu} from "../../../../../slices/cmsSlice";
import {fetchIngredients} from "../../../../../slices/dishAdditionsSlice";
import {ButtonsWrapper, DialogContainer, DialogWrapper} from "./TranslationsEditor.style";
import {LoadingSpinner} from "../../../../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {setIsInEditMode} from "../../../../../slices/globalParamsSlice";

export const TranslationsEditor = ({fetchRecords}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        activeRecord,
        targetName,
        targetDescription,
        targetWelcomeSlogan,
        sourceName,
        sourceDescription,
        sourceWelcomeSlogan,
    } = useSelector(state => state.translations.view);
    const isPostLoading = useSelector(state => state.translations.postTranslatables.isLoading);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const destinationValue = chosenDestinationLanguage?.value?.toLowerCase();
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();

    useEffect(() => {
        if (!activeRecord) return;
        dispatch(setSourceName(activeRecord.name?.[restaurantLanguage] ?? ''));
        dispatch(setSourceDescription(activeRecord.description?.[restaurantLanguage] ?? ''));
        dispatch(setSourceWelcomeSlogan(activeRecord.message?.[restaurantLanguage] ?? ''));
        dispatch(setTargetName(activeRecord.name?.[destinationValue] ?? ''));
        dispatch(setTargetDescription(activeRecord.description?.[destinationValue] ?? ''));
        dispatch(setTargetWelcomeSlogan(activeRecord.message?.[destinationValue] ?? ''));
    }, [activeRecord, dispatch, restaurantLanguage, destinationValue]);

    const discardDialog = () => {
        dispatch(setActiveRecord(null));
        dispatch(setActiveRecordId(null));
        dispatch(setIsInEditMode(false));
    }

    const handleTranslatablesSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postTranslatables({targetLanguage: destinationValue}));
        if (postTranslatables.fulfilled.match(resultAction)) {
            discardDialog();
            dispatch(setSaveSuccess(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setSaveSuccess(false));
            }, 2000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);

            await dispatch(fetchActiveMenu());
            await dispatch(fetchIngredients())
            await fetchRecords(false);
            dispatch(setIsInEditMode(false));
        }
    }

    const renderDescriptionTranslatable = () => {
        const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
        if (!activeRecord || !('description' in activeRecord) || !activeRecord.description[restaurantLanguage]) return;
        return (
            <>
                <SourceTranslationField value={sourceDescription}
                                        type={'description'}/>
                <TargetTranslationField
                    value={targetDescription}
                    changeHandler={setTargetDescription}
                    type={'description'}/>
            </>
        );
    };

    const renderNameTranslatable = () => {
        if (!activeRecord || 'message' in activeRecord) return;
        return (
            <section>
                <form className={'translation-wrapper'}>
                    <SourceTranslationField value={sourceName}
                                            type={'name'}/>
                    <TargetTranslationField value={targetName}
                                            changeHandler={setTargetName}
                                            type={'name'}/>
                    {renderDescriptionTranslatable()}
                </form>
            </section>
        );
    }

    const renderWelcomeSloganTranslatable = () => {
        if (!activeRecord || !('message' in activeRecord)) return;
        return (
            <section>
                <form className={'translation-wrapper'}>
                    <SourceTranslationField value={sourceWelcomeSlogan}
                                            type={'welcomeSlogan'}/>
                    <TargetTranslationField value={targetWelcomeSlogan}
                                            changeHandler={setTargetWelcomeSlogan}
                                            type={'welcomeSlogan'}/>
                </form>
            </section>
        );
    }

    const renderButtons = () => {
        return (
            <div className={'dialog-footer'}>
                <button className={'general-button cancel'}
                        onClick={discardDialog}>
                    {t('cancel')}
                </button>
                <button className={'general-button'} onClick={handleTranslatablesSubmit}>
                    {isPostLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                </button>
            </div>
        );
    }

    return (
        <DialogWrapper>
            <div className={'overlay'}/>
            <DialogContainer>
                {renderNameTranslatable()}
                {renderWelcomeSloganTranslatable()}
                <ButtonsWrapper>
                    {renderButtons()}
                </ButtonsWrapper>
            </DialogContainer>
        </DialogWrapper>
    );
};