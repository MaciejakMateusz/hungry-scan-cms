import React from "react";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";

export const FormHeader = ({
                               formHeader,
                               onFormDiscard,
                               onFormSubmit,
                               onPreview,
                               isLoading,
                               submitDisabled}) => {
    const {t} = useTranslation();

    const renderPreviewButton = () => {
        if (!onPreview) return;
        return (
            <div className={'general-button cancel'}
                 onClick={onPreview}>
                {t('preview')}
            </div>
        );
    }

    const renderDiscardButton = () => {
        if (!onFormDiscard) return;
        return (
            <div className={'general-button cancel'}
                 onClick={onFormDiscard}>
                {t('cancel')}
            </div>
        );
    }

    return (
        <div className={'functions-header'}>
            <div className={'section-heading'}>
                {formHeader}
            </div>
            <div className={'flex-wrapper-gapped'}>
                <div className={'form-footer'}>
                    {renderPreviewButton()}
                    {renderDiscardButton()}
                    <div className={`general-button ${submitDisabled && 'disabled'}`}
                         onClick={onFormSubmit}>
                        {isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                    </div>
                </div>
            </div>
        </div>
    );
}