import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";
import {
    clearForm, getUsers,
    saveUser,
    setErrorData,
    setNewUserFormActive,
    setUserCreated
} from "../../../../../slices/usersSlice";
import {UserForm} from "./UserForm";

export const NewUserForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setUserCreated);

    const handleFormSubmit = async e => {
        e.preventDefault();
        const resultAction = await dispatch(saveUser());
        if (saveUser.fulfilled.match(resultAction)) {
            dispatch(setNewUserFormActive(false));
            dispatch(clearForm());
            renderConfirmation();
            dispatch(getUsers());
        } else if (saveUser.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload));
        }
    };

    const handleFormDiscard = () => {
        dispatch(setNewUserFormActive(false));
        dispatch(clearForm());
    }

    return (
        <UserForm formHeader={t('createNewUser')}
                  onFormSubmit={handleFormSubmit}
                  onFormDiscard={handleFormDiscard}/>
    );
}