import React from "react";
import {useTranslation} from "react-i18next";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useSelector} from "react-redux";
import {LogicalToggleField} from "../form-components/LogicalToggleField";
import {BorderedButton} from "../../common/BorderedButton";
import {ActionButton} from "../../common/ActionButton";

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
            <BorderedButton onClick={props.onCancel}
                            text={t('cancel')}
                            isBordered={true}/>

        );
    }

    const renderConfirmButton = () => {
        if (props.onCancel) {
            const buttonText = props.isRemoval ? t('remove') : t('confirm');
            return (
                <ActionButton onClick={props.onSubmit}
                              text={props.isLoading ? <LoadingSpinner buttonMode={true}/> : buttonText}
                              style={props.isRemoval ? {background: '#EC5858'} : {}}/>
            );
        }
        return (
            <ActionButton onClick={props.onSubmit}
                          text={props.isLoading ? <LoadingSpinner buttonMode={true}/> : 'Ok'}/>
        );
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'decision-dialog'}>
                <div className={'decision-dialog-content'}>
                    <p>{props.msg} {renderDialogTitle()}</p>
                    {props.logicalToggleHandler &&
                        <LogicalToggleField value={props.logicalToggleValue}
                                            id={'logical-toggle'}
                                            customMessageTrue={t('dontAskAgain')}
                                            customMessageFalse={t('dontAskAgain')}
                                            onChange={() => {
                                                props.logicalToggleHandler(!props.logicalToggleValue);
                                            }}
                        />
                    }
                </div>

                <div className={'decision-dialog-footer'}>
                    {renderCancelButton()}
                    {renderConfirmButton()}
                </div>
            </div>
        </>
    );
}