import React, {useRef, useState} from "react";
import {Actions, TableData, TableDataActions, TableRow} from "./UsersList.style";
import {useTranslation} from "react-i18next";
import {useGetTranslation} from "../../../../hooks/useGetTranslation";
import {useUserContextPositions} from "../../../../hooks/useUserContextPositions";
import {RecordOptionsButton} from "../../cms/shared-components/RecordOptionsButton";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {setEditUserFormActive, setUserToUpdate} from "../../../../slices/usersSlice";
import {setIsInEditMode} from "../../../../slices/globalParamsSlice";
import {useDispatch} from "react-redux";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";

export const UserPosition = ({user}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const getTranslation = useGetTranslation();
    const contextRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [contextWindowActive, setContextWindowActive] = useState(false);
    const [contextDetailsWindowActive, setContextDetailsWindowActive] = useState(false);
    const userContextPositons = useUserContextPositions({
            user, setContextWindowActive, setContextDetailsWindowActive, contextDetailsWindowActive
        }
    );
    const windowWidth = useWindowWidth();
    const isWide = windowWidth > 1300;


    useOutsideClick(contextRef, () => {
        setContextWindowActive(false);
    }, contextWindowActive);

    const handleEdit = () => {
        dispatch(setUserToUpdate(user));
        dispatch(setEditUserFormActive(true));
        dispatch(setIsInEditMode(true));
    };

    const handleStopPropagation = e => {
        e.stopPropagation();
    }

    return (
        <TableRow onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={handleEdit}>
            <TableData>{`${user.forename} ${user.surname}`}</TableData>
            <TableData>{user.username}</TableData>
            <TableData>{user.roles?.map((r) => getTranslation(r.displayedName)).join(', ')}</TableData>
            <TableData>{user.restaurants?.map((r) => r.name).join(', ')}</TableData>
            <TableData>{user.active ? t('active') : t('inactive')}</TableData>
            <TableDataActions $isWide={isWide} onClick={handleStopPropagation}>
                <Actions>
                    <RecordOptionsButton className={'record-context-actions-button'}
                                         onClick={() => setContextWindowActive(!contextWindowActive)}
                                         dotsFill={hovered ? undefined : (isWide ? 'transparent' : undefined)}
                                         contextWindowActive={contextWindowActive}
                                         contextPositions={userContextPositons}
                                         contextRef={contextRef}
                                         windowPosition={{left: '-150px', top: '30px'}}/>
                </Actions>
            </TableDataActions>
        </TableRow>
    );
};
