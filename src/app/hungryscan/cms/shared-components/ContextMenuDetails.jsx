import {useEffect, useState} from "react";

export const ContextMenuDetails = ({obj}) => {
    const [createdDate, setCreatedDate] = useState(null);
    const [createdTime, setCreatedTime] = useState(null);
    const [modifiedDate, setModifiedDate] = useState(null);
    const [modifiedTime, setModifiedTime] = useState(null);
    const [createdBy, setCreatedBy] = useState(null);
    const [modifiedBy, setModifiedBy] = useState(null);

    useEffect(() => {
        if (obj.created != null) {
            const [createdDate, createdTime] = obj.created.split("T");
            setCreatedDate(createdDate);
            setCreatedTime(createdTime.slice(0, 5));
        }
        if (obj.updated != null) {
            const [modifiedDate, modifiedTime] = obj.updated.split("T");
            setModifiedDate(modifiedDate);
            setModifiedTime(modifiedTime.slice(0, 5))
        }
        if (obj.createdBy != null) {
            const username = obj.createdBy.split("@");
            setCreatedBy(username[0] + '@...');
        }
        if (obj.modifiedBy != null) {
            const username = obj.modifiedBy.split("@");
            setModifiedBy(username[0] + '@...');
        }
    }, [obj.created, obj.createdBy, obj.modifiedBy, obj.updated]);

    return (
        <div className={'context-menu details'}>
            <div className={'context-menu-wrapper'}>
                <div className={'context-menu-detail'}>
                    <div>Data utworzenia:</div>
                    <div className={'context-menu-detail-value'}>{createdDate ?? '-'}</div>
                </div>
                <div className={'context-menu-detail'}>
                    <div>Godzina:</div>
                    <div className={'context-menu-detail-value'}>{createdTime ?? '-'}</div>
                </div>
                <div className={'context-menu-detail'}>
                    <div>Przez:</div>
                    <div className={'context-menu-detail-value'}>{createdBy ?? '-'}</div>
                </div>

                <div className={'context-menu-divider'}/>

                <div className={'context-menu-detail'}>
                    <div>Data modyfikacji:</div>
                    <div className={'context-menu-detail-value'}>{modifiedDate ?? '-'}</div>
                </div>
                <div className={'context-menu-detail'}>
                    <div>Godzina:</div>
                    <div className={'context-menu-detail-value'}>{modifiedTime ?? '-'}</div>
                </div>
                <div className={'context-menu-detail'}>
                    <div>Przez:</div>
                    <div className={'context-menu-detail-value'}>{modifiedBy ?? '-'}</div>
                </div>
            </div>
        </div>
    );
}