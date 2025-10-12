import {useDispatch, useSelector} from "react-redux";
import {
    Action,
    Actions,
    TableData,
    TableDataActions,
    TableHead,
    TableHeadCell,
    TableHeadRow,
    TableRow,
    UsersTable
} from "./UsersList.style";
import {getTranslation} from "../../../../locales/langUtils";
import {useTranslation} from "react-i18next";
import {EditIconNew} from "../../../icons/EditIconNew";
import {DeleteIconNew} from "../../../icons/DeleteIconNew";
import React from "react";
import {
    getUsers,
    removeUser,
    setEditUserFormActive, setRemovalError, setUserRemoved,
    setUserToRemove,
    setUserToUpdate
} from "../../../../slices/usersSlice";
import {DecisionDialog} from "../../cms/dialog-windows/DecisionDialog";
import {ErrorMessageDialog} from "../../../error/ErrorMessageDialog";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";

export const UsersList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users.getUsers);
    const {userToRemove} = useSelector(state => state.users.view);
    const {isLoading: userRemovalPending, removalError} = useSelector(state => state.users.removeUser);
    const confirmUserRemoval = useConfirmationMessage(setUserRemoved);

    const handleUserRemoval = async e => {
        e.preventDefault();
        const resultAction = await dispatch(removeUser());
        if (removeUser.fulfilled.match(resultAction)) {
            dispatch(setUserToRemove(null));
            dispatch(getUsers());
            confirmUserRemoval();
        }
    };

    const handleErrorDismiss = () => {
        dispatch(setUserToRemove(null));
        dispatch(setRemovalError(null));
    }

    const UsersList = () => {
        return users?.map((user) => (
            <TableRow key={user.username}>
                <TableData>{`${user.forename} ${user.surname}`}</TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.roles?.map((r) => getTranslation(r.displayedName)).join(', ')}</TableData>
                <TableData>{user.restaurants?.map((r) => r.name).join(', ')}</TableData>
                <TableData>{user.active ? t('active') : t('inactive')}</TableData>
                <TableDataActions>
                    <Actions>
                        <Action onClick={() => {
                            dispatch(setUserToUpdate(user));
                            dispatch(setEditUserFormActive(true));
                        }}>
                            <EditIconNew/>
                        </Action>
                        <Action onClick={() => dispatch(setUserToRemove(user))}>
                            <DeleteIconNew/>
                        </Action>
                    </Actions>
                </TableDataActions>
            </TableRow>
        ));
    }

    return (
        <>
            {(userToRemove && !removalError) &&
                <DecisionDialog msg={t('confirmUserRemoval')}
                                objName={userToRemove.name}
                                onSubmit={(e) => handleUserRemoval(e)}
                                onCancel={() => dispatch(setUserToRemove(null))}
                                isLoading={userRemovalPending}/>}
            {removalError && <ErrorMessageDialog dismissHandler={() => handleErrorDismiss()}
                                                 errorMessage={removalError.message}/>}
            <UsersTable>
                <TableHead>
                    <TableHeadRow>
                        <TableHeadCell>{t('forenameSurname')}</TableHeadCell>
                        <TableHeadCell>{t('email')}</TableHeadCell>
                        <TableHeadCell>{t('roles')}</TableHeadCell>
                        <TableHeadCell>{t('restaurants')}</TableHeadCell>
                        <TableHeadCell>{t('status')}</TableHeadCell>
                        <TableHeadCell>{t('actions')}</TableHeadCell>
                    </TableHeadRow>
                </TableHead>
                <tbody>
                <UsersList/>
                </tbody>
            </UsersTable>
        </>
    );
};
