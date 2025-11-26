import {useDispatch, useSelector} from "react-redux";
import {TableHead, TableHeadCell, TableHeadRow, UsersTable} from "./UsersList.style";
import {useTranslation} from "react-i18next";
import React from "react";
import {getUsers, removeUser, setUserRemoved, setUserToRemove} from "../../../../slices/usersSlice";
import {DecisionDialog} from "../../cms/dialog-windows/DecisionDialog";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {UserPosition} from "./UserPosition";

export const UsersList = ({executeFilter}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users.getUsers);
    const {userToRemove, filteringActive, filterValue} = useSelector(state => state.users.view);
    const {isLoading: userRemovalPending} = useSelector(state => state.users.removeUser);
    const confirmUserRemoval = useConfirmationMessage(setUserRemoved);

    const handleUserRemoval = async e => {
        e.preventDefault();
        const resultAction = await dispatch(removeUser());
        if (removeUser.fulfilled.match(resultAction)) {
            dispatch(setUserToRemove(null));
            filteringActive ? executeFilter(filterValue) : dispatch(getUsers());
            confirmUserRemoval();
        }
    };

    const UsersList = () => {
        return users?.map(user => <UserPosition key={user.username} user={user}/>);
    }

    return (
        <>
            {userToRemove &&
                <DecisionDialog msg={t('confirmUserRemoval')}
                                objName={userToRemove.name}
                                onSubmit={(e) => handleUserRemoval(e)}
                                onCancel={() => dispatch(setUserToRemove(null))}
                                isLoading={userRemovalPending}
                                isRemoval={true}/>}
            <UsersTable>
                <TableHead>
                    <TableHeadRow>
                        <TableHeadCell>{t('forenameSurname')}</TableHeadCell>
                        <TableHeadCell>{t('email')}</TableHeadCell>
                        <TableHeadCell>{t('roles')}</TableHeadCell>
                        <TableHeadCell>{t('restaurants')}</TableHeadCell>
                        <TableHeadCell>{t('status')}</TableHeadCell>
                        <TableHeadCell/>
                    </TableHeadRow>
                </TableHead>
                <tbody>
                <UsersList/>
                </tbody>
            </UsersTable>
        </>
    );
};
