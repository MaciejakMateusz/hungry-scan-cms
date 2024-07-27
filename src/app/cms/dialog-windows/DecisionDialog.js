import React from "react";
import {getTranslation} from "../../../locales/langUtils";
import {useTranslation} from "react-i18next";

export const DecisionDialog = (props) => {
    const {t} = useTranslation();
    return (
        <>
            <div className={'overlay'}></div>
            <div className={'decision-dialog'}>
                <div className={'decision-dialog-content'}>
                    <h4>{props.msg} {props.objName ? `"` + getTranslation(props.objName) + '"' : ''}</h4>
                </div>
                <div className={'decision-dialog-footer'}>
                    <button onClick={props.onCancel} className={'general-button cancel'}>{t('cancel')}</button>
                    <form onSubmit={props.onSubmit} style={{all: 'unset'}}>
                        <button type="submit" className={'general-button'}>{t('remove')}</button>
                    </form>
                </div>

            </div>
        </>
    );
}