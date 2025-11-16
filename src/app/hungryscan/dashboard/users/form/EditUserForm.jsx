import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";
import {
    clearForm,
    getUsers,
    setActive,
    setChosenRestaurants,
    setChosenRoles,
    setEditUserFormActive,
    setErrorData,
    setForename,
    setSurname, setUpdateUserError,
    setUsername,
    setUserToUpdate,
    setUserUpdated,
    updateUser
} from "../../../../../slices/usersSlice";
import {UserForm} from "./UserForm";
import {useGetTranslation} from "../../../../../hooks/useGetTranslation";
import {setIsInEditMode} from "../../../../../slices/globalParamsSlice";

export const EditUserForm = ({executeFilter}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const getTranslation = useGetTranslation();
    const renderConfirmation = useConfirmationMessage(setUserUpdated);
    const {userToUpdate: user} = useSelector(state => state.users.view);
    const {filteringActive, filterValue} = useSelector(state => state.users.view);

    useEffect(() => {
        const fillUserData = () => {
            if (!user) return;
            dispatch(setUsername(user.username));
            dispatch(setForename(user.forename));
            dispatch(setSurname(user.surname));
            dispatch(setChosenRestaurants(user.restaurants.map(restaurant => ({
                value: restaurant,
                label: `${restaurant.name} - ${restaurant.address}`
            }))));
            dispatch(setChosenRoles(user.roles.map(role => ({
                value: role,
                label: getTranslation(role.displayedName)
            }))));
            dispatch(setActive(user.active));
        }
        fillUserData();
    }, [dispatch, user]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        const resultAction = await dispatch(updateUser());
        if (updateUser.fulfilled.match(resultAction)) {
            dispatch(setEditUserFormActive(false));
            dispatch(setUserToUpdate(null));
            dispatch(clearForm());
            dispatch(setIsInEditMode(false));
            renderConfirmation();
            filteringActive ? executeFilter(filterValue) : dispatch(getUsers());
        } else if (updateUser.rejected.match(resultAction)) {
            dispatch(setErrorData(resultAction.payload));
        }
    };

    const handleFormDiscard = () => {
        dispatch(setEditUserFormActive(false));
        dispatch(clearForm());
        dispatch(setUpdateUserError(null));
        dispatch(setIsInEditMode(false));
    }

    return (
        <UserForm formHeader={t('updateUser')}
                  onFormSubmit={handleFormSubmit}
                  onFormDiscard={handleFormDiscard}/>
    );
}