import React from "react";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";

export const FormHeader = ({formHeader, onFormDiscard, onFormSubmit, isLoading}) => {
    const {t} = useTranslation();

    const DiscardButton = () => {
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
                    <DiscardButton/>
                    <div className={'general-button'}
                         onClick={onFormSubmit}>
                        {isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                    </div>
                </div>
            </div>
        </div>
    );
}