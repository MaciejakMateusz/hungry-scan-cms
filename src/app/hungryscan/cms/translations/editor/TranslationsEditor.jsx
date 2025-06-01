import React, {useEffect, useState} from "react";
import {OriginalTranslation} from "./OriginalTranslation";
import {TranslateToField} from "./TranslateToField";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {postTranslatables, setSaveSuccess} from "../../../../../slices/translationsSlice";

export const TranslationsEditor = ({fetchRecords}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeRecord} = useSelector(state => state.translations.view);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const [hasDescription, setHasDescription] = useState(false);

    useEffect(() => {
        if (activeRecord && 'description' in activeRecord) {
            setHasDescription(true);
        } else {
            setHasDescription(false);
        }
    }, [activeRecord]);

    const handleTranslatablesSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postTranslatables());
        if(postTranslatables.fulfilled.match(resultAction)) {
            dispatch(setSaveSuccess(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setSaveSuccess(false));
            }, 2000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);

            await fetchRecords();
        }
    }

    const renderDescriptionTranslatable = () => {
        if (!activeRecord || !('description' in activeRecord)) {
            return null;
        }

        return (
            <>
                <OriginalTranslation value={activeRecord?.description.pl} type={t('description')}/>
                <TranslateToField
                    value={activeRecord?.description.en ? activeRecord.description.en : ''}
                    renderButton={true}
                    type={t('description')}/>
            </>
        );
    };

    return (
        <section className={'translations-vertical-split-right'}>
            <form className={'translation-wrapper'} onSubmit={handleTranslatablesSubmit}>
                <OriginalTranslation value={activeRecord?.name.pl} type={t('name')}/>
                <TranslateToField value={activeRecord?.name.en ? activeRecord.name.en : ''}
                                  renderButton={!hasDescription}
                                  type={t('name')}/>
                {renderDescriptionTranslatable()}
            </form>
        </section>
    );
};