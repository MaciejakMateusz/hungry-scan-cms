import React from "react";
import {useTranslation} from "react-i18next";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useSelector} from "react-redux";

export const DecisionDialog = (props) => {
    const {t} = useTranslation();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const isNameTranslatable = typeof props.objName !== 'string';

    const renderDialogTitle = () => {
        if (isNameTranslatable) {
            return props.objName ? `"` + props.objName[restaurantLanguage] + '"' : '';
        }
        return props.objName ? props.objName : '';
    }

    const renderCancelButton = () => {
        if (!props.onCancel) return;
        return (
            <button onClick={props.onCancel}
                    className={'general-button cancel'}>
                {t('cancel')}
            </button>
        );
    }

    const renderConfirmButton = () => {
        if (props.onCancel) {
            return (
                <button className={'general-button'}
                        onClick={props.onSubmit}>
                    {props.isLoading ? <LoadingSpinner buttonMode={true}/> : t('confirm')}
                </button>
            );
        }
        return (
            <button className={'general-button'}
                    onClick={props.onSubmit}>
                {props.isLoading ? <LoadingSpinner buttonMode={true}/> : 'Ok'}
            </button>
        );
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'decision-dialog'}>
                <div className={'decision-dialog-content'}>
                    <p>{props.msg} {renderDialogTitle()}</p>
                </div>
                <div className={'decision-dialog-footer'}>
                    {renderCancelButton()}
                    {renderConfirmButton()}
                </div>
            </div>
        </>
    );
}