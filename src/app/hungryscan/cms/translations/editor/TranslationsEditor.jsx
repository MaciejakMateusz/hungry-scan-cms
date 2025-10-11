import React, {useEffect, useState} from "react";
import {SourceTranslationField} from "./SourceTranslationField";
import {TargetTranslationField} from "./TargetTranslationField";
import {useDispatch, useSelector} from "react-redux";
import {
    postTranslatables,
    setSaveSuccess, setSourceDescription, setSourceName, setSourceWelcomeSlogan,
    setTargetDescription,
    setTargetName, setTargetWelcomeSlogan
} from "../../../../../slices/translationsSlice";
import {getLanguage} from "../../../../../locales/langUtils";

export const TranslationsEditor = ({fetchRecords}) => {
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
    const currentSystemLanguage = getLanguage();
    const {chosenDestinationLanguage} = useSelector(state => state.translations.view);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const [hasDescription, setHasDescription] = useState(false);

    useEffect(() => {
        if (activeRecord && 'description' in activeRecord) {
            setHasDescription(true);
        } else {
            setHasDescription(false);
        }
    }, [activeRecord]);

    useEffect(() => {
        if (!activeRecord) return;
        dispatch(setSourceName(activeRecord.name?.[currentSystemLanguage]?? ''));
        dispatch(setSourceDescription(activeRecord.description?.[currentSystemLanguage]?? ''));
        dispatch(setSourceWelcomeSlogan(activeRecord.message?.[currentSystemLanguage]?? ''));
        dispatch(setTargetName(activeRecord.name?.[chosenDestinationLanguage.value] ?? ''));
        dispatch(setTargetDescription(activeRecord.description?.[chosenDestinationLanguage.value]?? ''));
        dispatch(setTargetWelcomeSlogan(activeRecord.message?.[chosenDestinationLanguage.value]?? ''));
    }, [activeRecord, currentSystemLanguage, chosenDestinationLanguage, dispatch]);

    const handleTranslatablesSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postTranslatables({targetLanguage: chosenDestinationLanguage.value}));
        if (postTranslatables.fulfilled.match(resultAction)) {
            dispatch(setSaveSuccess(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setSaveSuccess(false));
            }, 2000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);

            await fetchRecords(false);
        }
    }

    const renderDescriptionTranslatable = () => {
        if (!activeRecord || !('description' in activeRecord)) return;
        return (
            <>
                <SourceTranslationField value={sourceDescription}
                                        type={'description'}
                                        handleFieldChange={setSourceDescription}/>
                <TargetTranslationField
                    value={targetDescription}
                    renderButton={true}
                    changeHandler={setTargetDescription}
                    type={'description'}/>
            </>
        );
    };

    const renderNameTranslatable = () => {
        if (!activeRecord || 'message' in activeRecord) return;
        return (
            <section className={'translations-vertical-split-right'}>
                <form className={'translation-wrapper'} onSubmit={handleTranslatablesSubmit}>
                    <SourceTranslationField value={sourceName}
                                            type={'name'}
                                            handleFieldChange={setSourceName}/>
                    <TargetTranslationField value={targetName}
                                            renderButton={!hasDescription}
                                            changeHandler={setTargetName}
                                            type={'name'}/>
                    {renderDescriptionTranslatable()}
                </form>
            </section>
        );
    }

    const renderWelcomeSloganTranslatable = () => {
        if (!activeRecord  || !('message' in activeRecord)) return;
        return (
            <section className={'translations-vertical-split-right'}>
                <form className={'translation-wrapper'} onSubmit={handleTranslatablesSubmit}>
                    <SourceTranslationField value={sourceWelcomeSlogan}
                                            type={'welcomeSlogan'}
                                            handleFieldChange={setSourceWelcomeSlogan}/>
                    <TargetTranslationField value={targetWelcomeSlogan}
                                            renderButton={!hasDescription}
                                            changeHandler={setTargetWelcomeSlogan}
                                            type={'welcomeSlogan'}/>
                </form>
            </section>
        );
    }

    return (
        <>
            {renderNameTranslatable()}
            {renderWelcomeSloganTranslatable()}
        </>
    );
};