import React from "react";
import {getTranslation} from "../../../locales/langUtils";
import {useTranslation} from "react-i18next";

export const RemovalDialog = (props) => {
    const {t} = useTranslation();
    return (
        <>
            <div className={'overlay'}></div>
            <div className={'removal-dialog'}>
                <div className={'removal-dialog-content'}>
                    {props.msg} "{getTranslation(props.objName)}"
                </div>
                <div className={'removal-dialog-footer'}>
                    <button onClick={props.onCancel} className={'add-new-button cancel'}>{t('cancel')}</button>
                    <form onSubmit={props.onSubmit} style={{all: 'unset'}}>
                        <button type="submit" className={'add-new-button'}>{t('remove')}</button>
                    </form>
                </div>

            </div>
        </>
    );
}