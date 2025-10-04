import React from "react";
import {getTranslation} from "../../../../locales/langUtils";
import {useTranslation} from "react-i18next";

export const DecisionDialog = (props) => {
    const {t} = useTranslation();
    return (
        <>
            <div className={'overlay'}></div>
            <div className={'decision-dialog'}>
                <div className={'decision-dialog-content'}>
                    <p>{props.msg} {props.objName ? `"` + getTranslation(props.objName) + '"' : ''}</p>
                </div>
                <div className={'decision-dialog-footer'}>
                    <button onClick={props.onCancel} className={'general-button cancel'}>{t('cancel')}</button>
                    <button className={'general-button'} onClick={props.onSubmit}>{t('confirm')}</button>
                </div>

            </div>
        </>
    );
}