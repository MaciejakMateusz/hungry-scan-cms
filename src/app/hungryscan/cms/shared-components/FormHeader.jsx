import React from "react";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {BorderedButton} from "../../common/BorderedButton";
import {ActionButton} from "../../common/ActionButton";
import {PreviewIcon} from "../../../icons/PreviewIcon";
import {useDispatch, useSelector} from "react-redux";
import {setPreviewActive} from "../../../../slices/globalParamsSlice";

export const FormHeader = ({
                               formHeader,
                               onFormDiscard,
                               onFormSubmit,
                               renderPreview,
                               isLoading,
                               submitDisabled,
                           }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {previewActive} = useSelector(state => state.globalParams.globalParams);

    const renderPreviewButton = () => {
        if (!renderPreview) return;
        return (
            <BorderedButton isBordered={true}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(setPreviewActive(!previewActive));
                            }}
                            text={t('preview')}
                            icon={<PreviewIcon active={previewActive}/>}
            />
        );
    }

    const renderDiscardButton = () => {
        if (!onFormDiscard) return;
        return (
            <BorderedButton isBordered={true}
                            onClick={onFormDiscard}
                            text={t('cancel')}
            />
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
                    <ActionButton style={submitDisabled ? {opacity: '0.6', cursor: 'not-allowed'} : {}}
                                  onClick={onFormSubmit}
                                  text={isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}/>
                </div>
            </div>
        </div>
    );
}