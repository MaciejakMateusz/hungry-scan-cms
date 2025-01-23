import React from "react";
import {getTranslation} from "../../../../locales/langUtils";
import {useTranslation} from "react-i18next";

export const QrShareDialog = (props) => {
    const {t} = useTranslation();
    return (
        <>
            <div className={'overlay'}></div>
            <div className={'decision-dialog'}>
                <div className={'decision-dialog-content'}>
                    <h5>{props.msg} {props.objName ? `"` + getTranslation(props.objName) + '"' : ''}</h5>
                </div>
                <div className={'decision-dialog-footer'}>
                    <button onClick={props.onCancel} className={'general-button cancel'}>{t('cancel')}</button>
                </div>
            </div>
        </>
    );
}