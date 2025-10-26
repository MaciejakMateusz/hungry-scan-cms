import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";
import {
    clearForm,
    getUsers,
    saveUser,
    setErrorData,
    setNewUserFormActive,
    setSaveUserError,
    setUserCreated
} from "../../../../../slices/usersSlice";
import {UserForm} from "./UserForm";

export const NewUserForm = ({executeFilter}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setUserCreated);
    const {filteringActive, filterValue} = useSelector(state => state.users.view);

    const handleFormSubmit = async e => {
        e.preventDefault();
        const resultAction = await dispatch(saveUser());
        if (saveUser.fulfilled.match(resultAction)) {
            dispatch(setNewUserFormActive(false));
            dispatch(clearForm());
            renderConfirmation();
            filteringActive ? executeFilter(filterValue) : dispatch(getUsers());
        } else if (saveUser.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload));
        }
    };

    const handleFormDiscard = () => {
        dispatch(setNewUserFormActive(false));
        dispatch(clearForm());
        dispatch(setSaveUserError(null));
    }

    return (
        <UserForm formHeader={t('createNewUser')}
                  onFormSubmit={handleFormSubmit}
                  onFormDiscard={handleFormDiscard}/>
    );
}