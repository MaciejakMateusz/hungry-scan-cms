import React from "react";
import {TranslationRecord} from "./TranslationRecord";
import {setActiveRecord, setActiveRecordId} from "../../../../slices/translationsSlice";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

export const TranslationsList = () => {
    const {t} = useTranslation();
    const {records} = useSelector(state => state.translations.view);
    const dispatch = useDispatch();

    return (
        <>
            {records?.length > 0 ? records.map((record, index) => (
                <div key={record.id}>
                    <TranslationRecord parent={true}
                                       index={index + 1}
                                       record={record}
                                       setActive={() => {
                                           dispatch(setActiveRecordId('p' + record.id))
                                           dispatch(setActiveRecord(record));
                                       }}
                    />
                    {record.menuItems ? record.menuItems.map(menuItem => (
                        <div key={menuItem.id}>
                            <TranslationRecord parent={false}
                                               record={menuItem}
                                               setActive={() => {
                                                   dispatch(setActiveRecordId('c' + menuItem.id));
                                                   dispatch(setActiveRecord(menuItem));
                                               }}
                            />
                        </div>
                    )) : <></>}
                </div>
            )) : t('noRecordsFound')}
        </>
    );
}