import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setActiveObjDetails} from "../../../../slices/globalParamsSlice";

export const DetailsDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeObjDetails} = useSelector(state => state.globalParams.globalParams);
    const [createdDate, setCreatedDate] = useState(null);
    const [createdTime, setCreatedTime] = useState(null);
    const [modifiedDate, setModifiedDate] = useState(null);
    const [modifiedTime, setModifiedTime] = useState(null);

    useEffect(() => {
        if (activeObjDetails?.created != null) {
            const [createdDate, createdTime] = activeObjDetails.created.split("T");
            setCreatedDate(createdDate);
            setCreatedTime(createdTime.slice(0, 5));
        }
        if (activeObjDetails?.updated != null) {
            const [modifiedDate, modifiedTime] = activeObjDetails.updated.split("T");
            setModifiedDate(modifiedDate);
            setModifiedTime(modifiedTime.slice(0, 5))
        }
    }, [activeObjDetails?.created, activeObjDetails?.updated]);

    const renderCancelButton = () => {
        return (
            <button onClick={() => dispatch(setActiveObjDetails(null))}
                    className={'general-button'}>
                {t('close')}
            </button>
        );
    }

    if (!activeObjDetails) return (<></>);

    return (
        <>
            <div className={'overlay'}/>
            <div className={'form-dialog'} style={{padding: '1rem 2rem 2rem 2rem'}}>
                <div className={'context-menu-wrapper'}>
                    <div className={'context-menu-detail'}>
                        <div>{t('createdAt')}</div>
                        <div className={'context-menu-detail-value'}>{createdDate ?? '-'}</div>
                    </div>
                    <div className={'context-menu-detail'}>
                        <div>{t('time')}</div>
                        <div className={'context-menu-detail-value'}>{createdTime ?? '-'}</div>
                    </div>
                    <div className={'context-menu-detail'}>
                        <div>{t('by')}</div>
                        <div className={'context-menu-detail-value'}>{activeObjDetails?.createdBy ?? '-'}</div>
                    </div>

                    <div className={'draggable-position-separator'} style={{margin: '10px 0'}}/>

                    <div className={'context-menu-detail'}>
                        <div>{t('updatedAt')}</div>
                        <div className={'context-menu-detail-value'}>{modifiedDate ?? '-'}</div>
                    </div>
                    <div className={'context-menu-detail'}>
                        <div>{t('time')}</div>
                        <div className={'context-menu-detail-value'}>{modifiedTime ?? '-'}</div>
                    </div>
                    <div className={'context-menu-detail'}>
                        <div>{t('by')}</div>
                        <div className={'context-menu-detail-value'}>{activeObjDetails?.modifiedBy ?? '-'}</div>
                    </div>
                </div>
                <div className={'decision-dialog-footer'} style={{padding: '0'}}>
                    {renderCancelButton()}
                </div>
            </div>
        </>
    );
}